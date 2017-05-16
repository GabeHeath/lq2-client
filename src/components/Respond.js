import React, {Component} from 'react';
import {Map} from 'immutable';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import {submitResponse} from '../action_creators'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import getClientId from '../client_id';

class Respond extends Component {
    constructor(props) {
        super(props);
        this.state = {errorText: ''}
    }

    render() {
        return(
            <div>
                <h3><b>Question:</b> {this.props.activeQuestion}</h3>
                <Divider/>
                <TextField
                    hintText="Response"
                    floatingLabelText="Enter Your Response"
                    multiLine={true}
                    rows={2}
                    errorText={this.state.errorText}
                    ref="responseField"
                />

                <RaisedButton
                    label="Submit Response"
                    primary={true}
                    onTouchTap={ () => {
                        const response = this.refs.responseField.getValue();
                        console.log(this.refs.responseField.getValue());
                        if(response === '') {
                            this.setState({ errorText: 'Response cannot be blank' });
                        } else {
                            this.setState({ errorText: '' });
                            const roomCode = this.props.roomCode;
                            this.props.submitResponse(
                                roomCode,
                                Map({
                                    uuid: getClientId(),
                                    response: response
                                })
                            );
                        }
                    }}/>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return{
        activeQuestion: ownProps.room.getIn(['questions', 'activeQuestions'])
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        submitResponse: submitResponse
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Respond);