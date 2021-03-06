import React, {
  useCallback, useEffect, useRef,
} from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import useInput from '../lib/hooks/useInput';
import { addPostAction, ADD_POST } from '../modules/post';

function PostForm() {
  const dispatch = useDispatch();
  const refUpload = useRef();
  const { loading } = useSelector((state) => state);
  const { imagePaths, postError } = useSelector(({ post }) => ({
    imagePaths: post.imagePaths,
    postError: post.postError,
  }));
  const [text, setText, handleText] = useInput('');

  const onClickUpload = useCallback(() => {
    refUpload.current.click();
  }, [refUpload.current]);
  const onSubmit = useCallback(() => {
    const id = shortid.generate();
    dispatch(addPostAction({
      id,
      content: text,
    }));
  }, [text]);

  useEffect(() => {
    if (!postError) {
      setText('');
    }
  }, [postError]);

  return (
    <Form
      style={{ marign: '1rem 0 1.5rem' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={handleText}
        maxLength={9 * 16}
        placeholder="How are you?"
      />
      <div>
        <input type="file" multiple hidden ref={refUpload} />
        <Button onClick={onClickUpload}>Upload</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={loading[ADD_POST]}>
          Submit
        </Button>
      </div>
      <div>
        {imagePaths.map((imagePath) => (
          <div key={imagePath} style={{ display: 'inline-block' }}>
            <img src={imagePath} style={{ width: '13rem' }} alt={imagePath} />
            <div>
              <Button>remove</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
}

export default PostForm;
