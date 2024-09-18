import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import socket from '../socket';

const Game: React.FC = () => {
  const { accessCode, character } = useContext(GameContext);
  const [gameText, setGameText] = useState<string[]>([]);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [playerAction, setPlayerAction] = useState('');

  useEffect(() => {
    socket.on('gameStarted', ({ adventure }) => {
      setGameText((prev) => [...prev, adventure]);
    });

    socket.on('actionOutcome', ({ outcome }) => {
      setGameText((prev) => [...prev, outcome]);
    });

    socket.on('yourTurn', () => {
      setIsMyTurn(true);
    });

    return () => {
      socket.off('gameStarted');
      socket.off('actionOutcome');
      socket.off('yourTurn');
    };
  }, []);

  const handleSubmitAction = () => {
    socket.emit('playerAction', { accessCode, action: playerAction, socketId: socket.id });
    setPlayerAction('');
    setIsMyTurn(false);
  };

	return (
		<div>
			<div style={{ fontSize: '14px', fontFamily: 'Arial', position: "absolute", top: "40px", maxWidth: "50%"}}>
				<p>Your character: {character}</p>
			</div>
			<br />
			<br />
			<br />
			<br />
			<div>
				{gameText.map((text, index) => (
					<p key={index}>{text}</p>
				))}
			</div>
			{isMyTurn && (
				<div>
					<textarea
						value={playerAction}
						onChange={(e) => setPlayerAction(e.target.value)}
						placeholder="What do you do?"
					/>
					<button onClick={handleSubmitAction}>Submit Action</button>
				</div>
			)}
			{!isMyTurn && <p>Waiting for other players...</p>}
		</div>
	);
};

export default Game;
