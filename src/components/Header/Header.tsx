import React from 'react';
import { motion } from 'framer-motion';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1 className={styles.title}>LOVE</h1>
      <h2 className={styles.subtitle}>play</h2>
    </motion.div>
  );
};

export default Header;