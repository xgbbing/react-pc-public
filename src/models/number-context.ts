import { createContext, useContext } from 'react';

const NumberContext = createContext<{
  number: number;
  add?: () => void;
  substract?: () => void;
}>({
  number: 0,
  add: () => {},
  substract: () => {},
});

const useNumber = () => {
  const context = useContext(NumberContext);
  if (!context) {
    throw new Error('useNumber must be used within a NumberProvider');
  }
  return context;
};

export { NumberContext, useNumber };
