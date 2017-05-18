import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {purple500} from 'material-ui/styles/colors';

class AwaitingQuestion extends Component{
    render() {
        return (
            <div>
                <h4 style={{textAlign: 'center'}}>Waiting for <span style={{color: purple500}}>{this.props.currentPlayerName}</span> to select a question</h4>
                <div style={{marginLeft: 'calc(50% - 40px)'}}>
                    <CircularProgress/>
                </div>
            </div>
        );
    }
}

export default AwaitingQuestion;