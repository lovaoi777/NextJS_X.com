"use client"

import {InfiniteData, useInfiniteQuery, useQuery} from "@tanstack/react-query";
import getPostRecommends from "@/app/(afterLogin)/home/_lib/GetPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import {Post as IPost } from "@/model/Post"
import {Fragment, useEffect, useRef} from "react";
import {useInView} from "react-intersection-observer"
export default function  PostRecommends () {
    const {data,fetchNextPage,hasNextPage,isFetching} = useInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>({
        queryKey: ['posts', 'recommends'],
        queryFn: getPostRecommends,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    })
    const {ref,inView} = useInView({
        threshold:0, //문턱
        delay : 0,
    });
    useEffect(ㄹㄹ()=> {
        if(inView){
            !isFetching&&hasNextPage && fetchNextPage()
        }
    },[inView,fetchNextPage])



    return (
        <>
            {data?.pages.map((page,i   ) => (
        <Fragment key={i}>
            {page.map((post)=><Post key={post.postId} post = {post} />)}
        </Fragment>
    ))}
            <div ref={ref} style={{height : 50 }} /></>
    )
}