import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import getClientId from '../client_id';
import {deepOrange300, purple500} from 'material-ui/styles/colors';

const style = {margin: 5};

class AllResponses extends Component {
    render() {
        return (
            <div>
                <Subheader>Your Response</Subheader>


                <Card>
                    <CardHeader
                        title={this.props.yourName}
                        subtitle={"Score: " + this.props.yourScore}
                        avatar={<Avatar
                            color={deepOrange300}
                            backgroundColor={purple500}
                            size={30}
                            style={style}
                        >{this.props.yourName[0].toUpperCase()}</Avatar>}
                    />
                    <CardText>
                        {this.props.yourResponse}
                    </CardText>
                </Card>

                <Subheader>Other Responses</Subheader>
                <List>
                    { this.props.otherResponses.map(response => {
                        return (
                            <Card>
                                <CardHeader
                                    title={"Name: ????"}
                                    subtitle={"Score: ????"}
                                    avatar={<Avatar
                                        color={deepOrange300}
                                        backgroundColor={purple500}
                                        size={30}
                                        style={style}
                                    >?</Avatar>}
                                />
                                <CardText>
                                    {response}
                                </CardText>
                            </Card>
                        )
                    })}
                </List>
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