import socketIO from 'socket.io-client';

import {chatUrl} from './chat';

export const socket = socketIO(chatUrl);

export function enterRoom(room) {
  socket.emit('enterRoom', room);
}

export function leaveRoom(room) {
  socket.emit('leave-room', room);
}

export function addMessage(message) {
  socket.emit('add-message', message);
}

export function createChatRoom(room) {
  socket.emit('room', room);
}
