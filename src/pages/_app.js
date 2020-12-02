import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';
import withReduxSaga from 'next-redux-saga';

function App({ Component }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
}

App.PropTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(App));
