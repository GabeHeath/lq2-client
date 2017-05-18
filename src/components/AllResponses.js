import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import getClientId from '../client_id';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {List} from 'immutable';
import {deepOrange300, purple500} from 'material-ui/styles/colors';

class AllResponses extends Component {
    state = {
        liked: List()
    };

    handleLiked = (index) => {
        console.log(this.state);
        if(!this.state.liked[index]) {
            this.setState({
                liked: this.state.liked.set(index, true)
            })
            //send like to server
        }
    };

    render() {
        return (
            <div  style={{margin: 8}}>
                <Subheader style={{color: purple500}} >Your Response</Subheader>

                <Card>
                    <CardText>
                        <Chip style={{margin:10, float:'right', height: '100%'}}>
                            <Avatar size={32}>0</Avatar>
                            Likes
                        </Chip>
                        <span style={{lineHeight: 1.5}}>{this.props.yourResponse}</span>
                    </CardText>
                </Card>

                <Subheader style={{color: deepOrange300}}>Other Responses</Subheader>

                { this.props.otherResponses.map( (response, i) => {
                    return (
                        <div key={i}>
                            <Card>
                                <CardText>
                                    <Chip
                                        style={{margin:10, float:'right', height: '100%', backgroundColor: this.state.liked.get(i) ? '#f1dc90' : '#e0e0e0' }}
                                        onTouchTap={ () => {
                                            this.handleLiked(i);
                                        }}
                                    >
                                        <Avatar size={32}>0</Avatar>
                                        Likes
                                    </Chip>
                                    <span style={{lineHeight: 1.5}}>{response}</span>
                                </CardText>
                            </Card>
                            <br/>
                        </div>
                    )
                })}
            </div>
        );
    }
}

function getOtherResponses(allPlayers, yourUUID, currentPlayerUUID) {
    let responses = [];
    allPlayers.entrySeq().forEach(player => {
        if (player[0] !== yourUUID && player[0] !== currentPlayerUUID) {
            responses.push(player[1].get('lastResponse'));
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
        yourScore: ownProps.room.getIn(['players', 'allPlayers', yourUUID, 'score'])
    };
}

export default connect(mapStateToProps)(AllResponses);