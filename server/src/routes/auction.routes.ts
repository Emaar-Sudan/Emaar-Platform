import { Router } from 'express';
import { auctionService } from '../services/auction.service';
import { authenticateUser } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';

const router = Router();

const bidSchema = z.object({
  bid_amount: z.number().positive(),
  bid_amount_url: z.string().url(),
  bank_guarantee_url: z.string().url(),
  bank_guarantee_number: z.string(),
  bank_guarantee_date: z.string()
});

// Get all auctions
router.get('/', async (req, res) => {
  try {
    const auctions = await auctionService.getAuctions(req.query);
    res.json(auctions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get auction by ID
router.get('/:id', async (req, res) => {
  try {
    const auction = await auctionService.getAuctionById(req.params.id);
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }
    res.json(auction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Place bid
router.post('/:id/bid',
  authenticateUser,
  validateRequest(bidSchema),
  async (req, res) => {
    try {
      const bid = await auctionService.placeBid({
        auction_id: req.params.id,
        user_id: req.user.id,
        ...req.body,
        status: 'active',
        bid_time: new Date().toISOString()
      });
      res.json(bid);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;