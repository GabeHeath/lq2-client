import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import getClientId from '../client_id';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {createRoom, joinRoom} from '../action_creators'
import {Map} from 'immutable';
import SnackbarWarningIcon from 'material-ui/svg-icons/av/new-releases';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import {amber200, red300} from 'material-ui/styles/colors';

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorText: '',
            showSnackbar: false,
            joinRoomErrorText: ''
        }
    }

    handleRequestClose = () => {
        this.setState({
            showSnackbar: false,
        });
    };

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h1>Questionable</h1>
                <TextField
                    inputStyle={{textTransform: "uppercase"}}
                    hintText="Enter Your Name"
                    floatingLabelText="Name"
                    errorText={this.state.errorText}
                    ref="nameField"
                />

                <RaisedButton
                    label="Start a New Game"
                    primary={true}
                    onTouchTap={ () => {
                        const name = ReactDOM.findDOMNode(this.refs.nameField.input).value.toUpperCase();
                        if(name === '') {
                            this.setState({ errorText: 'Name cannot be blank' });
                        } else {
                            this.setState({ errorText: '' });
                            const roomCode = createUniqueRoomCode(this.props.rooms);
                            this.props.createRoom(
                                roomCode,
                                Map({
                                    uuid: getClientId(),
                                    name: name
                                })
                            );
                            this.props.history.push('/game/' + roomCode);
                        }
                    }}/>

                <br/>

                <TextField
                    inputStyle={{textTransform: "uppercase"}}
                    hintText="Enter 4-Letter Code"
                    floatingLabelText="Room Code"
                    ref="roomCodeField"
                />

                <RaisedButton
                    label="Join a Game"
                    secondary={true}
                    onTouchTap={ () => {
                        const name = ReactDOM.findDOMNode(this.refs.nameField.input).value.toUpperCase();
                        const roomCode = ReactDOM.findDOMNode(this.refs.roomCodeField.input).value.toUpperCase();
                        if(name === "") {
                            this.setState({ errorText: 'Name cannot be blank' });
                        } else {
                            this.setState({ errorText: '' });
                            //Check if room doesn't exist
                            if(this.props.rooms.has(roomCode)) {
                                //check if player name already exists
                                let playerNameIsUnique = true;
                                this.props.rooms.getIn([roomCode, 'players', 'allPlayers']).forEach( player => {
                                    if(player.get('name') === name) {
                                        playerNameIsUnique = false;
                                    }
                                });

                                if(playerNameIsUnique) {
                                    this.props.joinRoom(
                                        roomCode,
                                        Map({
                                            uuid: getClientId(),
                                            name: name
                                        })
                                    );
                                    this.props.history.push('/game/' + roomCode);
                                } else {
                                    this.setState({ joinRoomErrorText: 'That player name is already taken' });
                                    this.setState({ showSnackbar: true });
                                }
                            } else {
                                this.setState({ joinRoomErrorText: 'That Room Code is invalid' });
                                this.setState({ showSnackbar: true });
                            }
                        }
                    }}/>

                    <Snackbar
                        open={this.state.showSnackbar}
                        bodyStyle={{backgroundColor: red300}}
                        message={
                            <div style={{textAlign: 'left'}}>
                                <IconButton>
                                    <SnackbarWarningIcon
                                        color={amber200}
                                    />
                                </IconButton>
                                <span style={{position: 'absolute'}}>{this.state.joinRoomErrorText}</span>
                            </div>}
                        autoHideDuration={44444000}
                        onRequestClose={this.handleRequestClose}
                    />
            </div>
        );
    }
}

function createUniqueRoomCode(rooms) {
    const roomCode = Math.random().toString(36).substr(2, 4).toUpperCase();
    return rooms.get(roomCode) ? createUniqueRoomCode(rooms) : roomCode;
}

function mapStateToProps(state) {
    return{
        rooms: state.get('rooms')
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        createRoom: createRoom,
        joinRoom: joinRoom
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainMenu);