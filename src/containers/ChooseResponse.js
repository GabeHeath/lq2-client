import React, {Component} from 'react';
import {connect} from 'react-redux';
import Wait from '../components/Wait'
import Guess from '../components/Guess'
import getClientId from '../client_id';

class ChooseResponse extends Component {
   render() {
       return(
           this.props.shouldWait ? <Wait responses={this.props.responseObj} currentPlayerUUID={getClientId()} /> : <Guess/>
       )
   }
}

function shouldWait(responseObj) {
    for (let prop in responseObj) {
        const shouldWait = !responseObj.hasOwnProperty(prop) || responseObj[prop] === null;
        if (shouldWait) return shouldWait;
    }
    return false;
}

function buildResponseObj(players, uuid) {
    let playersObj = {};
    players.entrySeq().forEach( k => {
        if(k[0] !== uuid) {
            playersObj[k[1].get('name')] = k[1].get('lastResponse');
        }
    });
   return playersObj;
}

function mapStateToProps(state, ownProps) {
    const responseObj = buildResponseObj( ownProps.room.getIn(['players', 'allPlayers']), getClientId() );
    return{
        shouldWait: shouldWait(responseObj),
        responseObj: responseObj
    };
}

export default connect(mapStateToProps)(ChooseResponse);