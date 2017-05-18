export function createRoom(roomCode, player) {
    return {
        meta: {remote: true},
        type: 'CREATE_ROOM',
        roomCode: roomCode,
        player: player
    };
}

export function leaveRoom(roomCode, uuid) {
    return {
        meta: {remote: true},
        type: 'LEAVE_ROOM',
        roomCode: roomCode,
        uuid: uuid
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

export function nextPlayer(roomCode) {
    return {
        meta: {remote: true},
        type: 'NEXT_PLAYER',
        roomCode: roomCode
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

export function submitGuesses(roomCode, currentPlayerUUID, guesses) {
    return {
        meta: {remote: true},
        type: 'SUBMIT_GUESSES',
        roomCode: roomCode,
        currentPlayerUUID: currentPlayerUUID,
        guesses: guesses
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