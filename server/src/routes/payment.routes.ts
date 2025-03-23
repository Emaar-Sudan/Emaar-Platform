import { Router } from 'express';
import { paymentService } from '../services/payment.service';
import { authenticateUser } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';

const router = Router();

const paymentSchema = z.object({
  type: z.enum(['tender', 'auction']),
  item_id: z.string().uuid(),
  submission_id: z.string().uuid(),
  amount: z.number().positive(),
  payment_method: z.string()
});

// Create payment
router.post('/',
  authenticateUser,
  validateRequest(paymentSchema),
  async (req, res) => {
    try {
      const payment = await paymentService.createPayment({
        user_id: req.user.id,
        ...req.body,
        status: 'pending',
        created_at: new Date().toISOString()
      });
      res.json(payment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get user payments
router.get('/my-payments',
  authenticateUser,
  async (req, res) => {
    try {
      const payments = await paymentService.getUserPayments(req.user.id);
      res.json(payments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Update payment status
router.patch('/:id/status',
  authenticateUser,
  async (req, res) => {
    try {
      const payment = await paymentService.updatePaymentStatus(
        req.params.id,
        req.body.status
      );
      res.json(payment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;