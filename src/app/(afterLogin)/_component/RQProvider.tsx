"use client"
import React, {useState } from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {inspect} from "util";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
// import defaultOptions = module

type Props = {
    children : React.ReactNode
}

export default function RQProvider({children} : Props) {
    const  [client] = useState(
        new QueryClient({
            defaultOptions : { //react- query 전역 상태 설정
                queries : {
                    refetchOnWindowFocus : false,
                    retryOnMount : true,
                    refetchOnMount : false ,
                    retry : false,
                }
            }
    },
        )
    )
    return(
        <QueryClientProvider client={client} >
            {children}
            <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'} />
        </QueryClientProvider>
    )
}