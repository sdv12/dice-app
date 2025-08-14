import React from 'react';
import styles from './SettingsModal.module.css';
import { SettingsModalProps } from '../../types/componentsTypes';

const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  countdown,
  setCountdown,
  players,
  setPlayers,
  avoidRepeat,
  setAvoidRepeat,
  soundEnabled,
  setSoundEnabled,
  threeSlotsEnabled,
  setThreeSlotsEnabled,
  language,
  setLanguage,
}) => {
  const handlePlayerChange = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  type Language = 'es' | 'en';

  const addPlayer = () => {
    setPlayers([...players, `Jugador ${players.length + 1}`]);
  };

  const removePlayer = (index: number) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Configuración</h2>

        <div className={styles.section}>
          <label>Duración del contador (segundos):</label>
          <input
            type="number"
            value={countdown}
            onChange={(e) => setCountdown(Number(e.target.value))}
            min={5}
            max={60}
          />
        </div>

        <div className={styles.section}>
          <label>Jugadores:</label>
          {players.map((name, index) => (
            <div key={index} className={styles.playerRow}>
              <input
                type="text"
                value={name}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
              />
              {players.length > 1 && (
                <button onClick={() => removePlayer(index)}>X</button>
              )}
            </div>
          ))}
          <button onClick={addPlayer}>Agregar jugador</button>
        </div>

        <div className={styles.section}>
          <label>
            <input
              type="checkbox"
              checked={avoidRepeat}
              onChange={(e) => setAvoidRepeat(e.target.checked)}
            />
            Evitar repetir el reto anterior
          </label>
        </div>

        <div className={styles.section}>
          <label>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
            />
            Sonido activado
          </label>
        </div>

        <div className={styles.section}>
          <label>
            <input
              type="checkbox"
              checked={threeSlotsEnabled}
              onChange={(e) => setThreeSlotsEnabled(e.target.checked)}
            />
            Activar tercer slot
          </label>
        </div>

        <div className={styles.section}>
          <label>Idioma:</label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as Language)}
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className={styles.summary}>
          <p><strong>Resumen:</strong></p>
          <p>{players.length} jugador(es)</p>
          <p>Contador: {countdown}s</p>
          <p>Repetición: {avoidRepeat ? 'NO repetir' : 'Permitir repetición'}</p>
          <p>Sonido: {soundEnabled ? 'Activado' : 'Desactivado'}</p>
          <p>3 Slots: {threeSlotsEnabled ? 'Activado' : 'Desactivado'}</p>
          <p>Idioma: {language === 'es' ? 'Español' : 'English'}</p>
        </div>

        <button onClick={onClose} className={styles.closeButton}>Cerrar</button>
      </div>
    </div>
  );
};

export default SettingsModal;