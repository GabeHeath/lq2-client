import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
import ResponseCompletedIcon from 'material-ui/svg-icons/action/check-circle';
import CurrentPlayerIcon from 'material-ui/svg-icons/action/visibility';
import {deepOrange300, purple500} from 'material-ui/styles/colors';
import getClientId from '../client_id';

const style = {margin: 5};

class Wait extends Component {
    render() {
        return(
            <div>
                <List>
                    <Subheader>Waiting for players to respond</Subheader>
                    {getClientId() !== this.props.currentPlayerUUID ?
                        <div>
                            <ListItem
                                leftAvatar={
                                    <Avatar
                                        color={deepOrange300}
                                        backgroundColor={purple500}
                                        size={30}
                                        style={style}
                                    >
                                        {this.props.currentPlayerName ? this.props.currentPlayerName[0] : '?'}
                                    </Avatar>
                                }
                                rightIcon={ <CurrentPlayerIcon />}
                                primaryText={this.props.currentPlayerName ? this.props.currentPlayerName[0] : 'Player left'}
                            />
                            <Divider/>
                        </div>
                        : null
                    }

                    { Object.keys(this.props.responses).map( (k,v) => {
                        return (
                            <div key={v}>
                                <ListItem
                                    leftAvatar={
                                        <Avatar
                                            color={deepOrange300}
                                            backgroundColor={purple500}
                                            size={30}
                                            style={style}
                                        >{k.toString()[0].toUpperCase()}</Avatar>
                                    }
                                    rightIcon={ (this.props.responses[k] === null) ? <CircularProgress size={20} color={deepOrange300} />: <ResponseCompletedIcon />}
                                    primaryText={k}
                                />
                                <Divider/>
                            </div>
                        )
                    })}
                </List>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return{
        currentPlayerName: ownProps.room.getIn(['players', 'allPlayers', ownProps.currentPlayerUUID, 'name'])
    };
}

export default connect(mapStateToProps)(Wait);