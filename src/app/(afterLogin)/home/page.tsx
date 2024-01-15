import style from "./home.module.css";
import Tap from "./_component/Tap";
import PostForm from "./_component/PostForm";
import TabProvider from "./_component/TabProvider";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import PostRecommends from "@/app/(afterLogin)/home/_component/PostRecommends";
import getPostRecommends from "@/app/(afterLogin)/home/_lib/GetPostRecommends";
import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";



export default async function Home() {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({queryKey:['posts','recommends'],queryFn:getPostRecommends, initialPageParam:0,}) //커서 값
    const dehydratedState =  dehydrate(queryClient);

    queryClient.getQueryData(['posts',"recommends"])

  return (
    <main className={style.main}>
        <HydrationBoundary state = {dehydratedState}>
      <TabProvider>
        <Tap />
        <PostForm />
          <TabDecider />
      </TabProvider>
        </HydrationBoundary>
    </main>
  );
}
