import React, {Component} from 'react';
import {connect} from 'react-redux';
import getClientId from '../client_id';
import {leaveRoom} from '../action_creators'
import {bindActionCreators} from 'redux';
import Game from './Game';
import Lobby from '../components/Lobby';
import MainMenu from '../components/MainMenu';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';

class GameStatus extends Component {
    state = {
        open: true
    };

     render() {

        return (
            this.props.room ?
                this.props.room.get('gameInProgress') ?
                    <div>
                        <Game room={this.props.room} roomCode={this.props.match.params.roomCode}/>
                        {this.props.room.getIn(['players', 'allPlayers']).size < 3 ?
                            <Dialog
                                title="You had a good run"
                                actions={
                                    <Link to="/">
                                        <FlatButton
                                            label="Back to Main Menu"
                                            primary={true}
                                            onTouchTap={ () => {this.props.leaveRoom( this.props.match.params.roomCode, getClientId())} }
                                        />
                                    </Link>
                                }
                                modal={true}
                                open={this.state.open}
                            >
                                There are now less than 3 players left in the game.
                                It'd be pretty pointless to play at this point so you'll
                                have to go back to the Main Menu.
                            </Dialog> : null}
                    </div>
                    : <Lobby room={this.props.room} roomCode={this.props.match.params.roomCode}/>
                : <MainMenu/>
        )
    }
}

function mapStateToProps(state, ownProps) {
       return {
           room: state.getIn(['rooms', ownProps.match.params.roomCode ]),
       };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        leaveRoom: leaveRoom
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GameStatus);
