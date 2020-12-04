import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import FallowList from '../components/FallowList';
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
        <FallowList header="Follower List" data={me.Followers} />
        <FallowList header="Following List" data={me.Followings} />
      </AppLayout>
    </>
  );
}

export default Profile;
