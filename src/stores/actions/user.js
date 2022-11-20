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

export const updateImage = (userId, data) => {
  return {
    type: 'UPDATE_IMAGE_BY_ID',
    payload: axios.patch(`user/updateimage/${userId}`, data),
  };
};

export const updatePassword = (userId, data) => {
  return {
    type: 'UPDATE_PASSWORD_BY_ID',
    payload: axios.patch(`user/updatepassword/${userId}`, data),
  };
};
