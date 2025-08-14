
export interface ArmPlayProps {
  onPull: () => void;
  disabled?: boolean;
}

export interface CountdownFireProps {
  isActive: boolean;
  duration?: number;
  onComplete?: () => void;
}

export type FireSize = 'hidden' | 'small' | 'medium' | 'large';

export interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  data: {
    actions: string[];
    zones: string[];
  };
  onSave: (data: { actions: string[]; zones: string[] }) => void;
}

export interface ChallengeItem {
  text: string;
  emoji: string;
}

export interface ExtraChallengeProps {
  enabled: boolean;
  isRolling: boolean;
  onRollComplete?: (challenge: ChallengeItem) => void;
}

export interface DiceRolledEventDetail {
  action: string;
  icon: string;
}

export interface ForfeitProps {
  // Este componente no recibe props actualmente
}

export interface HamburgerMenuProps {
  intensity: IntensityLevel;
  setIntensity: (level: IntensityLevel) => void;
  onShowHistory: () => void;
  onShowSettings: () => void; // ✅ nuevo // Mejoraremos este tipo más adelante
}

export interface HeaderProps {
  // Este componente no recibe props actualmente
}

export interface HistoryItem {
  action: string;
  target: string;
  emoji?: string;
  player?: number;
  extraChallenge?: string;
}

export interface HistoryListProps {
  history: HistoryItem[];
}

export type Language = 'es' | 'en';
export type IntensityLevel = 'suave' | 'medio' | 'hot';

export interface SettingsModalProps {
  onClose: () => void;
  countdown: number;
  setCountdown: (val: number) => void;
  players: string[];
  setPlayers: (names: string[]) => void;
  avoidRepeat: boolean;
  setAvoidRepeat: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  threeSlotsEnabled: boolean;
  setThreeSlotsEnabled: (val: boolean) => void;
  language: Language;
  setLanguage: (val: Language) => void;
}

export interface IntensitySelectorProps {
  current: IntensityLevel;
  onClose: () => void;
  onSelect: (level: IntensityLevel) => void;
}

export interface HistoryModalProps {
  history: HistoryItem[];
  players: string[];
  onClose: () => void;
  clearHistory: () => void;       // ← nuevo: función para limpiar historial
  language?: 'es' | 'en';         // ← nuevo: soporte opcional de idioma
}


export interface SetupModalProps {
  onConfirm: (names: string[]) => void;
}

export interface SlotMachineProps {
  isRolling: boolean;
  stopRolling: () => void;
  onRollComplete?: (result: RollResult) => void;
  customData?: {
    actions: string[];
    zones: string[];
  };
  extraEnabled?: boolean;
  intensity?: IntensityLevel;
}

export interface TurnIndicatorProps {
  current: number;
  players: string[];
}

export type RollResult = {
  action: string;
  target: string;
  emoji: string;
  extraChallenge?: string; // ✅ AÑADIR ESTA LÍNEA
  player?: number; // también lo estás usando
};

export interface IntensityLevelData {
  [key: string]: {
    actions: string[];
    targets: string[];
  };
}