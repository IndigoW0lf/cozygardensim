import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { advanceGarden } from '../store/actions/gardenActions';

export default function GameLogicManager() {
  const store = useStore();
  useEffect(() => {
    let last = performance.now();
    const resetClock = () => { last = performance.now(); };
    const interval = setInterval(() => {
      const now = performance.now();
      const elapsedMs = Math.min(1000, Math.max(0, Math.round(now - last)));
      last = now;
      // No offline/catch-up growth yet. A hidden tab rests rather than making
      // an unreliable promise about background timer delivery.
      if (!document.hidden && elapsedMs > 0) store.dispatch(advanceGarden(elapsedMs));
    }, 1000);
    document.addEventListener('visibilitychange', resetClock);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', resetClock);
    };
  }, [store]);
  return null;
}
