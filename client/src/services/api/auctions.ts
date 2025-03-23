import api from './index';
import type { Auction, AuctionBid } from '@/types/auction';

export const auctionsApi = {
  async getAuctions(filters = {}) {
    const { data } = await api.get('/auctions', { params: filters });
    return data as Auction[];
  },

  async getAuctionById(id: string) {
    const { data } = await api.get(`/auctions/${id}`);
    return data as Auction;
  },

  async placeBid(auctionId: string, bid: Partial<AuctionBid>) {
    const { data } = await api.post(`/auctions/${auctionId}/bid`, bid);
    return data;
  }
};