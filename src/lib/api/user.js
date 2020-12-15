import client from './client';

export const register = ({ email, nickname, password }) => client.post(
  '/user', { email, nickname, password },
);

export const login = ({ email, password }) => client.post(
  '/user/login', { email, password },
);
