import types from './actionTypes';

export function closeConnection() {
  return { type: types.CLOSE };
}

export function reConnect() {
  return { type: types.CONNECT };
}
