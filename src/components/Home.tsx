// src/components/Home.tsx
import React, { useContext, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import socket from '../socket';

const Home: React.FC = () => {
  const { setAccessCode } = useContext(GameContext);
  const [joinCode, setJoinCode] = useState('');

  const handleCreateGame = () => {
    socket.emit('createGame');
    // The gamePhase and accessCode will be set via the 'gameCreated' event listener in GameContext
  };

  const handleJoinGame = () => {
    socket.emit('joinGame', { accessCode: joinCode });
    // The gamePhase and accessCode will be set via the 'gameJoined' event listener in GameContext
  };

  return (
    <div>
      <h1>Are you ready to start doing stuff?</h1>
      <button onClick={handleCreateGame}>Start Doing Stuff</button>
      <br />
      <br />
      <br />
      <br />
      <div>
        <h3>Or, join in on other stuff</h3>
        <input
          type="text"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
          placeholder="Enter Access Code"
        />
        <button onClick={handleJoinGame}>Join Existing Stuff</button>
      </div>
    </div>
  );
};

export default Home;
