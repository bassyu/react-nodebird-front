import { put, call } from 'redux-saga/effects';
import createRequestTypes from './createRequestTypes';
import { finishLoadingAction, startLoadingAction } from '../modules/loading';

export default function createRequestSaga(type, api) {
  const [, SUCCESS, FALIURE] = createRequestTypes(type);

  return function* requestSaga(action) {
    yield put(startLoadingAction(type));
    try {
      const { payload } = action;
      const response = yield call(api, payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
      yield put({
        type: FALIURE,
        payload: e,
      });
    }
    yield put(finishLoadingAction(type));
  };
}
