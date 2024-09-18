import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import socket from '../socket';

const CharacterSelection: React.FC = () => {
  const { accessCode, isLeader, setGamePhase, setCharacter } = useContext(GameContext);
  const [characters, setCharacters] = useState<string[]>([]);
  const [customCharacter, setCustomCharacter] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [allCharactersSelected, setAllCharactersSelected] = useState(false);

  useEffect(() => {
    socket.emit('getCharacterOptions', { accessCode, socketId: socket.id });
    socket.on('characterOptions', ({ characters, socketId }) => {
      if (socketId !== socket.id) return
      setCharacters(characters);
    });

    socket.on('allCharactersSelected', () => {
      setAllCharactersSelected(true);
    });

    return () => {
      socket.off('characterOptions');
      socket.off('allCharactersSelected');
    };
  }, [accessCode]);

  const handleSelectCharacter = () => {
    const character = customCharacter || selectedCharacter;
    setCharacter(character);
    socket.emit('selectCharacter', { accessCode, character });
  };

  const handleStartGame = () => {
    socket.emit('startGame', { accessCode });
    setGamePhase('game');
  };

  return (
    <div>
      <h3>Select Your Character</h3>
      {characters.map((char, index) => (
        <div key={index}>
          <input
            type="radio"
            name="character"
            value={char}
            onChange={() => setSelectedCharacter(char)}
          />
          {char}
        </div>
      ))}
      <textarea
        placeholder="Or create your own character"
        value={customCharacter}
        onChange={(e) => setCustomCharacter(e.target.value)}
      />
      <button onClick={handleSelectCharacter}>Confirm Character</button>

      {isLeader && allCharactersSelected && (
        <button onClick={handleStartGame}>Start Game</button>
      )}
    </div>
  );
};

export default CharacterSelection;
