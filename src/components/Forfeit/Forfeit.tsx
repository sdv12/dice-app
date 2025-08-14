import React, { useEffect, useState } from 'react';
import styles from './Forfeit.module.css';
import { DiceRolledEventDetail } from '../../types/componentsTypes';

const Forfeit: React.FC = () => {
  const [prenda, setPrenda] = useState<string | null>(null);

  useEffect(() => {
    const handleDiceRolled = (e: CustomEvent<DiceRolledEventDetail>) => {
      const { action, icon } = e.detail;
      setPrenda(`${icon} ${action.toUpperCase()}`);
    };

    window.addEventListener('dice-rolled', handleDiceRolled as EventListener);
    return () => {
      window.removeEventListener('dice-rolled', handleDiceRolled as EventListener);
    };
  }, []);

  if (!prenda) return null;

  return <div className={styles.prenda}>🔥 {prenda} 🔥</div>;
};

export default Forfeit;
