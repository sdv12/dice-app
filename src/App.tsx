import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header/Header';
import SlotMachine from './components/SlotMachine/SlotMachine';
import CountdownFire from './components/CountdownFire/CountdownFire';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';
import HistoryList from './components/HistoryList/HistoryList';
import SetupModal from './components/SetupModal/SetupModal';
import TurnIndicator from './components/TurnIndicator/TurnIndicator';
import ArmPlay from './components/ArmPlay/ArmPlay';
import HistoryModal from './components/HistoryModal/HistoryModal';
import SettingsModal from './components/SettingsModal/SettingsModal';
import './styles.css';
import { Language, IntensityLevel, HistoryItem, RollResult, ThemeColors } from './types/appTypes';

const AppContent = () => {
  const { isDarkMode } = useTheme() as { isDarkMode: boolean; colors: ThemeColors };
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [countdownActive, setCountdownActive] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<RollResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [avoidRepeat, setAvoidRepeat] = useState<boolean>(false);
  const [intensity, setIntensity] = useState<IntensityLevel>(
    (localStorage.getItem('intensity') as IntensityLevel) || 'medio'
  );
  const [players, setPlayers] = useState<string[]>(() => {
    try {
      const savedPlayers = localStorage.getItem('players');
      return savedPlayers ? JSON.parse(savedPlayers) : [];
    } catch {
      return [];
    }
  });
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(() => {
    const savedIndex = localStorage.getItem('currentPlayerIndex');
    return savedIndex ? parseInt(savedIndex) : 0;
  });
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showSetUpModal, setShowSetUpModal] = useState(players.length === 0);
  const [countdown, setCountdown] = useState<number>(10);
  const [language, setLanguage] = useState<Language>('es');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [threeSlotsEnabled, setThreeSlotsEnabled] = useState<boolean>(false);

  // Sincronizar estados con localStorage
  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('currentPlayerIndex', currentPlayerIndex.toString());
  }, [players, currentPlayerIndex]);

  const handleNextTurn = useCallback(() => {
    if (players.length === 0) return;
    setCurrentPlayerIndex(prev => {
      const newIndex = (prev + 1) % players.length;
      console.log('Cambiando turno a:', newIndex, players[newIndex]);
      return newIndex;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players.length]);

  const handleRollComplete = (result: RollResult) => {
    if (avoidRepeat && history.length > 0) {
      const last = history[0];
      const isSame =
        last.action === result.action &&
        last.target === result.target &&
        last.emoji === result.emoji;

      if (isSame) {
        console.log('Resultado repetido, descartado.');
        return;
      }
    }

    setHistory(prev => [
      { 
        ...result, 
        extraChallenge: undefined, 
        player: currentPlayerIndex 
      },
      ...prev.slice(0, 9)
    ]);
    setCurrentResult({ ...result });
  };

  const startCountdown = () => {
    if (currentResult) {
      console.log('Iniciando countdown. Turno actual:', currentPlayerIndex);
      setCountdownActive(true);
    }
  };

  const handleCountdownComplete = useCallback(() => {
    console.log('Countdown completado - cambiando turno');
    setCountdownActive(false);
    setCurrentResult(null);
    handleNextTurn();
  }, [handleNextTurn]);

  if (!players.length) {
    return (
      <SetupModal 
        onConfirm={(names) => {
          const playerNames = Array.isArray(names) ? names : [];
          console.log('Jugadores registrados:', playerNames);
          setPlayers(playerNames);
          setCurrentPlayerIndex(0);
        }} 
      />
    );
  }

  console.log('Estado actual:', {
    players,
    currentPlayerIndex,
    currentPlayerName: players[currentPlayerIndex],
    playersCount: players.length
  });

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''} intensity-${intensity}`}>
      {showSetUpModal && (
        <SetupModal
          onConfirm={(names) => {
            const playerNames = Array.isArray(names) ? names : [];
            console.log('[SetupModal] Jugadores recibidos:', playerNames);
            setPlayers(playerNames);
            setCurrentPlayerIndex(0);
            setShowSetUpModal(false);
          }}
        />
      )}

      <div className='bigHeader'>
        <HamburgerMenu
          intensity={intensity}
          setIntensity={setIntensity}
          onShowHistory={() => setShowHistoryModal(true)}
          onShowSettings={() => setShowSettingsModal(true)}
        />
        <div className='level'>
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#582e48', fontWeight: 'bold', marginTop: '0.5rem' }}>
            Nivel: {intensity === 'suave' ? '🎈 Suave' : intensity === 'medio' ? '🔥 Medio' : '💣 Hot'}
          </p>
        </div>
      </div>

      {showHistoryModal && (
        <HistoryModal
          history={history}
          players={players}
          onClose={() => setShowHistoryModal(false)}
          clearHistory={() => setHistory([])}
          language={language}
        />
      )}

      {showSettingsModal && (
        <SettingsModal
          onClose={() => setShowSettingsModal(false)}
          countdown={countdown}
          setCountdown={setCountdown}
          players={players}
          setPlayers={setPlayers}
          avoidRepeat={avoidRepeat}
          setAvoidRepeat={setAvoidRepeat}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          threeSlotsEnabled={threeSlotsEnabled}
          setThreeSlotsEnabled={setThreeSlotsEnabled}
          language={language}
          setLanguage={setLanguage}
        />
      )}

      <Header />
      <TurnIndicator current={currentPlayerIndex} players={players} />

      <div className='ArmSlots'>
        <SlotMachine
          isRolling={isRolling}
          stopRolling={() => setIsRolling(false)}
          onRollComplete={handleRollComplete}
          intensity={intensity}
        />
        <ArmPlay
          onPull={() => !isRolling && setIsRolling(true)}
          disabled={isRolling}
        />
      </div>

      <CountdownFire
        isActive={countdownActive}
        duration={countdown}
        onComplete={handleCountdownComplete}
      />

      <div className="controls">
        <div className='initChallenge'>
          {currentResult && !countdownActive && !isRolling && (
            <button
              className={'startChallenge'}
              onClick={() => {
                console.log('Botón presionado - currentPlayerIndex antes:', currentPlayerIndex);
                startCountdown();
              }}
            >
              INICIAR DESAFÍO
            </button>
          )}
        </div>
      </div>

      <HistoryList history={history} />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;