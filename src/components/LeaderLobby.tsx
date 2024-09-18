import React, { useContext, useState, useEffect } from 'react';
import { GameContext } from '../contexts/GameContext';
import socket from '../socket';

const LeaderLobby: React.FC = () => {
  const { accessCode, setGamePhase } = useContext(GameContext);
  const [playerCount, setPlayerCount] = useState(1); // Leader is already connected

  useEffect(() => {
    socket.on('playerJoined', ({ playerCount }) => {
      setPlayerCount(playerCount);
    });

    return () => {
      socket.off('playerJoined');
    };
  }, []);

  const handleInitiateGame = () => {
    setGamePhase('adventure');
  };

  return (
    <div>
      <h2>Your Access Code: {accessCode}</h2>
      <p>Players connected: {playerCount}</p>
      <button onClick={handleInitiateGame}>Let's go</button>
    </div>
  );
};

export default LeaderLobby;
