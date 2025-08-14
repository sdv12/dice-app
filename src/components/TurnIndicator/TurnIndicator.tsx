import React from 'react';
import { TurnIndicatorProps } from '../../types/componentsTypes';

const TurnIndicator: React.FC<TurnIndicatorProps> = ({ current, players }) => {
  console.log('Renderizando TurnIndicator', { current, players });

    if (!players || players.length === 0) {
    return <div>No hay jugadores</div>;
  }

  const currentPlayerName = players[current] || `Jugador ${current + 1}`;

  return (
    <div style={{
      padding: '0.5rem 1rem',
      border: `2px solid #6b3553`,
      borderRadius: '12px',
      background: '#834568',
      color: '#ebd9d9',
      fontWeight: 'bold',
      fontSize: '1rem',
      textAlign: 'center',
      boxShadow: `0 0 10px #6b3553`,
      margin: 'auto',
      width: 'fit-content'
    }}>
      Turno de {currentPlayerName}
    </div>
  );
};

export default TurnIndicator;