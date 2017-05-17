import React, {Component} from 'react';
import {connect} from 'react-redux';
import Review from '../components/Review'
import Guess from '../components/Guess'

class Guessing extends Component {
    render() {
        return (
            this.props.inReview ? <Review room={this.props.room} roomCode={this.props.roomCode}/> : <Guess room={this.props.room} roomCode={this.props.roomCode}/>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return{
        inReview: !!(ownProps.room.get('guesses'))
    };
}

export default connect(mapStateToProps)(Guessing);