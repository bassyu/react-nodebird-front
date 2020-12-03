import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Form } from '../../node_modules/antd/lib/index';
import useInput from '../lib/hooks/useInput';
import { addCommentAction } from '../modules/post';

function CommentForm({ postData }) {
  const dispatch = useDispatch();
  const { id, postError } = useSelector(({ user, post }) => ({
    id: user.me?.id,
    postError: post.postError,
  }));
  const [commentText, setCommentText, handleCommentText] = useInput('');

  const onSubmitComment = useCallback(() => {
    dispatch(
      addCommentAction({ content: commentText, postId: postData.id, userId: id }),
    );
  }, [commentText]);

  useEffect(() => {
    if (!postError) {
      setCommentText('');
    }
  }, [postError]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          onChange={handleCommentText}
          rows={4}
        />
        <Button style={{ float: 'right' }} type="primary" htmlType="submit">
          submit
        </Button>
      </Form.Item>
    </Form>
  );
}

CommentForm.propTypes = {
  postData: PropTypes.object.isRequired,
};

export default CommentForm;
