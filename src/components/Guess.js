import React, {Component} from 'react';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import getClientId from '../client_id';
import {deepOrange300, purple500} from 'material-ui/styles/colors';

const style = {margin: 5};

class Guess extends Component {
    render() {
        return (
            <div>
                <Subheader>Try to match players to their response</Subheader>

                { this.props.responders.map(responder => {
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
                                {responder[]}
                            </CardText>
                        </Card>
                    )
                })}

            </div>
        );
    }
}

function getResponders(allPlayers, yourUUID) {
    let responsesObj = {};
    allPlayers.entrySeq().forEach(player => {
        if(player[0] !== yourUUID) {
            responsesObj[player[0]] = {
                name: player[1].get('name'),
                response: player[1].get('lastResponse')
            };
        }
    });
    return responsesObj;
}

function getResponderNames(responderObj) {
    let responderNames = [];
    Object.keys(responderObj).map( k => {
        responderNames.push( responderObj[k]['name'] );
    });
    return responderNames;
}

function mapStateToProps(state, ownProps) {
    const yourUUID = getClientId();
    const responders = getResponders(ownProps.room.getIn(['players', 'allPlayers']), yourUUID);
    return {
        responders: responders,
        shuffledKeys: Object.keys(responders).sort(function(a,b) {return Math.random() - 0.5;})
    };
}

export default connect(mapStateToProps)(Guess);