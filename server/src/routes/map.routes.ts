import { Router } from 'express';
import { projectService } from '../services/project.service';
import { tenderService } from '../services/tender.service';
import { auctionService } from '../services/auction.service';
import { jobService } from '../services/job.service';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [projects, tenders, auctions, jobs] = await Promise.all([
      projectService.getProjects({ status: 'active' }),
      tenderService.getTenders({ status: 'published' }),
      auctionService.getAuctions({ status: 'active' }),
      jobService.getJobs({ status: 'published' })
    ]);

    res.json({
      projects,
      tenders,
      auctions,
      jobs
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;