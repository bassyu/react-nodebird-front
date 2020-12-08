import React, { useCallback, useState } from 'react';
import {
  Avatar, Button, Card, Comment, List, Popover,
} from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';

const PostCardBlock = styled.div`
  margin: 1.5rem;

  .ant-card-cover {
    transform: none !important;
  }
`;

function PostCard({ post }) {
  const id = useSelector(({ user }) => user.me?.id); // me && me.id
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpend] = useState(false);

  const onClickLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);
  const onClickComment = useCallback(() => {
    setCommentFormOpend((prev) => !prev);
  }, []);
  const onRemovePost= useCallback(() => )

  return (
    <PostCardBlock>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          liked ? (
            <HeartTwoTone
              twoToneColor="red"
              key="like"
              onClick={onClickLike}
            />
          ) : (
            <HeartOutlined key="like" onClick={onClickLike} />
          ),
          <MessageOutlined key="message" onClick={onClickComment} />,
          <RetweetOutlined key="retweet" />,
          <Popover
            key="popover"
            content={(
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>edit</Button>
                    <Button type="denger">remove</Button>
                  </>
                ) : (
                  <Button>report</Button>
                )}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent content={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length} comments`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
      {/* <Comments /> */}
    </PostCardBlock>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.array,
  }).isRequired,
};

export default PostCard;
