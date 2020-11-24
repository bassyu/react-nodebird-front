import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import post from "./post";
import user from "./user";

const rootReducer = combineReducers({
  index: handleActions(
    {
      [HYDRATE]: (state, action) => ({ ...state, ...action.payload }),
    },
    {}
  ),
  user,
  post,
});

export default rootReducer;
