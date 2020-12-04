import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

function Index() {
  const { me, mainPosts } = useSelector(({ user, post }) => ({
    me: user.me,
    mainPosts: post.mainPosts,
  }));
  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}

export default Index;
