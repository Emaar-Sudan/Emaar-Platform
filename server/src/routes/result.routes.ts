import { Router } from 'express';
import { resultService } from '../services/result.service';
import { authenticateUser } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';

const router = Router();

const reactionSchema = z.object({
  type: z.enum(['like', 'love', 'celebrate', 'support', 'star'])
});

// Get all results
router.get('/', async (req, res) => {
  try {
    const results = await resultService.getResults(req.query);
    res.json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get result by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await resultService.getResultById(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Result not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add reaction to result
router.post('/:id/reactions',
  authenticateUser,
  validateRequest(reactionSchema),
  async (req, res) => {
    try {
      const reaction = await resultService.addReaction(
        req.params.id,
        req.user.id,
        req.body.type
      );
      res.json(reaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;