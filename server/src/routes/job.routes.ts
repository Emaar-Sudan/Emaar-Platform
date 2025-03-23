import { Router } from 'express';
import { jobService } from '../services/job.service';
import { authenticateUser } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';

const router = Router();

const applicationSchema = z.object({
  cover_letter: z.string(),
  resume_url: z.string().url()
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await jobService.getJobs(req.query);
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Submit job application
router.post('/:id/apply',
  authenticateUser,
  validateRequest(applicationSchema),
  async (req, res) => {
    try {
      const application = await jobService.submitApplication({
        job_id: req.params.id,
        user_id: req.user.id,
        ...req.body,
        status: 'pending',
        application_date: new Date().toISOString()
      });
      res.json(application);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;