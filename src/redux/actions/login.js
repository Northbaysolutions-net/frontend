import { LOGIN_REQUEST } from '../constants/login';

export function login(payload) {
  return { type: LOGIN_REQUEST, payload };
}
