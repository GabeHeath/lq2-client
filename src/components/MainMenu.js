import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import getClientId from '../client_id';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { errorText: '', value: props.value }
    }

    render() {
        return (
            <div>
                <div>{getClientId()}</div>

                <TextField
                    hintText="Enter Your Name"
                    floatingLabelText="Name"
                    errorText= {this.state.errorText}
                    ref="nameField"
                />

                <RaisedButton
                    label="Start a New Game"
                    primary={true}
                    onTouchTap={ () => {
                        const newItem = ReactDOM.findDOMNode(this.refs.nameField.input).value
                        newItem === "" ? this.setState({ errorText: 'Name cannot be blank' }) : this.setState({ errorText: '' })
                    }}/>

                <br/>

                <TextField
                    hintText="Enter 4-Letter Code"
                    floatingLabelText="Room Code"
                    ref="roomCodeField"
                />

                <RaisedButton
                    label="Join a Game"
                    secondary={true}
                    onTouchTap={ () => {
                        const newItem = ReactDOM.findDOMNode(this.refs.nameField.input).value
                        newItem === "" ? this.setState({ errorText: 'Name cannot be blank' }) : this.setState({ errorText: '' })
                    }}/>

                <br/>

                <h2>Main Menu here</h2>
                <ul>
                    <li><Link to="/">Main Menu</Link></li>
                    <li><Link to="/game/1111">GameStateWrapper</Link></li>
                </ul>
            </div>
        );
    }
}

export default MainMenu;