import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import getClientId from '../client_id';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {createRoom, joinRoom} from '../action_creators'
import {Map} from 'immutable';

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {errorText: ''}
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="Enter Your Name"
                    floatingLabelText="Name"
                    errorText={this.state.errorText}
                    ref="nameField"
                />

                <RaisedButton
                    label="Start a New Game"
                    primary={true}
                    onTouchTap={ () => {
                        const name = ReactDOM.findDOMNode(this.refs.nameField.input).value;
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
                        const name = ReactDOM.findDOMNode(this.refs.nameField.input).value;
                        const roomCode = ReactDOM.findDOMNode(this.refs.roomCodeField.input).value;
                        if(name === "") {
                            this.setState({ errorText: 'Name cannot be blank' });
                        } else {
                            this.setState({ errorText: '' });
                            this.props.joinRoom(
                                roomCode,
                                Map({
                                    uuid: getClientId(),
                                    name: name
                                })
                            );
                            this.props.history.push('/game/' + roomCode);
                        }
                    }}/>
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