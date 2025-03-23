import React from 'react';
import { BackButton } from './BackButton';

interface SignupContainerProps {
  children: React.ReactNode;
  onBack: () => void;
}

export const SignupContainer: React.FC<SignupContainerProps> = ({ children, onBack }) => {
  return (
    <div className="container mx-auto">
      <BackButton onBack={onBack} />
      {children}
    </div>
  );
};