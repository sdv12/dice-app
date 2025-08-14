import React, { useState, useEffect, useCallback } from 'react';
import styles from './CountdownFire.module.css';
import { CountdownFireProps, FireSize } from '../../types/componentsTypes';

const CountdownFire: React.FC<CountdownFireProps> = ({ 
  isActive, 
  duration = 10, 
  onComplete 
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(duration);
  const [fireSize, setFireSize] = useState<FireSize>('hidden');

  const updateFireSize = useCallback((seconds: number) => {
    if (seconds > 7) setFireSize('large');
    else if (seconds > 4) setFireSize('medium');
    else if (seconds > 0) setFireSize('small');
  }, []);

  const resetTimer = useCallback(() => {
    setSecondsLeft(duration);
    setFireSize('hidden');
  }, [duration]);

  useEffect(() => {
    if (!isActive) {
      resetTimer();
      return;
    }

    // Iniciar animación
    setFireSize('large');
    setSecondsLeft(duration);

    let interval: NodeJS.Timeout;
    let completionTimer: NodeJS.Timeout;

    const startTimer = () => {
      interval = setInterval(() => {
        setSecondsLeft(prev => {
          const newSeconds = prev - 1;
          updateFireSize(newSeconds);
          return newSeconds;
        });
      }, 1000);

      completionTimer = setTimeout(() => {
        clearInterval(interval);
        setFireSize('hidden');
        onComplete?.();
      }, duration * 1000);
    };

    startTimer();

    return () => {
      clearInterval(interval);
      clearTimeout(completionTimer);
    };
  }, [isActive, duration, onComplete, resetTimer, updateFireSize]);

  if (!isActive) return null;

  return (
    <div className={styles.fireContainer}>
      <span 
        className={`${styles.fire} ${styles[fireSize]}`}
        aria-label="Countdown fire animation"
      >
        🔥
      </span>
      <div 
        className={styles.timeLeft}
        aria-live="polite"
      >
        {secondsLeft}s
      </div>
    </div>
  );
};

export default React.memo(CountdownFire);