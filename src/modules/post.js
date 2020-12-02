import { createAction, handleActions } from 'redux-actions';
import { takeLatest, delay, put } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import createRequestTypes from '../lib/createRequestTypes';

// constants
export const [
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
] = createRequestTypes('post/ADD_POST');

// actions
export const addPostAction = createAction(ADD_POST);

//middlewares
const addPostSaga = createRequestSaga(ADD_POST, api);
export function* postSaga() {
  yield takeLatest(ADD_POST, addPostSaga);
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
  postAdded: false,
};

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: 'bassyu',
  },
  content: 'dummy! #dum #dum',
  Images: [],
  Comments: [],
};

const post = handleActions(
  {
    [ADD_POST]: (state) => ({
      ...state,
      mainPosts: [dummyPost, ...state.mainPosts],
      postAdded: true,
    }),
  },
  initialState
);

export default post;
