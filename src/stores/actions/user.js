import axios from '../../utils/axios';

export const getDataUserById = userId => {
  return {
    type: 'GET_USER_BY_ID',
    payload: axios.get(`user/${userId}`),
  };
};

export const updateProfileUser = (userId, data) => {
  return {
    type: 'UPDATE_USER_BY_ID',
    payload: axios.patch(`user/${userId}`, data),
  };
};

export const updateImage = async (userId, data) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`user/updateimage/${userId}`, data)
      .then(res => {
        resolve(res);

        // if (res.data.status >= 200 && res.data.status < 400) {
        //   resolve(res);
        // } else {
        //   reject(res);
        // }
      })
      .catch(err => {
        reject(err);
      });
    // .reject(err => reject(err));
  });
  // return {
  //   type: 'UPDATE_IMAGE_BY_ID',
  //   payload: axios.patch(`user/updateimage/${userId}`, data),
  // };
};

export const updatePassword = (userId, data) => {
  return {
    type: 'UPDATE_PASSWORD_BY_ID',
    payload: axios.patch(`user/updatepassword/${userId}`, data),
  };
};
