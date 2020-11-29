import PropTypes from 'prop-types';
import Link from 'next/link';

function PostCardContent({ content }) {
  return (
    <div>
      {content.split(/(#[^\s#]+)/g).map((string, index) => {
        if (string.match(/(#[^\s#]+)/g)) {
          return (
            <Link key={index} href={`/hashtag/${string.slice(1)}`}>
              <a>{string}</a>
            </Link>
          );
        }
        return string;
      })}
    </div>
  );
}

PostCardContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostCardContent;
