import axios from '../../utils/axios';

export const login = data => {
  return {
    type: 'LOGIN',
    payload: axios.post('auth/login', data),
  };
};
