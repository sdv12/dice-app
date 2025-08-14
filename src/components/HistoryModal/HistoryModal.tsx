import React from 'react';
import styles from './HistoryModal.module.css';
import { HistoryModalProps } from '../../types/componentsTypes';

const HistoryModal: React.FC<HistoryModalProps> = ({ 
  history, 
  players, 
  onClose,
  clearHistory,
  language = 'es'
}) => {
  const t = (es: string, en: string) => (language === 'es' ? es : en);

  const handleExport = () => {
    const content = history.slice(0, 10).map((item, index) => {
      const playerName = typeof item.player === 'number' ? (players[item.player] || `Jugador ${item.player + 1}`) : '';
      const baseLine = `${index + 1}. ${playerName} - ${item.emoji} ${item.action.toUpperCase()} en ${item.target.toUpperCase()}`;
      const extra = item.extraChallenge ? ` (${t('Extra', 'Extra')}: ${item.extraChallenge})` : '';
      return baseLine + extra;
    }).join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historial-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    const confirmMsg = t('¿Seguro que querés borrar el historial?', 'Are you sure you want to clear the history?');
    if (window.confirm(confirmMsg)) {
      clearHistory();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{t('Historial de Retos', 'Challenge History')}</h2>
        <ul>
          {history.slice(0, 10).map((item, index) => (
            <li key={index} className={styles.entry}>
              {typeof item.player === 'number' && (
                <span className={styles.playerTag}>
                  {t('Jugador', 'Player')} {item.player + 1}
                </span>
              )}
              <span className={styles.text}>
                {item.emoji} {item.action.toUpperCase()} {t('en', 'on')} {item.target.toUpperCase()}
                {item.extraChallenge && ` (${t('Extra', 'Extra')}: ${item.extraChallenge})`}
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.buttons}>
          <button onClick={handleExport}>{t('Exportar', 'Export')}</button>
          <button onClick={handleClear}>{t('Borrar', 'Clear')}</button>
          <button onClick={onClose}>{t('Cerrar', 'Close')}</button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
