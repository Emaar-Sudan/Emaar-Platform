import { Router } from 'express';
import { newsService } from '../services/news.service';
import { authenticateUser } from '../middleware/auth';

const router = Router();

// Get all news
router.get('/', async (req, res) => {
  try {
    const news = await newsService.getNews(req.query);
    res.json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get featured news
router.get('/featured', async (req, res) => {
  try {
    const featured = await newsService.getFeaturedNews();
    res.json(featured);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get news by ID
router.get('/:id', async (req, res) => {
  try {
    const news = await newsService.getNewsById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get related news
router.get('/:id/related', async (req, res) => {
  try {
    const related = await newsService.getRelatedNews(req.params.id);
    res.json(related);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;