import axios from '../../utils/axios';

export const getBookingByUserId = (userId, page) => {
  return {
    type: 'GET_BOOOKING_BY_USER_ID',
    payload: axios.get(`booking/${userId}?page=${page}`),
  };
};

export const createBooking = data => {
  return {
    type: 'CREATE_BOOKING',
    payload: axios.post('/booking', data),
  };
};
