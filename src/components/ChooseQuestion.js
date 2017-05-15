import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectQuestion} from '../action_creators'
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

class ChooseQuestion extends Component {
    render() {
        return(
            <List>
                <Subheader>Choose a Question</Subheader>
                { this.props.activeQuestions.map( (question, index) => {
                    return (
                        <div key={index}>
                            <ListItem
                                key={index}
                                primaryText={question}
                                onTouchTap={ () => {
                                    // this.props.selectQuestion(this.props.roomCode , index)
                                    this.props.selectQuestion(this.props.roomCode , index)
                                }}
                            />
                            <Divider/>
                        </div>
                    )
                })}
            </List>
        )
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectQuestion: selectQuestion,
    }, dispatch);
}

export default connect(null, matchDispatchToProps)(ChooseQuestion);