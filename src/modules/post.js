import { createAction, handleActions } from 'redux-actions';

const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'bassyu',
      },
      content: 'dldldl #tag #tag',
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

const ADD_POST = 'post/ADD_POST';

export const addPost = createAction(ADD_POST);

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
