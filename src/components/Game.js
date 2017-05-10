import React from 'react';
import {Link} from 'react-router-dom';

const Game = ({pathname}) => {
    return (
        <div>
            <h2>Game here {pathname}</h2>

            <ul>
                <li><Link to="/">Main Menu</Link></li>
                <li><Link to="/lobby">Lobby</Link></li>
                <li><Link to="/game">Game</Link></li>
            </ul>
        </div>
    );
};

export default Game;