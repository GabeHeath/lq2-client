export function createRoom(roomCode, player) {
    return {
        meta: {remote: true},
        type: 'CREATE_ROOM',
        roomCode: roomCode,
        player: player
    };
}

export function joinRoom(roomCode, player) {
    return {
        meta: {remote: true},
        type: 'JOIN_ROOM',
        roomCode: roomCode,
        player: player
    };
}

export function selectQuestion(roomCode, questionIndex) {
    return {
        meta: {remote: true},
        type: 'SELECT_QUESTION',
        roomCode: roomCode,
        questionIndex: questionIndex
    };
}

export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function startGame(roomCode) {
    return {
        meta: {remote: true},
        type: 'START_GAME',
        roomCode: roomCode
    };
}

export function submitResponse(roomCode, player) {
    return {
        meta: {remote: true},
        type: 'SUBMIT_RESPONSE',
        roomCode: roomCode,
        player: player
    };
}