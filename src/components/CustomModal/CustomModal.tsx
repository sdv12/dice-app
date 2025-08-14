import React, { useState } from 'react';
import styles from './CustomModal.module.css';
import { CustomModalProps } from '../../types/componentsTypes';

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, data, onSave }) => {
  const [actions, setActions] = useState<string>(data.actions.join('\n'));
  const [zones, setZones] = useState<string>(data.zones.join('\n'));

  const handleSave = () => {
    const updated = {
      actions: actions.split('\n').map(a => a.trim()).filter(Boolean),
      zones: zones.split('\n').map(z => z.trim()).filter(Boolean),
    };
    onSave(updated);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Personalizar Listas</h2>
        <label>Acciones:</label>
        <textarea 
          value={actions} 
          onChange={(e) => setActions(e.target.value)} 
        />
        <label>Zonas:</label>
        <textarea 
          value={zones} 
          onChange={(e) => setZones(e.target.value)} 
        />
        <div className={styles.buttons}>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
