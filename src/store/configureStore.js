import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from '../modules';

function configureStore() {
  const composeMethod = process.env.NODE_ENV === 'production' ? compose : composeWithDevTools;

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    composeMethod(applyMiddleware(sagaMiddleware)),
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
