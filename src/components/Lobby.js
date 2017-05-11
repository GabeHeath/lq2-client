import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Lobby extends Component {
    render() {
        return (
            <div>
                <h2>Lobby here</h2>

                <ul>
                    <li><Link to="/">Main Menu</Link></li>
                    <li><Link to="/lobby/1111">Lobby</Link></li>
                    <li><Link to="/game">Game</Link></li>
                </ul>
                <hr/>
                Here: {this.props.room}
                <br/>
            </div>
        )
    }
}

export default Lobby;