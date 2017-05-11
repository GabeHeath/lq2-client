import React, {Component} from 'react';
import {connect} from 'react-redux';
import Game from './Game';
import Lobby from './Lobby';

class GameStatus extends Component {
     render() {
        return (
            <div>
                { !!(this.props.room && this.props.room.get('gameInProgress')) ?
                    <Game room={this.props.room}/> :
                    <Lobby room={this.props.room}/>
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
