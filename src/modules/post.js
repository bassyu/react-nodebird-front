import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import shortid from 'shortid';
import createRequestSaga from '../lib/createRequestSaga';
import createRequestTypes from '../lib/createRequestTypes';

// constants
export const [
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
] = createRequestTypes('post/ADD_POST');
export const [
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
] = createRequestTypes('post/ADD_COMMENT');

// actions
export const addPostAction = createAction(ADD_POST);
export const addCommentAction = createAction(ADD_COMMENT);

// middleware
const addPostSaga = createRequestSaga(ADD_POST);
const addCommentSaga = createRequestSaga(ADD_COMMENT);
export function* postSaga() {
  yield takeLatest(ADD_POST, addPostSaga);
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
          src:
            'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'guitaryu',
          },
          content: 'hihihihihi',
        },
        {
          User: {
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
  id: shortid.generate(),
  User: {
    id: 1,
    nickname: 'bassyu',
  },
  content: data,
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
      postError: e.response.data,
    }),
    [ADD_COMMENT_SUCCESS]: (state, { payload: data }) => {
      const mainPosts = [...state.mainPosts];
      const index = mainPosts.findIndex((i) => i.id === data.postId);
      const indexPost = mainPosts[index];
      mainPosts[index] = {
        ...indexPost,
        Comments: [createDummyComment(data), ...indexPost.Comments],
      };
      return {
        ...state,
        postError: null,
        mainPosts,
      };
    },
    [ADD_COMMENT_FAILURE]: (state, { payload: e }) => ({
      ...state,
      postError: e.response.data,
    }),
  },
  initialState,
);

export default post;
