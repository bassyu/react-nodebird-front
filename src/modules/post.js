import { createAction, handleActions } from 'redux-actions';
import { takeLatest, delay, put } from 'redux-saga/effects';
import shortid from 'shortid';
import produce from 'immer';
import createRequestSaga from '../lib/createRequestSaga';
import createRequestTypes from '../lib/createRequestTypes';
import { finishLoadingAction, startLoadingAction } from './loading';
import { addPostMeAction, removePostMeAction } from './user';

// constants
export const [
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
] = createRequestTypes('post/ADD_POST');
export const [
  REMOVE_POST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
] = createRequestTypes('post/REMOVE_POST');
export const [
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
] = createRequestTypes('post/ADD_COMMENT');

// actions
export const addPostAction = createAction(ADD_POST, (data) => data);
export const removePostAction = createAction(REMOVE_POST, (id) => id);
export const addCommentAction = createAction(ADD_COMMENT, (data) => data);

// middleware
function* addPostSaga(action) {
  yield put(startLoadingAction(ADD_POST));
  try {
    const { payload: data } = action;

    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      payload: data,
    });
    yield put(addPostMeAction(data.id));
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      payload: e,
    });
  }
  yield put(finishLoadingAction(ADD_POST));
}
function* removePostSaga(action) {
  yield put(startLoadingAction(REMOVE_POST));
  try {
    const { payload: id } = action;

    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      payload: id,
    });
    yield put(removePostMeAction(id));
  } catch (e) {
    yield put({
      type: REMOVE_POST_FAILURE,
      payload: e,
    });
  }
  yield put(finishLoadingAction(REMOVE_POST));
}
const addCommentSaga = createRequestSaga(ADD_COMMENT);
export function* postSaga() {
  yield takeLatest(ADD_POST, addPostSaga);
  yield takeLatest(REMOVE_POST, removePostSaga);
  yield takeLatest(ADD_COMMENT, addCommentSaga);
}

// reducer
const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'bassyu',
      },
      content: 'dldldl #tag #tag #hash',
      Images: [
        {
          id: shortid.generate(),
          src:
            'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        },
        {
          id: shortid.generate(),
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },
      ],
      Comments: [
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: 'guitaryu',
          },
          content: 'hihihihihi',
        },
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: 'drumyu',
          },
          content: 'hello',
        },
      ],
    },
  ],
  imagePaths: [],
  postError: null,
};

const createDummyPost = (data) => ({
  id: data.id,
  User: {
    id: 1,
    nickname: 'bassyu',
  },
  content: data.content,
  Images: [],
  Comments: [],
});

const createDummyComment = (data) => ({
  id: 2,
  content: data,
  User: {
    id: 1,
    nickname: 'bassyu',
  },
});

const post = handleActions(
  {
    [ADD_POST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      postError: null,
      mainPosts: [createDummyPost(data), ...state.mainPosts],
    }),
    [ADD_POST_FAILURE]: (state, { payload: e }) => ({
      ...state,
      postError: e,
    }),
    [REMOVE_POST_SUCCESS]: (state, { payload: id }) => ({
      ...state,
      postError: null,
      mainPosts: state.mainPosts.filter((mainPost) => mainPost.id !== id),
    }),
    [REMOVE_POST_FAILURE]: (state, { payload: e }) => ({
      ...state,
      postError: e,
    }),
    [ADD_COMMENT_SUCCESS]: (state, { payload: data }) => produce(state, (draft) => {
      draft.postError = null;
      const mainPostFinded = draft.mainPosts.find((mainPost) => mainPost.id === data.postId);
      mainPostFinded.Comments.unshift(createDummyComment(data.content));
    }),
    [ADD_COMMENT_FAILURE]: (state, { payload: e }) => ({
      ...state,
      postError: e,
    }),
  },
  initialState,
);

export default post;
