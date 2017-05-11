import React from 'react';
import {Link} from 'react-router-dom';
import getClientId from '../client_id';

const MainMenu = () => {
    return (
        <div>
            <div>{getClientId()}</div>
            <label htmlFor="name">Name (Limit 12 Characters)</label><br/>
            <input type="text" id="name" placeholder="Enter your name" />
            <br/>
            <label htmlFor="roomCode">Room Code</label><br/>
            <input type="text" id="roomCode" placeholder="Enter 4-Letter Code" />
            <br/>

            <h2>Main Menu here</h2>
            <ul>
                <li><Link to="/">Main Menu</Link></li>
                <li><Link to="/game/1111">GameStateWrapper</Link></li>
            </ul>
        </div>
    );
};

export default MainMenu;