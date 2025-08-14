import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HamburgerMenu.module.css';
import { FaBullseye, FaHistory, FaCog, FaFire, FaBars } from 'react-icons/fa';
import IntensitySelector from '../IntensitySelector/IntensitySelector';
import SettingsModal from '../SettingsModal/SettingsModal';
import { HamburgerMenuProps, IntensityLevel, Language } from '../../types/componentsTypes';

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  intensity,
  setIntensity,
  onShowHistory,
  onShowSettings
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showIntensityModal, setShowIntensityModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.wrapper}>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <FaBars />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.menuPanel}
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          >
            <div className={styles.menuItem} onClick={() => setShowIntensityModal(true)}>
              <FaBullseye />
              <span>Intensity</span>
            </div>
            <div className={styles.menuItem} onClick={onShowHistory}>
              <FaHistory />
              <span>History</span>
            </div>
            <div className={styles.menuItem} onClick={() => console.log('Acciones')}>
              <FaFire />
              <span>Acciones</span>
            </div>
            <div className={styles.menuItem} onClick={onShowSettings}>
              <FaCog />
              <span>Settings</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showIntensityModal && (
          <IntensitySelector
            current={intensity} // tu estado actual de intensidad
            onSelect={(level: IntensityLevel) => {
              setIntensity(level);
              localStorage.setItem("intensity", level);
              setShowIntensityModal(false);
            }}
            onClose={() => setShowIntensityModal(false)}
          />
      )}

      {showSettingsModal && (
        <SettingsModal
          onClose={() => setShowSettingsModal(false)} countdown={0} setCountdown={function (val: number): void {
            throw new Error('Function not implemented.');
          } } players={[]} setPlayers={function (names: string[]): void {
            throw new Error('Function not implemented.');
          } } avoidRepeat={false} setAvoidRepeat={function (val: boolean): void {
            throw new Error('Function not implemented.');
          } } soundEnabled={false} setSoundEnabled={function (val: boolean): void {
            throw new Error('Function not implemented.');
          } } threeSlotsEnabled={false} setThreeSlotsEnabled={function (val: boolean): void {
            throw new Error('Function not implemented.');
          } } language={'es'} setLanguage={function (val: Language): void {
            throw new Error('Function not implemented.');
          } }        />
      )}
    </div>
  );
};

export default HamburgerMenu;