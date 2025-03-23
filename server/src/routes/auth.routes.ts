import { Router } from 'express';
import { authService } from '../services/auth.service';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  type: z.enum(['individual', 'company']),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  commercialRegNo: z.string().optional(),
  nationalId: z.string().optional()
});

router.post('/login', validateRequest(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/register', validateRequest(registerSchema), async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.json({ message: 'Registration successful', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

export default router;