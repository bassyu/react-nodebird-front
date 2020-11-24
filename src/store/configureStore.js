import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../modules';

function configureStore() {
  const middlewares = [];
  const composeMethod =
    process.env.NODE_ENV === 'production' ? compose : composeWithDevTools;

  const store = createStore(
    rootReducer,
    composeMethod(applyMiddleware(...middlewares))
  );
  return store;
}

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
