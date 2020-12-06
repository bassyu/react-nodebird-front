import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Link from 'next/link';

function PostCardContent({ content }) {
  return (
    <div>
      {content.split(/(#[^\s#]+)/g).map((string) => {
        if (string.match(/(#[^\s#]+)/g)) {
          return (
            <Link key={shortid.generate()} href={`/hashtag/${string.slice(1)}`}>
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
