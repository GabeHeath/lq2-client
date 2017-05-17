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
                    {this.props.scores.map( (score,i) => {
                        return (
                            <ListItem
                                key={i}
                                leftAvatar={
                                    <Avatar
                                        color={deepOrange300}
                                        backgroundColor={purple500}
                                        size={30}
                                        style={style}
                                    >{score[0] ? score[0][0].toUpperCase() : '-'}</Avatar>
                                }
                                primaryText={`${score[0]}`}
                                rightAvatar={<Avatar
                                    color={grey800}
                                    backgroundColor={grey200}
                                    size={30}
                                    style={style}
                                >{score[1]}</Avatar>}
                            />
                        )
                    })}
                </List>
            </div>
        );
    }
}

function sortScores(players) {
    let sortable = [];

    players.keySeq().forEach( player => {
        sortable.push([players.getIn([player, 'name']), players.getIn([player, 'score'])]);
    });

    sortable.sort(function(a, b) {
        return a[0][1] - b[0][1];
    });

    return sortable;
}

function mapStateToProps(state, ownProps) {
    return{
        scores: sortScores(ownProps.room.getIn(['players', 'allPlayers']))
    };
}

export default connect(mapStateToProps)(Scores);