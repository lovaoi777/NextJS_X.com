"use client"
import {useQuery} from "@tanstack/react-query";
import {HashTag} from "@/model/HashTag";
import {getTrends} from "@/app/(afterLogin)/_lib/getTrends";
import {useSession} from "next-auth/react";
import Trend from "@/app/(afterLogin)/_component/Trend";

export default  function TrendSection(){
    const {data : session} = useSession()
    const { data } = useQuery<HashTag[]>({
        queryKey: ['trends'],
        queryFn: getTrends,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
        enabled: !!session?.user
    })
    return data?.map((trend) => <Trend trend={trend} key ={trend.tagId}/>)
}