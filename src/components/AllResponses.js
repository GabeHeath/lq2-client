import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {submitLike} from '../action_creators'
import {Card, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import getClientId from '../client_id';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {List} from 'immutable';
import SnackbarWarningIcon from 'material-ui/svg-icons/av/new-releases';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import {amber200, deepOrange300, purple500, red300} from 'material-ui/styles/colors';

class AllResponses extends Component {
    state = {
        liked: List(),
        showSnackbar: false
    };

    handleRequestClose = () => {
        this.setState({
            showSnackbar: false,
        });
    };

    handleLiked = (index, uuid) => {
        console.log(this.state.liked);
        if (!this.state.liked.get(index)) {
            this.setState({
                liked: this.state.liked.set(index, true)
            });
            this.props.submitLike(
                this.props.roomCode,
                uuid
            )
        }
    };

    render() {
        return (
            <div style={{margin: 8}}>
                <Subheader style={{color: purple500}}>Your Response</Subheader>

                <Card>
                    <CardText>
                        <Chip
                            style={{margin: 10, float: 'right', height: '100%'}}
                            onTouchTap={() => {
                                this.setState({ showSnackbar: true });
                            }}
                        >
                            <Avatar size={32}>{this.props.yourResponseLikes}</Avatar>
                            Likes
                        </Chip>
                        <span style={{lineHeight: 1.5}}>{this.props.yourResponse}</span>
                    </CardText>
                </Card>

                <Subheader style={{color: deepOrange300}}>Other Responses</Subheader>

                { this.props.otherResponses.map((response, i) => {
                    return (
                        <div key={i}>
                            <Card>
                                <CardText>
                                    <Chip
                                        style={{
                                            margin: 10,
                                            float: 'right',
                                            height: '100%',
                                            backgroundColor: this.state.liked.get(i) ? '#f1dc90' : '#e0e0e0'
                                        }}
                                        onTouchTap={ () => {
                                            this.handleLiked(i, response[1]);
                                        }}
                                    >
                                        <Avatar
                                            size={32}
                                            style={{backgroundColor: this.state.liked.get(i) ? '#d8ba4e' : '#bcbcbc'}}
                                        >{response[2]}</Avatar>
                                        Likes
                                    </Chip>
                                    <span style={{lineHeight: 1.5}}>{response[0]}</span>
                                </CardText>
                            </Card>
                            <br/>
                        </div>
                    )
                })}

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
                            <span style={{position: 'absolute'}}>You can't vote for your own response.</span>
                        </div>}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />

            </div>
        );
    }
}

function getOtherResponses(allPlayers, yourUUID, currentPlayerUUID) {
    let responses = [];
    allPlayers.entrySeq().forEach(player => {
        if (player[0] !== yourUUID && player[0] !== currentPlayerUUID) {
            responses.push([player[1].get('lastResponse'), player[0], player[1].get('lastResponseLikes')]);
        }
    });

    return responses.sort(function () {
        return .5 - Math.random();
    });
}

function mapStateToProps(state, ownProps) {
    const yourUUID = getClientId();
    return {
        yourResponse: ownProps.room.getIn(['players', 'allPlayers', yourUUID, 'lastResponse']),
        otherResponses: getOtherResponses(ownProps.room.getIn(['players', 'allPlayers']), yourUUID, ownProps.currentPlayerUUID),
        yourName: ownProps.room.getIn(['players', 'allPlayers', yourUUID, 'name']),
        yourScore: ownProps.room.getIn(['players', 'allPlayers', yourUUID, 'score']),
        yourResponseLikes: ownProps.room.getIn(['players', 'allPlayers', yourUUID, 'lastResponseLikes'])
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        submitLike: submitLike
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AllResponses);