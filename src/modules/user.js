import { createAction, handleActions } from 'redux-actions';
import { takeLatest, put, call } from 'redux-saga/effects';
import produce from 'immer';
import createRequestTypes from '../lib/createRequestTypes';
import createRequestSaga from '../lib/createRequestSaga';
import * as userAPI from '../lib/api/user';
import { finishLoadingAction, startLoadingAction } from './loading';

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
function* registerSaga(action) {
  yield put(startLoadingAction(REGISTER));
  try {
    const { payload } = action;
    const response = yield call(userAPI.register, payload);
    yield put({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
    const { email, password } = payload;
    yield put(loginAction({ email, password }));
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e,
    });
  }
  yield put(finishLoadingAction(REGISTER));
}
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
  registerDone: false,
};

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

const user = handleActions(
  {
    [ADD_POST_ME]: (state, { payload: id }) => produce(state, (draft) => {
      draft.userError = null;
      draft.me.Posts.unshift({ id });
    }),
    [REMOVE_POST_ME]: (state, { payload: id }) => produce(state, (draft) => {
      draft.userError = null;
      draft.me.Posts = draft.me.Posts.filter((post) => post.id !== id);
    }),
    [LOGIN_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      userError: null,
      isLogin: true,
      me: createDummyMe(data),
    }),
    [LOGIN_FAILURE]: (state, { payload: e }) => ({
      ...state,
      userError: e,
    }),
    [LOGOUT_SUCCESS]: (state) => ({
      ...state,
      userError: null,
      isLogin: false,
      me: null,
    }),
    [LOGOUT_FAILURE]: (state, { payload: e }) => ({
      ...state,
      userError: e,
    }),
    [REGISTER_SUCCESS]: (state) => ({
      ...state,
      userError: null,
    }),
    [REGISTER_FAILURE]: (state, { payload: e }) => ({
      ...state,
      userError: e,
    }),
    [FOLLOW_SUCCESS]: (state, { payload: id }) => ({
      ...state,
      userError: null,
      me: {
        ...state.me,
        Followings: [{ id }, ...state.me.Followings],
      },
    }),
    [FOLLOW_FAILURE]: (state, { payload: e }) => ({
      ...state,
      userError: e,
    }),
    [UNFOLLOW_SUCCESS]: (state, { payload: id }) => ({
      ...state,
      userError: null,
      me: {
        ...state.me,
        Followings: state.me.Followings.filter((v) => v.id !== id),
      },
    }),
    [UNFOLLOW_FAILURE]: (state, { payload: e }) => ({
      ...state,
      userError: e,
    }),
    [CHANGE_NICKNAME_SUCCESS]: (state) => ({
      ...state,
      userError: null,
    }),
    [CHANGE_NICKNAME_FAILURE]: (state, { payload: e }) => ({
      ...state,
      userError: e,
    }),
  },
  initialState,
);

export default user;
