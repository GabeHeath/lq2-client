import React from 'react';
import {Route} from 'react-router-dom';
import MainMenu from '../components/MainMenu';
import GameStatus from './GameStatus';
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();

const App = () => {
    return (
        <div>
            <Route exact path="/" component={MainMenu}/>
            <Route exact path="/game/:roomCode" component={GameStatus}/>
        </div>
    );
};

export default App;
