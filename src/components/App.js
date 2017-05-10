import React from 'react';
import {Route} from 'react-router-dom';
import MainMenu from './MainMenu';
import Lobby from './Lobby';
import Game from './Game';
import uuid from 'uuid';

const playerUUID = uuid.v1();

const MainMenuWrapper = () => {
    return (
        <MainMenu uuid={playerUUID}/>
    );
};

const App = () => {
    return (
        <div>
            <Route exact path="/" component={MainMenuWrapper}/>
            <Route exact path="/lobby" component={Lobby}/>
            <Route exact path="/game" component={Game}/>
        </div>
    );
};

export default App;
