import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import getClientId from '../client_id';

class AllResponses extends Component {
    render() {
        return (
            <div>
                <Subheader>Your Response</Subheader>

                <Card>
                    <CardText>
                        {this.props.yourResponse}
                    </CardText>
                </Card>

                <Subheader>Other Responses</Subheader>

                { this.props.otherResponses.map( (response, i) => {
                    return (
                        <div key={i}>
                            <Card>
                                <CardText>
                                    {response}
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