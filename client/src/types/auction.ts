export interface Auction {
  id: string;
  auction_number: string; // رقم المزاد
  title: string; // عنوان المزاد
  description: string; // وصف المزاد
  organization_id: string | null; // معرف المنظمة (يمكن أن يكون null)
  starting_price: number; // السعر الابتدائي
  current_price: number; // السعر الحالي
  subscription_price: number; // تكلفة الاشتراك
  item_condition: string | null; // حالة العنصر (قد تكون null)
  rules: string | null; // القواعد (قد تكون null)
  notes: string | null; // الملاحظات (قد تكون null)
  status: 'active' | 'closed' | 'upcoming'; // حالة المزاد
  start_date: string; // تاريخ البدء
  end_date: string; // تاريخ الانتهاء
  created_at: string; // تاريخ الإنشاء
  updated_at: string; // تاريخ التحديث
  image_path: string | null; // مسار الصورة (قد يكون null)
}

export interface AuctionApplicationFormData {
  bid_amount: number;
  bid_amount_url: File | null;
  bank_guarantee_url: File | null;
  bank_guarantee_number: string;
  bank_guarantee_date: string;
}