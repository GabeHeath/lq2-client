import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import getClientId from '../client_id';
import CurrentPlayer from './CurrentPlayer';
import Player from './Player';

class Game extends Component {
    render() {
        return (
            this.props.currentPlayer === getClientId() ? <CurrentPlayer room={this.props.room} roomCode={this.props.roomCode}/> : <Player room={this.props.room} roomCode={this.props.roomCode} currentPlayerUUID={this.props.currentPlayer}/>
        )
    }
}

function getCurrentPlayerUUID(currentPlayer, allPlayers) {
    let uuid = null;
    allPlayers.keySeq().forEach( (k,i) => {
        if(i === currentPlayer - 1) {
            uuid = k;
        }
    });
    return uuid;
}

function mapStateToProps(state, ownProps) {
    return{
        currentPlayer: getCurrentPlayerUUID(ownProps.room.getIn(['players','currentPlayer']), ownProps.room.getIn(['players','allPlayers']) )
    };
}

export default connect(mapStateToProps)(Game);