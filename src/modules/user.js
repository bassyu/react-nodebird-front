import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestTypes from '../lib/createRequestTypes';
import createRequestSaga from '../lib/createRequestSaga';

const createDummyMe = (data) => ({
  ...data,
  nickname: 'bassyu',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: 'a' },
    { nickname: 'b' },
    { nickname: 'c' },
  ],
  Followers: [
    { nickname: 'a' },
    { nickname: 'b' },
    { nickname: 'c' },
  ],
});

// constants
export const ADD_POST_ME = 'user/ADD_POST_ME';
export const REMOVE_POST_ME = 'user/REMOVE_POST_ME';
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestTypes(
  'user/LOGIN',
);
export const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestTypes(
  'user/LOGOUT',
);
export const [
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
] = createRequestTypes('user/REGISTER');
export const [FOLLOW, FOLLOW_SUCCESS, FOLLOW_FAILURE] = createRequestTypes(
  'user/FOLLOW',
);
export const [
  UNFOLLOW,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
] = createRequestTypes('user/UNFOLLOW');
export const [
  CHANGE_NICKNAME,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
] = createRequestTypes('user/CHANGE_NICKNAME');

// actions
export const addPostMeAction = createAction(ADD_POST_ME);
export const removePostMeAction = createAction(REMOVE_POST_ME);
export const loginAction = createAction(LOGIN, (me) => me);
export const logoutAction = createAction(LOGOUT);
export const registerAction = createAction(REGISTER, (data) => data);
export const followAction = createAction(FOLLOW);
export const unfollowAction = createAction(UNFOLLOW);
export const changeNicknameAction = createAction(CHANGE_NICKNAME);

// middleware
const loginSaga = createRequestSaga(LOGIN, () => {});
const logoutSaga = createRequestSaga(LOGOUT, () => {});
const registerSaga = createRequestSaga(REGISTER, () => {});
const followSaga = createRequestSaga(FOLLOW, () => {});
const unfollowSaga = createRequestSaga(UNFOLLOW, () => {});
const changeNicknameSaga = createRequestSaga(CHANGE_NICKNAME, () => {});
export function* userSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(FOLLOW, followSaga);
  yield takeLatest(UNFOLLOW, unfollowSaga);
  yield takeLatest(CHANGE_NICKNAME, changeNicknameSaga);
}

// reducer
const initialState = {
  isLogin: false,
  me: null,
  registerData: {},
  loginData: {},
  userError: null,
};

const user = handleActions(
  {
    [ADD_POST_ME]: (state, { payload: id }) => ({
      ...state,
      userError: null,
      me: {
        ...state.me,
        Posts: [{ id }, ...state.me.Posts],
      },
    }),
    [REMOVE_POST_ME]: (state, { payload: id }) => ({
      ...state,
      userError: null,
      me: {
        ...state.me,
        Posts: state.me.Posts.filter((i) => i.id !== id),
      },
    }),
    [LOGIN_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      userError: null,
      isLogin: true,
      me: createDummyMe(data),
    }),
    [LOGIN_FAILURE]: (state, { payload: e }) => ({
      ...state,
      userError: e.response.data,
    }),
    [LOGOUT_SUCCESS]: (state) => ({
      ...state,
      userError: null,
      isLogin: false,
      me: null,
    }),
    [LOGOUT_FAILURE]: (state, { payload: e }) => ({
      ...state,
      userError: e.response.data,
    }),
    [REGISTER_SUCCESS]: (state) => ({
      ...state,
      userError: null,
    }),
    [REGISTER_FAILURE]: (state, { payload: e }) => ({
      ...state,
      userError: e.response.data,
    }),
    [CHANGE_NICKNAME_SUCCESS]: (state) => ({
      ...state,
      userError: null,
    }),
    [CHANGE_NICKNAME_FAILURE]: (state, { payload: e }) => ({
      ...state,
      userError: e.response.data,
    }),
  },
  initialState,
);

export default user;
