import { useCallback, useState } from 'react';

export default function useInput(initialState = null) {
  const [state, setState] = useState(initialState);
  const handleState = useCallback((e) => {
    setState(e.target.value);
  }, []);

  return [state, setState, handleState];
}
