import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import getClientId from '../client_id';
import {amber200, deepOrange300, green200, green900, lime900, purple500, red200, red300, red900} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import ForgotToRespondIcon from 'material-ui/svg-icons/av/new-releases';
import {submitGuesses} from '../action_creators'

class Guess extends Component {
    state = {
        open: false
    };

    handleChange = (uuid, event, index, value) => {
        this.setState({
            [`${uuid}`]: value
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div style={{margin: 8}}>
                <Subheader style={{color: purple500}}>Try to match players to their response</Subheader>
                { this.props.shuffledKeys.map(uuid => {
                    const isDuplicate = isDuplicateName(this.state, this.state[uuid]);
                    const isSelected = !!(this.state[uuid]);
                    return (
                        <div key={uuid+'Container'}>
                            <Card key={uuid+'Card'}>
                                <Avatar
                                    color={isDuplicate ?
                                        lime900 :
                                        isSelected ?
                                            green900 :
                                            red900}
                                    backgroundColor={isDuplicate ?
                                        amber200 :
                                        isSelected ?
                                            green200 :
                                            red200}
                                    size={30}
                                    style={{marginTop: 30, marginLeft: 10, marginRight:10, float: 'left'}}
                                >{isDuplicate ? '!' : '?'}</Avatar>
                                <SelectField
                                    value={this.state[uuid]}
                                    onChange={this.handleChange.bind(this, uuid)}
                                    floatingLabelText="Whose response is this?"
                                    labelStyle={{ color: isDuplicate ? deepOrange300 : purple500 }}
                                >
                                    {Object.keys(this.props.responders).map( k => {
                                        const name = this.props.responders[k]['name'];
                                        return (
                                            <MenuItem key={k} value={name} primaryText={name} />
                                        )
                                    })}
                                </SelectField>

                                <CardText>
                                    {this.props.responders[uuid]['response']}
                                </CardText>
                            </Card>
                            <br/>
                        </div>
                    )
                })}
                <div style={{textAlign: 'center'}}>
                    <RaisedButton
                        label="Submit Guesses"
                        secondary={true}
                        style={{marginBottom: 20}}
                        onTouchTap={ () => {
                            const shouldSubmitGuess = (((Object.keys(this.state).length) - 1) === (Object.keys(this.props.responders).length)) && ((Object.keys(this.state).length) - 1) > 1
                            if( shouldSubmitGuess ) {
                                this.props.submitGuesses(this.props.roomCode, getClientId(), buildGuessesObj(this.state, this.props.room));
                            } else {
                                this.setState({ open: true });
                            }
                        }}
                    />
                </div>

                <Snackbar
                    open={this.state.open}
                    bodyStyle={{backgroundColor: red300}}
                    message={
                        <div style={{textAlign: 'left'}}>
                            <IconButton>
                                <ForgotToRespondIcon
                                    color={amber200}
                                />
                            </IconButton>
                            <span style={{position: 'absolute'}}>Looks like you missed a response</span>
                        </div>}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

function findUUIDByName(players, name) {
    let matchedUUID = null;
    players.keySeq().forEach( uuid => {
        if( players.getIn([uuid, 'name']) === name ) {
            matchedUUID = uuid;
        }
    });
    return matchedUUID;
}

function buildGuessesObj(state, room) {
    let guess = { score: 0 };

    Object.keys(state).forEach( uuid => {
        if(uuid !== 'open') {
            if( state[uuid] === room.getIn(['players', 'allPlayers', uuid, 'name']) ) {
                guess[uuid] = uuid;
                guess['score']++;
            } else {
                guess[uuid] = findUUIDByName(room.getIn(['players', 'allPlayers']), state[uuid]);
            }
        }
    });
    return guess;
}

function isDuplicateName(state, name = null) {
    let timesDuplicated = 0;
    if(name) {
        Object.keys(state).forEach( k => {
            if(state[k] === name) {
                timesDuplicated++
            }
        })
    }
    return timesDuplicated > 1;
}

function getResponders(allPlayers, yourUUID) {
    let responsesObj = {};
    allPlayers.entrySeq().forEach(player => {
        if (player[0] !== yourUUID) {
            responsesObj[player[0]] = {
                name: player[1].get('name'),
                response: player[1].get('lastResponse')
            };
        }
    });
    return responsesObj;
}

function mapStateToProps(state, ownProps) {
    const yourUUID = getClientId();
    const responders = getResponders(ownProps.room.getIn(['players', 'allPlayers']), yourUUID);
    return {
        responders: responders,
        shuffledKeys: Object.keys(responders).sort(() => {
            return Math.random() - 0.5
        })
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        submitGuesses: submitGuesses
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Guess);