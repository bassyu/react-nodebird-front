import PropTypes from "prop-types";
import Link from "next/link";

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href="/">
          <a>logo</a>
        </Link>
        <Link href="/profile">
          <a>profile</a>
        </Link>
        <Link href="/signup">
          <a>signup</a>
        </Link>
      </div>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  // 여기서 node 는 react 에서의 렌더링(return) 가능한 그것을 의미함
  children: PropTypes.node.isRequired,
};

export default AppLayout;
