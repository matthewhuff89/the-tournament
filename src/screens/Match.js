import React, { useEffect, useState } from 'react';

export default function Match(props) {
    const initialMatchState = {
        players: props.players,
        isActive: true,
        currentPick: props.players[0],
        winner: ''
    }
    const [match, setMatch] = useState(initialMatchState);
    const [choices, setChoices] = useState({ [props.players[0].name]: '', [props.players[1].name]: '' })

    function determineWinner(players, choices) {
        // Ties
        if(choices[players[0].name] === choices[players[1].name]) {
            return "Tie";
        } 
        // Wins for Player 1
        if (choices[players[0].name] === 'Rock' && choices[players[1].name] === 'Scissors') {
            return players[0];
        } else if (choices[players[0].name] === 'Paper' && choices[players[1].name] === 'Rock') {
            return players[0];
        } else if (choices[players[0].name] === 'Scissors' && choices[players[1].name] === 'Paper') {
            return players[0]
        }
        // Wins for Player 2
        if (choices[players[1].name] === 'Rock' && choices[players[0].name] === 'Scissors') {
            return players[1];
        } else if (choices[players[1].name] === 'Paper' && choices[players[0].name] === 'Rock') {
            return players[1];
        } else if (choices[players[1].name] === 'Scissors' && choices[players[0].name] === 'Paper') {
            return players[1]
        }
    } 

    function selectRockPaperScissor(player, choice) {
        setChoices({ ...choices, [player.name]: choice });
        console.log(choices);
        if (choices[props.players[0].name] !== '' && choices[props.players[1].name] !== '') {
            console.log('making second pick');
            setMatch({ ...match, isActive: false,  winner: determineWinner(match.players, choices)})
        } else {
            setMatch({ ...match, currentPick: props.players[1] });
        }
    }

    return (match.isActive ? 
        <div className="match">
            <h2>{props.players[0].name} vs {props.players[1].name}</h2>
            <h3>Make Your Choice, {match.currentPick.name}!</h3>
            <button onClick={() => selectRockPaperScissor(match.currentPick, 'Rock')}>Rock</button>
            <button onClick={() => selectRockPaperScissor(match.currentPick, 'Paper')}>Paper</button>
            <button onClick={() => selectRockPaperScissor(match.currentPick, 'Scissors')}>Scissors</button>
        </div> : 
        <div>
            {match.winner !== "Tie" ? <h1>The Winner is {match.winner.name}!!</h1> : <h1>It's a tie! You both lose your souls!</h1>}
        </div>
    )
}