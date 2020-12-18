import client from './client';

export const addPost = ({ text }) => client.post(
  '/post', { text },
);

export const addComment = ({ postId, userId, content }) => client.post(
  `/post/${postId}/comment`, { postId, userId, content },
);
