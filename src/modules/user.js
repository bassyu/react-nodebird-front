import { createAction, handleActions } from 'redux-actions';
import createRequestTypes from '../lib/createRequestTypes';
import { takeLatest } from 'redux-saga/effects';

// constants
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestTypes(
  'user/LOGIN'
);
export const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestTypes(
  'user/LOGOUT'
);

// actions
export const loginAction = createAction(LOGIN, (me) => me);
export const logoutAction = createAction(LOGOUT);

//middlewares
function loginSaga() {}
export function* userSaga() {
  yield takeLatest();
}

// reducer
const initialState = {
  isLogin: false,
  me: null,
  registerData: {},
  loginData: {},
};

const user = handleActions(
  {
    [LOGIN_SUCCESS]: (state, { payload: me }) => ({
      ...state,
      isLogin: true,
      me,
    }),
    [LOGIN_FAILURE]: (state) => ({
      ...state,
    }),
    [LOGOUT_SUCCESS]: (state) => ({
      ...state,
      isLogin: false,
      me: null,
    }),
    [LOGOUT_FAILURE]: (state) => ({
      ...state,
    }),
  },
  initialState
);

export default user;
