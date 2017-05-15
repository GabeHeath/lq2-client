import React, {Component} from 'react';
import {connect} from 'react-redux';
import Respond from '../components/Respond'
import AwaitingQuestion from '../components/AwaitingQuestion'

class Responding extends Component {
    render() {
        return (
            this.props.waitingOnQuestion ? <AwaitingQuestion currentPlayerName={this.props.currentPlayerName} /> : <Respond room={this.props.room} roomCode={this.props.roomCode}/>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return{
        waitingOnQuestion: !(ownProps.room.getIn(['questions', 'activeQuestions']).size === 1),
        currentPlayerName: ownProps.room.getIn(['players', 'allPlayers', ownProps.currentPlayerUUID, 'name'])
    };
}

export default connect(mapStateToProps)(Responding);