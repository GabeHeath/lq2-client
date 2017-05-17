import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class AwaitingQuestion extends Component{
    render() {
        return (
            <div>
                <h4 style={{textAlign: 'center'}}>Waiting for {this.props.currentPlayerName} to select a question</h4>
                <div style={{marginLeft: 'calc(50% - 40px)'}}>
                    <CircularProgress/>
                </div>
            </div>
        );
    }
}

export default AwaitingQuestion;