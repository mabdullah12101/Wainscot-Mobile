const initialState = {
  data: {},
  urlMidtrans: '',
  isLoading: false,
  isError: false,
  message: '',
  pagination: {},
};

const bookings = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOOOKING_BY_USER_ID_PENDING': {
      return {
        ...state,
        data: {},
        isLoading: true,
        pagination: {},
        urlMidtrans: '',
        message: '',
        isError: false,
      };
    }
    case 'GET_BOOOKING_BY_USER_ID_FULFILLED': {
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
        pagination: action.payload.data.pagination,
      };
    }
    case 'GET_BOOOKING_BY_USER_ID_REJECTED': {
      return {
        ...state,
        data: {},
        isLoading: false,
        pagination: {},
      };
    }
    case 'CREATE_BOOKING_PENDING': {
      return {
        ...state,
        urlMidtrans: '',
        isLoading: true,
        isError: false,
        message: '',
      };
    }
    case 'CREATE_BOOKING_FULFILLED': {
      return {
        ...state,
        urlMidtrans: action.payload.data.data.redirect_url,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
      };
    }
    case 'CREATE_BOOKING_REJECTED': {
      return {
        ...state,
        urlMidtrans: '',
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
      };
    }
    default: {
      return state;
    }
  }
};

export default bookings;
