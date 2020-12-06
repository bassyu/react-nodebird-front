import { put } from 'redux-saga/effects';
import createRequestTypes from './createRequestTypes';
import { finishLoadingAction, startLoadingAction } from '../modules/loading';

function createRequestSaga(type) {
  const [, SUCCESS, FALIURE] = createRequestTypes(type);

  function* requestSaga(action) {
    yield put(startLoadingAction(type));
    try {
      const { payload } = action;
      // const response = yield call(api, payload);
      yield put({
        type: SUCCESS,
        payload,
      });
    } catch (e) {
      yield put({
        type: FALIURE,
        payload: e,
      });
    }
    yield put(finishLoadingAction(type));
  }
  return requestSaga;
}

export default createRequestSaga;
