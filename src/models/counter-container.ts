import { useState } from 'react';
import { createContainer } from 'unstated-next';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return { count, increment, decrement };
}

const CounterContainer = createContainer(useCounter);

export default CounterContainer;
