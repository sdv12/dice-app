import React, { useState } from 'react';
import styles from './SetupModal.module.css';
import { SetupModalProps } from '../../types/componentsTypes';

const SetupModal: React.FC<SetupModalProps> = ({ onConfirm }) => {
  const [names, setNames] = useState<string[]>(['Jugador 1', 'Jugador 2']);

  const handleNameChange = (index: number, value: string) => {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);
  };

  const handleAddPlayer = () => {
    setNames([...names, `Jugador ${names.length + 1}`]);
  };

  const handleStart = () => {
    const trimmed = names.map(n => n.trim()).filter(Boolean);
    if (trimmed.length >= 2) {
      onConfirm(trimmed);
    } else {
      alert('Agregá al menos 2 jugadores');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>¿Quiénes van a jugar?</h2>
        {names.map((name, idx) => (
          <input
            key={idx}
            type="text"
            value={name}
            onChange={(e) => handleNameChange(idx, e.target.value)}
            placeholder={`Jugador ${idx + 1}`}
            className={styles.input}
          />
        ))}
        <button onClick={handleAddPlayer} className={styles.addBtn}>+ Agregar jugador</button>
        <button onClick={handleStart} className={styles.startBtn}>Comenzar juego</button>
      </div>
    </div>
  );
};

export default SetupModal;