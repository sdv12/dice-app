// src/components/ActionDisplay.js
import { useTheme } from '../context/ThemeContext';

const ActionDisplay = ({ verb = "CHUPAR", target = "MUSLOS" }) => {
  const { colors } = useTheme();

  return (
    <div style={{
      background: 'rgba(255, 75, 145, 0.2)',
      borderRadius: '20px',
      padding: '2rem',
      margin: '2rem auto',
      maxWidth: '80%',
      border: `2px solid ${colors.primary}`,
      textAlign: 'center'
    }}>
      <div style={{
        color: colors.secondary,
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }}>{verb}</div>
      <div style={{
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }}>{target}</div>
    </div>
  );
};

export default ActionDisplay