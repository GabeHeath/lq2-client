import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class AwaitingQuestion extends Component{
    render() {
        return (
            <div>
                <h4>Waiting for {this.props.currentPlayerName} to select a question</h4>
                <CircularProgress />
            </div>
        );
    }
}

export default AwaitingQuestion;