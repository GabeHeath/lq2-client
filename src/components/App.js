import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MainMenu from './MainMenu';
import Lobby from './Lobby';
import Game from './Game';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

const App = () => {
    return (
        <Router>
            <div>
                <ul>
                    <li><Link to="/">Main Menu</Link></li>
                    <li><Link to="/lobby">Lobby</Link></li>
                    <li><Link to="/game">Game</Link></li>
                </ul>
                <hr/>

                <Route exact path="/" component={MainMenu}/>
                <Route exact path="/lobby" component={Lobby}/>
                <Route exact path="/game" component={Game}/>
            </div>
        </Router>
    );
};

export default App;
