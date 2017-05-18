import React, {Component} from 'react';
import {connect} from 'react-redux';
import getClientId from '../client_id';
import CurrentPlayer from './CurrentPlayer';
import Scores from '../components/Scores';
import Player from './Player';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import BackIcon from 'material-ui/svg-icons/hardware/keyboard-backspace';
import Drawer from 'material-ui/Drawer';

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


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => {
        this.setState({open: !this.state.open});
    }

    render() {
        return (
            <div>
                <AppBar
                    title={`Room Code: ${this.props.roomCode}`}
                    titleStyle={{fontSize:16}}
                    iconElementRight={<Settings/>}
                    onLeftIconButtonTouchTap={ this.handleToggle }
                />

                {this.props.currentPlayer === getClientId() ? <CurrentPlayer room={this.props.room} roomCode={this.props.roomCode} /> : <Player room={this.props.room} roomCode={this.props.roomCode} currentPlayerUUID={this.props.currentPlayer}/>}

                <Drawer open={this.state.open }>
                    <AppBar
                        title="Scores"
                        showMenuIconButton={false}
                        iconElementRight={<IconButton><BackIcon/></IconButton>}
                        onRightIconButtonTouchTap={ this.handleToggle }
                    />
                    <Scores room={this.props.room}/>
                </Drawer>
            </div>
        )
    }
}

function getCurrentPlayerUUID(currentPlayer, allPlayers) {
    let uuid = null;
    allPlayers.keySeq().forEach( (k,i) => {
        if(i === currentPlayer - 1) {
            uuid = k;
        }
    });
    return uuid;
}

function mapStateToProps(state, ownProps) {
    return{
        currentPlayer: getCurrentPlayerUUID(ownProps.room.getIn(['players','currentPlayer']), ownProps.room.getIn(['players','allPlayers']) )
    };
}

export default connect(mapStateToProps)(Game);