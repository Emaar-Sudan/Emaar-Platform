export const validateSubmissionFee = (fee: number | undefined): boolean => {
  if (fee === undefined || fee === null) {
    return false;
  }
  return fee >= 0;
};

export const validateFiles = (files: Record<string, File | null>): boolean => {
  return Object.values(files).every(file => file !== null);
};

export const validateAgreement = (hasAgreed: boolean): boolean => {
  return hasAgreed;
};