import React from 'react';
import styles from './IntensitySelector.module.css';
import { IntensityLevel } from '../../types/componentsTypes';
import { IntensitySelectorProps } from '../../types/componentsTypes';

const IntensitySelector: React.FC<IntensitySelectorProps> = ({ 
  onClose, 
  onSelect, 
  current 
}) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Elegí la intensidad</h3>
        <ul>
          {['suave', 'medio', 'hot'].map((level) => (
            <li
              key={level}
              className={current === level ? styles.active : ''}
              onClick={() => {
                onSelect(level as IntensityLevel);
                onClose();
              }}
            >
              {level === 'suave' ? '🎈 Suave' : level === 'medio' ? '🔥 Medio' : '💣 Hot'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IntensitySelector;
