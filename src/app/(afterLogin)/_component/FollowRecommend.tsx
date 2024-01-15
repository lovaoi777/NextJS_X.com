"use client";

import style from "./followRecommend.module.css";
import {useSession} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";
import {User} from "@/model/User";
import {useQuery} from "@tanstack/react-query";
import {getFollowRecommends} from "@/app/(afterLogin)/_lib/getFollowRecommends";

type Props = {
    user : User
}
export default function FollowRecommend({user}) {
    const {data :session} = useSession()
    const router = useRouter()

  const onFollow = () => {
    if(session?.user === undefined) {
        router.replace("/");
    }
    console.log('팔로우')
  };



  return (
    <div className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div className={style.followButtonSection}>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </div>
  );
}
