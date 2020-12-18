import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Form } from '../../node_modules/antd/lib/index';
import useInput from '../lib/hooks/useInput';
import { addCommentAction, ADD_COMMENT } from '../modules/post';

function CommentForm({ post }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);
  const { me, postError } = useSelector(({ user, post }) => ({
    me: user.me,
    postError: post.postError,
  }));
  const [commentText, setCommentText, handleCommentText] = useInput('');

  const onSubmitComment = useCallback(() => {
    dispatch(
      addCommentAction({
        postId: post.id,
        userId: me.id,
        content: commentText,
      }),
    );
  }, [post, me, commentText]);

  useEffect(() => {
    if (!postError) {
      setCommentText('');
    }
  }, [postError]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          style={{ height: '1rem' }}
          value={commentText}
          onChange={handleCommentText}
          rows={4}
          placeholder="commnet"
        />
        <Button
          loading={loading[ADD_COMMENT]}
          style={{ float: 'right' }}
          type="primary"
          htmlType="submit"
        >
          submit
        </Button>
      </Form.Item>
    </Form>
  );
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
