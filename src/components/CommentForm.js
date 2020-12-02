import { useCallback } from 'react';
import { Button, Input, Form } from '../../node_modules/antd/lib/index';
import useInput from '../lib/hooks/useInput';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function CommentForm({ post }) {
  const id = useSelector(({ user }) => user.me?.id);
  const [commentText, , onChangeCommentText] = useInput('');

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
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
  post: PropTypes.object.isRequired,
};

export default CommentForm;
