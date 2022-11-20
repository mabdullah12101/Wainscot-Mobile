const initialState = {
  count: 0,
};

const counter = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE': {
      const incrementCount = state.count + action.data;

      return {
        ...state,
        count: incrementCount,
      };
    }
    case 'DECREASE': {
      const decrementCounter = state.count - 1;

      return {
        ...state,
        count: decrementCounter,
      };
    }
    case 'RESET': {
      return {
        ...state,
        count: 0,
      };
    }
    default: {
      return state;
    }
  }
};

export default counter;
