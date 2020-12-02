import { createAction, handleActions } from 'redux-actions';

// constants
const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

// actions
export const startLoadingAction = createAction(START_LOADING, (type) => type);
export const finishLoadingAction = createAction(FINISH_LOADING, (type) => type);

// reducer
const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: (state, { payload: type }) => ({
      ...state,
      [type]: true,
    }),
    [FINISH_LOADING]: (state, { payload: type }) => ({
      ...state,
      [type]: false,
    }),
  },
  initialState
);

export default loading;
