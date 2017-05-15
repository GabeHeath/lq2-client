import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChooseQuestion from '../components/ChooseQuestion'
import ChooseResponse from './ChooseResponse'

class CurrentPlayer extends Component {
    render() {
        return (
            this.props.activeQuestions.size === 1 ? <ChooseResponse room={this.props.room} roomCode={this.props.roomCode}/> : <ChooseQuestion activeQuestions={this.props.activeQuestions} roomCode={this.props.roomCode}/>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return{
        activeQuestions: ownProps.room.getIn(['questions', 'activeQuestions'])
    };
}

export default connect(mapStateToProps)(CurrentPlayer);