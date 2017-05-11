import React from 'react';
import {Route} from 'react-router-dom';
import MainMenu from './MainMenu';
import {GameStatusContainer} from './GameStatus';

const App = () => {
    return (
        <div>
            <Route exact path="/" component={MainMenu}/>
            <Route exact path="/game/:roomCode" component={GameStatusContainer}/>
        </div>
    );
};

export default App;
