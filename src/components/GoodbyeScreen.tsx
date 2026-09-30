import React from 'react';
import { PalaceDoorTransition } from './PalaceDoorTransition';

interface GoodbyeScreenProps {
  onReadyToReveal?: () => void;
  onComplete?: () => void;
  name?: string;
}

export const GoodbyeScreen: React.FC<GoodbyeScreenProps> = ({ onReadyToReveal, onComplete }) => {
  return (
    <PalaceDoorTransition 
      mode="goodbye" 
      onReadyToReveal={onReadyToReveal}
      onComplete={onComplete} 
    />
  );
};
