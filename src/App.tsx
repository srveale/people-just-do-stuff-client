// src/App.tsx
import React, { useContext } from 'react';
import { GameProvider, GameContext } from './contexts/GameContext';
import Home from './components/Home';
import LeaderLobby from './components/LeaderLobby';
import PlayerLobby from './components/PlayerLobby';
import AdventureSelection from './components/AdventureSelection';
import CharacterSelection from './components/CharacterSelection';
import Game from './components/Game';
import './App.css'

const App: React.FC = () => {
  return (
    <GameProvider>
      <Main />
    </GameProvider>
  );
};

const Main: React.FC = () => {
  const { gamePhase, isLeader } = useContext(GameContext);
  console.log("gamePhase:", gamePhase)

  switch (gamePhase) {
    case 'home':
      return <Home />;
    case 'leaderLobby':
      return <LeaderLobby />;
    case 'playerLobby':
      return <PlayerLobby />;
    case 'adventure':
      return isLeader ? <AdventureSelection /> : <div>Waiting for the leader to select an adventure...</div>;
    case 'characterSelection':
      return <CharacterSelection />;
    case 'game':
      return <Game />;
    default:
      return <Home />;
  }
};

export default App;
