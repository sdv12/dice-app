import React from 'react';
import styles from './HistoryList.module.css';
import { HistoryListProps } from '../../types/componentsTypes';

const iconMap = {
  action: '💗',
  target: '🔥',
  extra: '🎲',
};

const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Últimos retos</h3>
      <ul className={styles.list}>
        {history.slice(0, 3).map((item, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.icon}>{iconMap.action}</span>
            <span className={styles.text}>
              {item.action.toUpperCase()} EN {item.target.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
