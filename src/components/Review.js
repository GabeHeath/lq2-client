import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {nextPlayer} from '../action_creators'
import getClientId from '../client_id';
import {Card, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {deepOrange300, green200, green500, purple500, red200, red600} from 'material-ui/styles/colors';

const styles = {
    chip: {
        margin: 8,
        color: green500
    },
    floatingChip: {
        margin: 8,
        float: 'left'
    }
};

class Review extends Component {
    render() {
        return(
            <div style={{margin: 8}}>
                <Subheader><span style={{color: purple500}} >{this.props.currentPlayerName}</span> scored <span style={{color: deepOrange300}}>{this.props.room.getIn(['guesses', 'score'])}</span> out of <span style={{color: deepOrange300}}>{(this.props.room.getIn(['players', 'allPlayers']).size) - 1}</span> points</Subheader>
                { this.props.room.get('guesses').keySeq().map( (uuid, i) => {
                    return (
                        uuid !== 'score' ?
                            <div key={i}>
                                <Card>
                                    {uuid === this.props.room.getIn(['guesses', uuid]) ?
                                        <div>
                                            <br/>
                                            <Chip
                                                backgroundColor={green200}
                                                style={styles.chip}
                                            >
                                                <Avatar size={32} color={green200} backgroundColor={green500}>
                                                    ✓
                                                </Avatar>
                                                {this.props.room.getIn(['players', 'allPlayers', uuid, 'name'])}
                                            </Chip>
                                            <CardText>
                                                {this.props.room.getIn(['players', 'allPlayers', uuid, 'lastResponse'])}
                                            </CardText>
                                        </div>
                                    :
                                        <div>
                                            <br/>
                                            <Chip
                                                backgroundColor={red200}
                                                style={styles.floatingChip}
                                            >
                                                <Avatar size={32} color={red200} backgroundColor={red600}>
                                                    X
                                                </Avatar>
                                                {this.props.room.getIn(['players', 'allPlayers', this.props.room.getIn(['guesses', uuid]), 'name'])}
                                            </Chip>

                                            <Chip
                                                backgroundColor={green200}
                                                style={styles.chip}
                                            >
                                                <Avatar size={32} color={green200} backgroundColor={green500}>
                                                    ✓
                                                </Avatar>
                                                {this.props.room.getIn(['players', 'allPlayers', uuid, 'name'])}
                                            </Chip>
                                            <CardText>
                                                {this.props.room.getIn(['players', 'allPlayers', uuid, 'lastResponse'])}
                                            </CardText>
                                        </div>}
                                </Card>
                                <br/>
                            </div>
                        : null
                    )
                })}
                {this.props.currentPlayerUUID === getClientId() ?
                    <RaisedButton
                        label="Continue"
                        style={{marginBottom: 10}}
                        secondary={true}
                        fullWidth={true}
                        onTouchTap={ () => { this.props.nextPlayer( this.props.roomCode ) }}
                    />
                :
                    <div style={{textAlign: 'center'}}>
                        <CircularProgress size={20} style={{margin:10}} />
                        <div style={{fontWeight: 'bold', textAlign: 'center'}}>Waiting for <span style={{color: purple500}}>{this.props.currentPlayerName}</span> to continue</div>
                    </div>
                }
            </div>
        );
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
    const currentPlayerUUID = getCurrentPlayerUUID( ownProps.room.getIn(['players', 'currentPlayer']), ownProps.room.getIn(['players', 'allPlayers']) );
    return{
        currentPlayerUUID: currentPlayerUUID,
        currentPlayerName: ownProps.room.getIn(['players', 'allPlayers', currentPlayerUUID, 'name'])
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        nextPlayer: nextPlayer
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Review);