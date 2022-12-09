import axios from '../../utils/axios';

export const login = data => {
  return new Promise((resolve, reject) => {
    axios
      .post('auth/login', data)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  // return {
  //   type: 'LOGIN',
  //   payload: axios.post('auth/login', data),
  // };
};
