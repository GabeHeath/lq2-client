import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import App from './containers/App';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import logger from 'redux-logger';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const createStoreWithMiddleware = applyMiddleware(
    remoteActionMiddleware(socket),
    logger
)(createStore);

const store = createStoreWithMiddleware(reducer);

socket.on('state', state =>
    store.dispatch(setState(state))
);

// socket.on('code', code =>
//     console.log('This is the room code from server: ', code)
// );

// socket.emit('roomCode', 12345);

ReactDOM.render((
    <Provider store={store}>
        <MuiThemeProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>),
    document.getElementById('root'));
