"use client";

import Main from "@/app/(beforeLogin)/_component/Main";
import {auth} from '@/auth'
import {redirect, useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
export default async function Login() {
  const router = useRouter();
  const {data : session} = useSession()
  if(session?.user){
    redirect('/home');
    return null;
  }
  router.replace('/i/flow/login');
  return <Main />;
}
