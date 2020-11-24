import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

function Index() {
  const isLogin = useSelector(({ user }) => user.isLogin);
  const mainPosts = useSelector(({ post }) => post.mainPosts);
  return (
    <AppLayout>
      {isLogin && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}

export default Index;
