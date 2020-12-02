import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { all, fork } from 'redux-saga/effects';
import post from './post';
import user from './user';
import loading from './loading';

export function* rootSaga() {
  yield all([]);
}

const rootReducer = combineReducers({
  index: handleActions(
    {
      [HYDRATE]: (state, action) => ({ ...state, ...action.payload }),
    },
    {}
  ),
  loading,
  user,
  post,
});

export default rootReducer;
