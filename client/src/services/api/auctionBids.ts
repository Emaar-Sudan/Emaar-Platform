import api from './index';
import type { AuctionBid } from '@/types/auction';

export const auctionBidsApi = {
  async getUserBids() {
    const { data } = await api.get('/auctions/bids');
    return data as AuctionBid[];
  },

  async getHighestBidAmount(auctionId: string) {
    const { data } = await api.get(`/auctions/${auctionId}/highest-bid`);
    return data.amount;
  },

  async updateBid(bidId: string, newAmount: number) {
    const { data } = await api.patch(`/auctions/bids/${bidId}`, { amount: newAmount });
    return data;
  },

  async withdrawBid(bidId: string) {
    await api.delete(`/auctions/bids/${bidId}`);
  }
};