import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import getClientId from '../client_id';
import {amber200, deepOrange300, green200, green900, lime900, purple500, red200, red900} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
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
            <div>
                <Subheader>Try to match players to their response</Subheader>
                { this.props.shuffledKeys.map(uuid => {
                    const isDuplicate = isDuplicateName(this.state, this.state[uuid]);
                    const isSelected = !!(this.state[uuid]);
                    return (
                        <div key={uuid+'Container'}>
                            <Card key={uuid+'Card'}>
                                <CardHeader
                                    title={<SelectField
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
                                            </SelectField>}
                                    avatar={<Avatar
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
                                                style={{marginTop: 30}}
                                            >{isDuplicate ? '!' : '?'}</Avatar>}
                                />
                                <CardText>
                                    {this.props.responders[uuid]['response']}
                                </CardText>
                            </Card>
                            <br/>
                        </div>
                    )
                })}
                <RaisedButton
                    label="Submit Guesses"
                    primary={true}
                    fullWidth={true}
                    onTouchTap={ () => {
                        const shouldSubmitGuess = (((Object.keys(this.state).length) - 1) === (Object.keys(this.props.responders).length)) && ((Object.keys(this.state).length) - 1) > 1
                        if( shouldSubmitGuess ) {
                            this.props.submitGuesses(this.props.roomCode, this.props.currentPlayerUUID, buildGuessesObj(this.state, this.props.room));
                        } else {
                            this.setState({ open: true });
                        }
                    }}
                />
                <Snackbar
                    open={this.state.open}
                    message={
                        <div>
                            <ForgotToRespondIcon
                                color={amber200}
                                style={{height: 36, width: 36, marginTop: 5, display: 'inline'}}
                            />
                            <div style={{marginTop: -60, textAlign: 'right', fontSize: 16}}>Looks like you missed a response</div>
                        </div>}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

function buildGuessesObj(state, room) {
    let guess = {
        score: 0
    };
    Object.keys(state).forEach( uuid => {
        if(uuid.toString() !== 'open') {
            if( state[uuid] === room.getIn(['players', 'allPlayers', uuid, 'name']) ) {
                guess[uuid] = true;
                guess['score']++;
            } else {
                guess[uuid] = false;
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