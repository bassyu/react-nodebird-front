import { createAction, handleActions } from 'redux-actions';

const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';

export const login = createAction(LOGIN, (me) => me);
export const logout = createAction(LOGOUT);

const initialState = {
  isLogin: false,
  me: null,
  registerData: {},
  loginData: {},
};

const user = handleActions(
  {
    [LOGIN]: (state, { payload: me }) => ({
      ...state,
      isLogin: true,
      me,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      isLogin: false,
      me: null,
    }),
  },
  initialState
);

export default user;
