import {QueryFunction} from "@tanstack/query-core";
import {User} from "@/model/User";

export const getUser : QueryFunction<User, [_1 :string ,_2:string ]> =async ({ queryKey})=>{
    const [_1, username] = queryKey
    const res = await fetch(`http://localhost:9090/api/users/${username}/`,{
        next: {
            tags : ['posts', 'users',username],
        },
        cache: 'no-store',
    })
    if(!res.ok){
        throw new Error('Failed to fetch data')
    }
    return res.json()
}