import { api } from '../Lib/Api.js';

export const usersApi = {
  register: (payload) => api.post('/api/users', payload),
};
