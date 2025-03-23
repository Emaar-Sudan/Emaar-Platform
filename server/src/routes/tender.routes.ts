import { Router } from 'express';
import { tenderService } from '../services/tender.service';
import { authenticateUser } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';

const router = Router();

const tenderSubmissionSchema = z.object({
  technical_file_url: z.string().url(),
  financial_file_url: z.string().url(),
  bank_guarantee_url: z.string().url(),
  bank_guarantee_number: z.string(),
  bank_guarantee_date: z.string()
});

// Get all tenders
router.get('/', async (req, res) => {
  try {
    const tenders = await tenderService.getTenders(req.query);
    res.json(tenders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get tender by ID
router.get('/:id', async (req, res) => {
  try {
    const tender = await tenderService.getTenderById(req.params.id);
    if (!tender) {
      return res.status(404).json({ error: 'Tender not found' });
    }
    res.json(tender);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Submit tender application
router.post('/:id/submit', 
  authenticateUser,
  validateRequest(tenderSubmissionSchema),
  async (req, res) => {
    try {
      const submission = await tenderService.createSubmission({
        tender_id: req.params.id,
        user_id: req.user.id,
        ...req.body,
        status: 'pending',
        submission_date: new Date().toISOString()
      });
      res.json(submission);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;