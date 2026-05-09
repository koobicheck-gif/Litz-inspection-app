import { useEffect, useRef } from 'react';

export function useAutosave(report, save, intervalMs = 10000) {
  const lastSaved = useRef(JSON.stringify(report));

  useEffect(() => {
    const id = setInterval(() => {
      const current = JSON.stringify(report);
      if (current !== lastSaved.current) {
        save().then(() => { lastSaved.current = current; });
      }
    }, intervalMs);
    return () => clearInterval(id);
  }, [report, save, intervalMs]);
}
