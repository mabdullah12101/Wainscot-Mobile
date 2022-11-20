const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_BY_ID_PENDING': {
      return {
        ...state,
        data: {},
        isLoading: true,
        isError: false,
        message: '',
      };
    }
    case 'GET_USER_BY_ID_FULFILLED': {
      return {
        ...state,
        data: action.payload.data.data[0],
        isLoading: false,
      };
    }
    case 'GET_USER_BY_ID_REJECTED': {
      return {
        ...state,
        data: {},
        isLoading: false,
      };
    }
    case 'UPDATE_USER_BY_ID_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    }
    case 'UPDATE_USER_BY_ID_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
      };
    }
    case 'UPDATE_USER_BY_ID_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
      };
    }
    case 'UPDATE_IMAGE_BY_ID_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    }
    case 'UPDATE_IMAGE_BY_ID_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
      };
    }
    case 'UPDATE_IMAGE_BY_ID_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.response.data.message,
      };
    }
    case 'UPDATE_PASSWORD_BY_ID_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    }
    case 'UPDATE_PASSWORD_BY_ID_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.data.message,
      };
    }
    case 'UPDATE_PASSWORD_BY_ID_REJECTED': {
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

export default user;
