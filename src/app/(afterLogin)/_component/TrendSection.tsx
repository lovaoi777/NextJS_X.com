"use client";
import style from "./TrendSection.module.css";
import Trend from "./Trend";
import { usePathname } from "../../../../node_modules/next/navigation";
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {getTrends} from "@/app/(afterLogin)/_lib/getTrends";
import {HashTag} from "@/model/HashTag";
export default function TrendSection() {
    const {data : session  }  = useSession()
    const { data } = useQuery<HashTag[]>({
        queryKey: ['trends'],
        queryFn: getTrends,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
        enabled: !!session?.user
    })
  const path = usePathname();

  if (path === "/explore") return null;
  if(session?.user ){
      return (
          <div className={style.tendBg}>
              <div className={style.trend}>
                  <h3>나를 위한 트렌드</h3>
                  {data?.map((trend : any) => <Trend trend={trend} key ={trend.tagId}/>)}

              </div>
          </div>
      );
  }
  return(
      <div className={style.trendBg}>
          <div className={style.notrend}>
              트랜드를 가져 올 수 없습니다.
          </div>
      </div>
  )
}
