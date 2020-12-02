import createRequestTypes from './createRequestTypes';
import { call, put } from 'redux-saga/effects';
import { finishLoadingAction, startLoadingAction } from '../modules/loading';

function createRequestSaga(type, api) {
  const [, SUCCESS, FALIURE] = createRequestTypes(type);

  function* requestSaga(action) {
    yield put(startLoadingAction(type));
    try {
      const response = yield call(api, action.payload);
      yield put({
        type: SUCCESS,
        data: response.data,
      });
    } catch (e) {
      yield put({
        type: FALIURE,
        data: e.response.data,
      });
    }
    yield put(finishLoadingAction(type));
  }

  return requestSaga;
}

export default createRequestSaga;
