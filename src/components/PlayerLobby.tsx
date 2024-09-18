import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const PlayerLobby: React.FC = () => {
  const { accessCode } = useContext(GameContext);

  return (
    <div>
      <h2>You have joined the game!</h2>
      <p>Access Code: {accessCode}</p>
      <p>Waiting for the leader to initiate the game...</p>
    </div>
  );
};

export default PlayerLobby;
