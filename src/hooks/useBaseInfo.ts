import { useEffect, useState } from 'react';
export default function useBaseInfo() {
  const [state, setState] = useState<any>('hello');

  useEffect(() => {
    setState('');
  }, []);
  return state;
}
