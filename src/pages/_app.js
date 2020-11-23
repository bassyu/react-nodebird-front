import PropTypes from "prop-types";
import Head from "next/head";
import "antd/dist/antd.css";

function App({ Component }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>노드버드</title>
      </Head>
      <Component />
    </>
  );
}

App.PropTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
