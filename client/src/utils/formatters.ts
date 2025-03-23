export const formatCreditCardNumber = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(' ');
  }
  return value;
};

export const formatExpiryDate = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  if (v.length >= 2) {
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
  }
  return v;
};

export const formatCVC = (value: string): string => {
  return value.replace(/[^0-9]/gi, '').substring(0, 4);
};

// إضافة دالة formatCurrency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'SDG', // استبدل OMR برمز العملة المطلوبة
  }).format(value);
};
