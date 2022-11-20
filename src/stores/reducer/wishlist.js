const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: '',
  pagination: {},
};

const wishlists = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_WISHLIST_BY_USER_ID_PENDING': {
      return {
        ...state,
        data: {},
        isLoading: true,
        pagination: {},
        message: '',
        isError: false,
      };
    }
    case 'GET_ALL_WISHLIST_BY_USER_ID_FULFILLED': {
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
        pagination: action.payload.data.pagination,
      };
    }
    case 'GET_ALL_WISHLIST_BY_USER_ID_REJECTED': {
      return {
        ...state,
        data: {},
        isLoading: false,
        pagination: {},
      };
    }
    case 'DELETE_WISHLIST_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    }
    case 'DELETE_WISHLIST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
      };
    }
    case 'DELETE_WISHLIST_REJECTED': {
      return {
        ...state,
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

export default wishlists;
