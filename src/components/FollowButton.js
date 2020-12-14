import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../node_modules/antd/lib/index';
import {
  FOLLOW, followAction, UNFOLLOW, unfollowAction,
} from '../modules/user';

function FollowButton({ post }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);
  const { me } = useSelector(({ user }) => ({
    me: user.me,
  }));
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onClickFollow = useCallback(() => {
    const action = isFollowing ? unfollowAction : followAction;
    dispatch(action(post.User.id));
  }, [isFollowing]);

  return (
    <Button
      loading={loading[FOLLOW] || loading[UNFOLLOW]}
      onClick={onClickFollow}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
