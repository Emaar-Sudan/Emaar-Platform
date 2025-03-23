export interface Auction {
  id: string;
  auction_number: string;
  title: string;
  description: string;
  organization_id: string;
  starting_price: number;
  current_price: number;
  min_increment: number;
  status: 'draft' | 'active' | 'closed' | 'cancelled';
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  organization_name?: string;
}

export interface AuctionBid {
  id: string;
  auction_id: string;
  user_id: string;
  bid_amount: number;
  bid_amount_url: string;
  bank_guarantee_url: string;
  bank_guarantee_number: string;
  bank_guarantee_date: string;
  status: 'active' | 'outbid' | 'won' | 'lost';
  bid_time: string;
}