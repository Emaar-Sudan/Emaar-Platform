export const formatCurrency = (amount: number, direction: 'rtl' | 'ltr'): string => {
  return new Intl.NumberFormat(direction === 'rtl' ? 'ar-SA' : 'en-US', {
    style: 'currency',
    currency: 'SDG',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPrice = (amount: number): string => {
  return `${amount.toFixed(2)} SDG`;
};
