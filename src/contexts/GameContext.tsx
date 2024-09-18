import React, { createContext, useState, useEffect } from 'react';
import socket from '../socket';

interface GameContextProps {
  accessCode: string;
  setAccessCode: React.Dispatch<React.SetStateAction<string>>;
  gamePhase: string;
  setGamePhase: React.Dispatch<React.SetStateAction<string>>;
  isLeader: boolean;
  setIsLeader: React.Dispatch<React.SetStateAction<boolean>>;
  character: string;
  setCharacter: React.Dispatch<React.SetStateAction<string>>;
}

export const GameContext = createContext<GameContextProps>({
  accessCode: '',
  setAccessCode: () => {},
  gamePhase: 'home',
  setGamePhase: () => {},
  isLeader: false,
  setIsLeader: () => {},
	character: '',
	setCharacter: () => {},
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessCode, setAccessCode] = useState('');
  const [gamePhase, setGamePhase] = useState('home'); // 'home', 'leaderLobby', 'playerLobby', 'adventure', 'characterSelection', 'game'
  const [isLeader, setIsLeader] = useState(false);
	const [character, setCharacter] = useState('');

  useEffect(() => {
    socket.on('gameCreated', ({ accessCode }) => {
      setAccessCode(accessCode);
      setIsLeader(true);
      setGamePhase('leaderLobby');
    });

    socket.on('gameJoined', ({ accessCode }) => {
      setAccessCode(accessCode);
      setIsLeader(false);
      setGamePhase('playerLobby');
    });

    socket.on('adventureSelected', () => {
      setGamePhase('characterSelection');
    });

    socket.on('gameStarted', () => {
      setGamePhase('game');
    });

    // Cleanup on unmount
    return () => {
      socket.off('gameCreated');
      socket.off('gameJoined');
      socket.off('adventureSelected');
      socket.off('gameStarted');
    };
  }, []);

  return (
    <GameContext.Provider
      value={{
        accessCode,
        setAccessCode,
        gamePhase,
        setGamePhase,
        isLeader,
        setIsLeader,
				character,
				setCharacter
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
