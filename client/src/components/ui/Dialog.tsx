import React from 'react';
import clsx from 'clsx';

interface DialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  const handleOverlayClick = () => {
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="absolute inset-0"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div className="z-10">{children}</div>
    </div>
  );
};
