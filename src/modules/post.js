import { createAction, handleActions } from 'redux-actions';
import {
  takeLatest, delay, put, call,
} from 'redux-saga/effects';
import shortid from 'shortid';
import produce from 'immer';
import faker from 'faker';
import createRequestSaga from '../lib/createRequestSaga';
import createRequestTypes from '../lib/createRequestTypes';
import { finishLoadingAction, startLoadingAction } from './loading';
import { addPostMeAction, removePostMeAction } from './user';
import * as postAPI from '../lib/api/post';

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

export const createDummyPosts = (count) => (Array(count).fill().map(() => (
  {
    id: shortid.generate(),
    User: {
      id: shortid.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [
      {
        src: faker.image.image(),
      },
    ],
    Comments: [
      {
        User: {
          id: shortid.generate(),
          nickname: faker.name.findName(),
        },
        content: faker.lorem.sentence(),
      },
    ],
  }
)));

// constants
export const [
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
] = createRequestTypes('post/LOAD_POSTS');
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
export const loadPostsActoin = createAction(LOAD_POSTS);
export const addPostAction = createAction(ADD_POST);
export const removePostAction = createAction(REMOVE_POST, (id) => id);
export const addCommentAction = createAction(ADD_COMMENT, (data) => data);

// middleware
// const loadPostsSaga = createRequestSaga(LOAD_POSTS, () => {});
function* loadPostsSaga() {
  yield put({
    type: LOAD_POSTS_SUCCESS,
  });
}
function* addPostSaga(action) {
  yield put(startLoadingAction(ADD_POST));
  try {
    const { payload } = action;
    const response = yield call(postAPI.addPost, payload);
    yield put({
      type: ADD_POST_SUCCESS,
      payload: response.data,
    });
    const { id } = payload;
    yield put(addPostMeAction(id));
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
  yield takeLatest(LOAD_POSTS, loadPostsSaga);
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
  hasMorePosts: true,
  imagePaths: [],
  postError: null,
};

const post = handleActions(
  {
    [LOAD_POSTS_SUCCESS]: (state) => ({
      ...state,
      postError: null,
      hasMorePosts: state.mainPosts.length < 50,
      mainPosts: state.mainPosts.concat(createDummyPosts(10)),
    }),
    [LOAD_POSTS_FAILURE]: (state, { payload: e }) => ({
      ...state,
      postError: e,
    }),
    [ADD_POST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      postError: null,
      mainPosts: [data, ...state.mainPosts],
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
      const foundPost = draft.mainPosts.find((v) => v.id === data.PostId);
      foundPost.Comments.unshift(data);
    }),
    [ADD_COMMENT_FAILURE]: (state, { payload: e }) => ({
      ...state,
      postError: e,
    }),
  },
  initialState,
);

export default post;
