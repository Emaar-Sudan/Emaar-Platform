import { Router } from 'express';
import { userService } from '../services/user.service';
import { authenticateUser } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';

const router = Router();

const updateProfileSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  photo_url: z.string().url().optional()
});

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6)
});

// Get current user profile
router.get('/me', authenticateUser, async (req, res) => {
  try {
    const profile = await userService.getUserProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update profile
router.patch('/profile', 
  authenticateUser,
  validateRequest(updateProfileSchema),
  async (req, res) => {
    try {
      const profile = await userService.updateProfile(req.user.id, req.body);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Change password
router.post('/change-password',
  authenticateUser,
  validateRequest(changePasswordSchema),
  async (req, res) => {
    try {
      await userService.updatePassword(req.user.id, req.body.currentPassword, req.body.newPassword);
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Delete account
router.delete('/me', authenticateUser, async (req, res) => {
  try {
    await userService.deleteAccount(req.user.id);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;