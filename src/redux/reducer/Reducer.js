import { GET_USER, SET_USER } from "../Action/typse";

const intialState = {
  user: undefined,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case SET_USER:
      const { user } = action;
      return { ...state, user: user };
  }
};
