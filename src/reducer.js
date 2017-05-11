import {Map} from 'immutable';

const INITIAL_STATE = Map({
    rooms: Map()
});

function setState(state, newState) {
    return state.merge(newState);
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'CREATE_ROOM_COMPLETE':
            break;
        case 'CREATE_ROOM_ERROR':
            break;
        case 'CREATE_ROOM_START':
            break;
        case 'SET_STATE':
            return setState(state, action.state);
            break;
        default:
            return state;
    }
}