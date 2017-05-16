import React, {Component} from 'react';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import getClientId from '../client_id';
import {deepOrange300, purple500} from 'material-ui/styles/colors';

const items = [
    <MenuItem key={1} value={1} primaryText="Never"/>,
    <MenuItem key={2} value={2} primaryText="Every Night"/>,
    <MenuItem key={3} value={3} primaryText="Weeknights"/>,
    <MenuItem key={4} value={4} primaryText="Weekends"/>,
    <MenuItem key={5} value={5} primaryText="Weekly"/>,
];

class Guess extends Component {
    state = {
        value: null,
    };

    handleChange = (event, index, value) => this.setState({value});

    render() {
        return (
            <div>
                <Subheader>Try to match players to their response</Subheader>
                { this.props.shuffledKeys.map(uuid => {
                    return (
                        <div>
                            <Card key={uuid}>
                                <CardHeader
                                    title={<SelectField
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        floatingLabelText="Who's response is this?"
                                    >
                                        {items}
                                    </SelectField>}
                                    // subtitle={"Score: ????"}
                                    avatar={<Avatar
                                        color={deepOrange300}
                                        backgroundColor={purple500}
                                        size={30}
                                        style={{marginTop: 30}}
                                    >?</Avatar>}
                                />
                                <CardText>
                                    {this.props.responders[uuid]['response']}
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

function getResponders(allPlayers, yourUUID) {
    let responsesObj = {};
    allPlayers.entrySeq().forEach(player => {
        if (player[0] !== yourUUID) {
            responsesObj[player[0]] = {
                name: player[1].get('name'),
                response: player[1].get('lastResponse')
            };
        }
    });
    return responsesObj;
}

// function getResponderNames(responderObj) {
//     let responderNames = [];
//     Object.keys(responderObj).map( k => {
//         responderNames.push( responderObj[k]['name'] );
//     });
//     return responderNames;
// }

function mapStateToProps(state, ownProps) {
    const yourUUID = getClientId();
    const responders = getResponders(ownProps.room.getIn(['players', 'allPlayers']), yourUUID);
    return {
        responders: responders,
        shuffledKeys: Object.keys(responders).sort(function (a, b) {
            return Math.random() - 0.5;
        })
    };
}

export default connect(mapStateToProps)(Guess);