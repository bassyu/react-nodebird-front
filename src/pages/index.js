import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { loadPostsActoin, LOAD_POSTS } from '../modules/post';

function Index() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);
  const { me, mainPosts, hasMorePosts } = useSelector(({ user, post }) => ({
    me: user.me,
    mainPosts: post.mainPosts,
    hasMorePosts: post.hasMorePosts,
  }));

  useEffect(() => {
    dispatch(loadPostsActoin());
  }, []);
  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY + document.documentElement.clientHeight;
      const bottomY = document.documentElement.scrollHeight - 600;
      if (!loading[LOAD_POSTS] && hasMorePosts && (currentY > bottomY)) {
        dispatch(loadPostsActoin());
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loading[LOAD_POSTS]]);

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
