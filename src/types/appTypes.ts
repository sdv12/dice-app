
export type Language = 'es' | 'en';
export type IntensityLevel = 'suave' | 'medio' | 'hot';

export interface HistoryItem {
  action: string;
  target: string;
  emoji?: string;
  player: number;
  extraChallenge?: string;
}

export interface RollResult {
  action: string;
  target: string;
  emoji?: string;
  intensity?: IntensityLevel;
}

export interface Settings {
  countdown: number;
  players: string[];
  language: Language;
  soundEnabled: boolean;
  threeSlotsEnabled: boolean;
}

export interface ThemeColors {
  text: string;
  primary: string;
  // Agrega más colores si es necesario
}