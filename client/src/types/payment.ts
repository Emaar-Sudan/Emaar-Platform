export interface Payment {
  id: string;
  type: 'tender' | 'auction';
  item_id: string;
  submission_id: string;
  reference_number: string;
  item_name: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  transaction_id: string;
  created_at: string;
  updated_at: string;
}