import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

function Profile() {
  const { me } = useSelector(({ user }) => ({ me: user.me }));

  return (
    <>
      <Head>
        <title>Profile - NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="Follower List" data={me.Followers} />
        <FollowList header="Following List" data={me.Followings} />
      </AppLayout>
    </>
  );
}

export default Profile;
