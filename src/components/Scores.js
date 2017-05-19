import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {deepOrange300, grey200, grey800, purple500} from 'material-ui/styles/colors';

const style = {margin: 5};

class Scores extends Component {
    render() {
        return (
            <div>
                <List>
                    {this.props.scores.map( (uuid,i) => {
                        const name = getNameFromUUID(this.props.room, uuid);
                        const score = getScoreFromUUID(this.props.room, uuid);
                        const likes = getLikesFromUUID(this.props.room, uuid);
                        return (
                            <ListItem
                                key={i}
                                leftAvatar={
                                    <Avatar
                                        color={deepOrange300}
                                        backgroundColor={purple500}
                                        size={30}
                                        style={style}
                                    >{ name ? name[0] : '-'}</Avatar>
                                }
                                primaryText={`${name}`}
                                secondaryText={`Likes: ${likes}`}
                                rightAvatar={<Avatar
                                    color={grey800}
                                    backgroundColor={grey200}
                                    size={30}
                                    style={style}
                                >{score}</Avatar>}
                            />
                        )
                    })}
                </List>
            </div>
        );
    }
}

function getNameFromUUID(room, uuid) {
    return room.getIn(['players', 'allPlayers', uuid, 'name']);
}


function getScoreFromUUID(room, uuid) {
    return room.getIn(['players', 'allPlayers', uuid, 'score']);
}

function getLikesFromUUID(room, uuid) {
    return room.getIn(['players', 'allPlayers', uuid, 'likes']);
}

function sortScores(players) {
    return players.keySeq().sort(
        function(a,b){
            return players.getIn([b,'score']) - players.getIn([a,'score']);
        })
}

function mapStateToProps(state, ownProps) {
    return{
        scores: sortScores(ownProps.room.getIn(['players', 'allPlayers']))
    };
}

export default connect(mapStateToProps)(Scores);