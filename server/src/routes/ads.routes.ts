import { Router } from 'express';
import { adService } from '../services/ad.service';

const router = Router();

router.get('/:page', async (req, res) => {
  try {
    const ads = await adService.getAdsByPage(req.params.page);
    res.json(ads);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;