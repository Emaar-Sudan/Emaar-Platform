import { executeQuery, transaction } from '../config/database';
import { logger } from '../utils/logger';
import type { Auction, AuctionBid } from '../types/auction';

export const auctionService = {
  async getAuctions(filters = {}) {
    try {
      let query = `
        SELECT a.*, u.name as organization_name 
        FROM auctions a 
        LEFT JOIN users u ON a.organization_id = u.id 
        WHERE 1=1
      `;
      const params: any[] = [];

      if (filters.status) {
        query += ' AND a.status = ?';
        params.push(filters.status);
      }

      if (filters.category) {
        query += ' AND a.category = ?';
        params.push(filters.category);
      }

      query += ' ORDER BY a.created_at DESC';

      const auctions = await executeQuery<Auction[]>(query, params);
      return auctions;
    } catch (error) {
      logger.error('Error fetching auctions:', error);
      throw error;
    }
  },

  async getAuctionById(id: string) {
    try {
      const [auction] = await executeQuery<Auction[]>(
        `SELECT a.*, u.name as organization_name 
         FROM auctions a 
         LEFT JOIN users u ON a.organization_id = u.id 
         WHERE a.id = ?`,
        [id]
      );
      return auction;
    } catch (error) {
      logger.error('Error fetching auction:', error);
      throw error;
    }
  },

  async placeBid(bid: Partial<AuctionBid>) {
    return transaction(async (connection) => {
      try {
        // Get current highest bid
        const [currentBid] = await connection.execute(
          'SELECT bid_amount FROM auction_bids WHERE auction_id = ? ORDER BY bid_amount DESC LIMIT 1',
          [bid.auction_id]
        );

        const minBidAmount = currentBid ? currentBid.bid_amount : 0;

        if (bid.bid_amount! <= minBidAmount) {
          throw new Error('Bid amount must be higher than current bid');
        }

        // Insert new bid
        const [result] = await connection.execute(
          `INSERT INTO auction_bids (
            auction_id, user_id, bid_amount, bid_amount_url,
            bank_guarantee_url, bank_guarantee_number,
            bank_guarantee_date, status, bid_time
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            bid.auction_id,
            bid.user_id,
            bid.bid_amount,
            bid.bid_amount_url,
            bid.bank_guarantee_url,
            bid.bank_guarantee_number,
            bid.bank_guarantee_date,
            'active',
            new Date()
          ]
        );

        // Update auction current price
        await connection.execute(
          'UPDATE auctions SET current_price = ? WHERE id = ?',
          [bid.bid_amount, bid.auction_id]
        );

        // Mark other bids as outbid
        await connection.execute(
          'UPDATE auction_bids SET status = ? WHERE auction_id = ? AND id != ?',
          ['outbid', bid.auction_id, result.insertId]
        );

        return { id: result.insertId, ...bid };
      } catch (error) {
        logger.error('Error placing bid:', error);
        throw error;
      }
    });
  }
};