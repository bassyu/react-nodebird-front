import Head from "next/head";
import AppLayout from "../components/AppLayout";
import FallowList from "../components/FallowList";
import NicknameEditForm from "../components/NicknameEditForm";

function Profile() {
  const fallowerList = [
    { nickname: "dsds" },
    { nickname: "where" },
    { nickname: "jensen" },
  ];
  const falloingList = [
    { nickname: "hello" },
    { nickname: "dudu" },
    { nickname: "mike" },
  ];

  return (
    <>
      <Head>
        <title>Profile - NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FallowList header="팔로워 목록" data={fallowerList} />
        <FallowList header="팔로잉 목록" data={falloingList} />
      </AppLayout>
    </>
  );
}

export default Profile;
