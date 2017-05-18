import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {startGame} from '../action_creators'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {deepOrange300, purple500} from 'material-ui/styles/colors';

const Settings = () => (
    <IconMenu
        iconButtonElement={
            <IconButton><MoreVertIcon color="#FFF" /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText="Leave Room" />
    </IconMenu>
);

const style = {margin: 5};

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {disableStartGame: props.room.getIn(['players', 'allPlayers']).size < 3}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({disableStartGame: nextProps.room.getIn(['players', 'allPlayers']).size < 3})
    }

    render() {
        return (
            <div>
                <AppBar
                    title={`Room Code: ${this.props.roomCode}`}
                    showMenuIconButton={false}
                    iconElementRight={<Settings/>}
                    onLeftIconButtonTouchTap={ this.handleToggle }
                />
                <List>
                    <Subheader>Lobby</Subheader>
                    { this.props.room.getIn(['players', 'allPlayers']).map((k) => {
                        return (
                            <div>
                                <ListItem
                                    leftAvatar={
                                        <Avatar
                                            color={deepOrange300}
                                            backgroundColor={purple500}
                                            size={30}
                                            style={style}
                                        >{k.get('name')[0].toUpperCase()}</Avatar>
                                    }
                                    primaryText={k.get('name')}
                                />
                                <Divider/>
                            </div>
                        )
                    })}
                </List>

                <div style={{textAlign: 'center'}}>
                    <RaisedButton label="Start Game"
                                  primary={true}
                                  disabled={this.state.disableStartGame}
                                  onTouchTap={ () => {
                                      this.props.startGame(this.props.roomCode);
                                  }}
                    />
                </div>

            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        startGame: startGame
    }, dispatch);
}

export default connect(null, matchDispatchToProps)(Lobby);