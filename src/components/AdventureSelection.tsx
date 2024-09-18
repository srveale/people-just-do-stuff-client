import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import socket from '../socket';

const AdventureSelection: React.FC = () => {
  const { accessCode, setGamePhase } = useContext(GameContext);
  const [adventures, setAdventures] = useState<string[]>([]);
  const [customAdventure, setCustomAdventure] = useState('');
  const [selectedAdventure, setSelectedAdventure] = useState('');

  useEffect(() => {
    console.log('useEffect triggered with accessCode:', accessCode);
    socket.emit('getAdventureOptions', { accessCode });
    socket.on('adventureOptions', ({ adventures }) => {
      setAdventures(adventures);
    });

    return () => {
      socket.off('adventureOptions');
    };
  }, [accessCode]);

  const handleSelectAdventure = () => {
    const adventure = customAdventure || selectedAdventure;
    socket.emit('selectAdventure', { accessCode, adventure });
    // Update game phase to character selection
    setGamePhase('characterSelection');
  };

  return (
    <div>
      <h3>Pick what you want to do</h3>
      {adventures.map((adv, index) => (
        <div key={index}>
          <input
            type="radio"
            name="adventure"
            value={adv}
            onChange={() => setSelectedAdventure(adv)}
          />
          {adv}
        </div>
      ))}
      <br />
      <br />
      <textarea
        placeholder="Want to do something else? Write it here."
        value={customAdventure}
        onChange={(e) => setCustomAdventure(e.target.value)}
      />
      <button onClick={handleSelectAdventure}>Yeah that's the stuff</button>
    </div>
  );
};

export default AdventureSelection;
