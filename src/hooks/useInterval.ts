import { useRef, useEffect } from 'react'

type Callback = (...params: any) => void

function useInterval(callback: Callback, delay: number) {
  const savedCallback = useRef<Callback>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval
