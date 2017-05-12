import React, {Component} from 'react';
import {connect} from 'react-redux';
import Game from './Game';
import Lobby from './Lobby';
import MainMenu from './MainMenu';

class GameStatus extends Component {

     render() {
        return (
            <div>
                { this.props.room ?
                    this.props.room.get('gameInProgress') ?
                        <Game room={this.props.room} roomCode={this.props.match.params.roomCode}/>
                        : <Lobby room={this.props.room} roomCode={this.props.match.params.roomCode}/>
                    : <MainMenu/>
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
       return {
           room: state.getIn(['rooms', ownProps.match.params.roomCode ])
       };
}

connect(mapStateToProps)(GameStatus);

export const GameStatusContainer = connect(
    mapStateToProps,
)(GameStatus);
