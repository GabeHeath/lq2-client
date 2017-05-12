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