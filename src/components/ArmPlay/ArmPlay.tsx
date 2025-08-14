import React, { useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import styles from './ArmPlay.module.css';
import { ArmPlayProps } from '../../types/componentsTypes';

const ArmPlay: React.FC<ArmPlayProps> = ({ onPull, disabled = false }) => {
  const [isPulled, setIsPulled] = useState<boolean>(false);
  const leverY = useSpring(0, { stiffness: 100, damping: 10 });

  const barHeight = useTransform(leverY, (y) => `${40 + y}px`);

  const handlePull = () => {
    if (disabled || isPulled) return;

    setIsPulled(true);

    leverY.set(60); // baja
    setTimeout(() => {
      leverY.set(0); // sube
      setTimeout(() => {
        setIsPulled(false);
        onPull(); // dispara los slots
      }, 300);
    }, 500);
  };

  return (
    <div className={styles.armWrapper} onClick={handlePull}>
      <motion.div className={styles.bar} style={{ height: barHeight }} />
      <motion.div className={styles.ball} style={{ y: leverY }} />
    </div>
  );
};

export default ArmPlay;