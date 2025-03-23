import { Router } from 'express';
import { notificationService } from '../services/notification.service';
import { authenticateUser } from '../middleware/auth';

const router = Router();

// Get recent notifications
router.get('/recent-notifications', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id; // تأكد من أنك تحصل على userId من الجلسة أو المصادقة

    const query = `
      SELECT * FROM notifications
      WHERE (target_type = 'public'
             OR (target_type = 'selected' AND FIND_IN_SET(?, target_users)))
      ORDER BY created_at DESC
      LIMIT 5
    `;

    const results = await notificationService.getNotifications(query, [userId]);

    res.json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
