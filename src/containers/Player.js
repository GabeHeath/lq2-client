import React, {Component} from 'react';
import {connect} from 'react-redux';
import getClientId from '../client_id';
import Wait from "../components/Wait";
import AllResponses from "../components/AllResponses";
import Responding from "../containers/Responding";

class Player extends Component {
    render() {
        return (
            this.props.showAllResponses ?
                <AllResponses room={this.props.room} roomCode={this.props.roomCode} currentPlayerUUID={this.props.currentPlayerUUID}/> :
                this.props.shouldWait ?
                    <Responding room={this.props.room} roomCode={this.props.roomCode} currentPlayerUUID={this.props.currentPlayerUUID}/> :
                    <Wait room={this.props.room} responses={this.props.responseObj} currentPlayerUUID={this.props.currentPlayerUUID} />
        );
    }
}

function showAllResponses(responseObj) {
    for (let prop in responseObj) {
        const showAllResponses = !(!responseObj.hasOwnProperty(prop) || responseObj[prop] === null);
        if (!showAllResponses) return showAllResponses;
    }
    return true;
}

function buildResponseObj(players, currentPlayerUUID) {
    let playersObj = {};
    players.entrySeq().forEach( k => {
        if(k[0] !== currentPlayerUUID) {
            playersObj[k[1].get('name')] = k[1].get('lastResponse')
        }
    });
    return playersObj;
}

function mapStateToProps(state, ownProps) {
    const responseObj = buildResponseObj( ownProps.room.getIn(['players', 'allPlayers']), ownProps.currentPlayerUUID );
    return{
        shouldWait: !(ownProps.room.getIn(['players', 'allPlayers', getClientId(), 'lastResponse'])),
        responseObj: responseObj,
        showAllResponses: showAllResponses(responseObj)
    };
}

export default connect(mapStateToProps)(Player);