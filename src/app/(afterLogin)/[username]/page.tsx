 import style from "./Profile.module.css";
import Post from "@/app/(afterLogin)/_component/Post";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
 import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
 import {getUser} from "@/app/(afterLogin)/[username]/_lib/getUser";
 import {getUserPosts} from "@/app/(afterLogin)/[username]/_lib/getUserPosts";
 import UserPosts from "@/app/(afterLogin)/[username]/_conponent/UserPost";
 import UserInfo from "@/app/(afterLogin)/[username]/_conponent/UserInfo";

  type Props = {
      params : {username : string}
  }
export default async function Profile({params} : Props) {
    const {username } = params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey : ['users',username],queryFn : getUser})
    await queryClient.prefetchQuery({queryKey : ['posts','users',username],queryFn : getUserPosts})
    const dehydrateState = dehydrate(queryClient)


  return (
    <main className={style.main}>
        <HydrationBoundary  state={dehydrateState}>
        <UserInfo username={username} />
      <div>
        <UserPosts username = {username} />
      </div>
        </HydrationBoundary>
    </main>
  );
}
