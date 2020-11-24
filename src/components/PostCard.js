import { Avatar, Button, Card, Popover } from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PostImages from './PostImages';
import { useState } from 'react';

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpend] = useState(false);

  const me = useSelector(({ user }) => user.me);
  const id = me?.id; // me && me.id

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          <MessageOutlined key="message" />,
          liked ? (
            <HeartTwoTone twoToneColor="red" key="heart" />
          ) : (
            <HeartOutlined key="heart" />
          ),
          <Popover
            key="popover"
            content={
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
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
      </Card>
      {/*<CommentForm />*/}
      {/*<Comments />*/}
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
