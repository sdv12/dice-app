import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import styles from './SlotMachine.module.css';
import { ACTIONS as LEVEL_ACTIONS, TARGETS as LEVEL_TARGETS, EMOJIS } from '../../data/intensityLevels';
import { SlotMachineProps, RollResult, IntensityLevel } from '../../types/componentsTypes';

const DEFAULT_ACTIONS = ['Besar', 'Lamer', 'Acariciar', 'Soplar', 'Morder', 'Chupar'];
const DEFAULT_ZONES = ['Cuello', 'Oreja', 'Labios', 'Pecho', 'Espalda', 'Muslos'];

const SlotMachine: React.FC<SlotMachineProps> = ({ 
  onRollComplete, 
  customData, 
  extraEnabled,
  isRolling,
  stopRolling,
  intensity = 'medio'
}) => {
  const [action, setAction] = useState<string>('Acción');
  const [target, setTarget] = useState<string>('Zona');
  const [emoji, setEmoji] = useState<string>('🎲');

  // 1. Primero usamos customData si existe, luego por intensidad, luego default
  const ACTIONS = customData?.actions || LEVEL_ACTIONS[intensity as IntensityLevel] || DEFAULT_ACTIONS;
  const ZONES = customData?.zones || LEVEL_TARGETS[intensity as IntensityLevel] || DEFAULT_ZONES;

  const roll = useCallback(() => {
    const rolls = 5;
    const rollDuration = 800;
    const interval = rollDuration / rolls;
    let rollCount = 0;

    const intervalId = setInterval(() => {
      rollCount++;
      
      setAction(ACTIONS[Math.floor(Math.random() * ACTIONS.length)]);
      setTarget(ZONES[Math.floor(Math.random() * ZONES.length)]);
      setEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);

      if (rollCount >= rolls) {
        clearInterval(intervalId);
        
        const finalAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
        const finalTarget = ZONES[Math.floor(Math.random() * ZONES.length)];
        const finalEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        
        setAction(finalAction);
        setTarget(finalTarget);
        setEmoji(finalEmoji);
        
        stopRolling();
        
        const result: RollResult = { 
          action: finalAction, 
          target: finalTarget, 
          emoji: finalEmoji,
        };
        onRollComplete?.(result);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [ACTIONS, ZONES, onRollComplete, stopRolling]);

  useEffect(() => {
    if (isRolling) {
      roll();
    }
  }, [isRolling, roll]);

  return (
    <div className={styles.container}>
      <motion.div
        className={`${styles.slot} ${styles.slotPrimary}`}
        data-intensity={intensity}
        animate={{
          rotateX: isRolling ? 360 : 0,
          scale: isRolling ? [1, 1.1, 1] : 1
        }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.emoji}>{emoji}</div>
        <div className={styles.text}>{action || 'Acción'}</div>
      </motion.div>

      <motion.div
        className={`${styles.slot} ${styles.slotSecondary}`}
        data-intensity={intensity}
        animate={{
          rotateX: isRolling ? 360 : 0,
          scale: isRolling ? [1, 1.1, 1] : 1
        }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className={styles.emoji}>{emoji}</div>
        <div className={styles.text}>{target || 'Zona'}</div>
      </motion.div>
    </div>
  );
};

export default SlotMachine;