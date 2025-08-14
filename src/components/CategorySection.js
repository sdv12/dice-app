// src/components/CategorySection.js
import { useTheme } from '../context/ThemeContext';

const CategorySection = ({ title, items }) => {
  const { colors } = useTheme();

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{
        color: colors.secondary,
        textTransform: title === 'DANCE' ? 'uppercase' : 'capitalize',
        marginBottom: '0.5rem'
      }}>
        {title.endsWith(':') ? title.slice(0, -1) : title}
      </h3>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {items.map((item, i) => (
          <span key={i} style={{
            background: `rgba(255, 75, 145, 0.3)`,
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            border: `1px solid ${colors.primary}`
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategorySection