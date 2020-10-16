import React, { useState } from 'react';
import Match from './screens/Match';
import './App.css';

function App() {
  const initialPlayerState = {
    name: '',
    currentMatch: '',
    choice: ''
  };
  const initialTournamentState = {
    playerCount: 0,
    players: [],
    currentStage: 'First',
    isActive: false,
    champion: null
  };
  const initialMatchState = {
    matchPlayers: [],
    winner: null
  }
  const [player, setPlayer] = useState(initialPlayerState);
  const [players, setPlayers] = useState([]);
  const [tournament, setTournament] = useState(initialTournamentState);

  function handleSubmit(event, player) {
    event.preventDefault();
    setPlayers([...players, player]);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setPlayer({ ...initialPlayerState, [name]: value });
  }

  function beginTournament() {
    setTournament({ 
      ...initialTournamentState, 
      playerCount: players.length,
      players: players,
      isActive: true
    })
  }

  return (
    <div className="App">
      <div className="Registration">
        <h1>Welcome To The Tournament</h1>
        <h3>Please register by entering your name.</h3>
        <h6>Note that you are betting your soul when you register.</h6>
        <form onSubmit={(event) => handleSubmit(event, player)}>
          <label>
            Name:
            <input type="text" name="name" value={player.name} onChange={handleInputChange} />
          </label>
          <input type="submit" value="Wager Your Soul" />
          <p style={{ fontSize: 6} }>Tournament organizer is not responsible for lost souls. There will be no refunds.</p>
        </form>
        <div className="PlayerList">
          <ul style={{ listStyleType: 'none' }}>
            {players.map(player => {
              return <li>{player.name} has wagered their soul</li>
            })}
          </ul>
        </div>
        <div className="StartGame">
          {players.length >= 2 ? <button onClick={beginTournament}>Begin The Tournament</button> : <button disabled>Waiting For Souls</button>}
        </div>
      </div>
      {tournament.isActive ? <Match players={[players[0], players[1]]} /> : null}
    </div>
  );
}

export default App;
