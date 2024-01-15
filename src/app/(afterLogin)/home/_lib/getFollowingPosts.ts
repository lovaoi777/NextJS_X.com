export default async function getFollowingPosts() {
    const res = await fetch('http://localhost:9090/api/followingPosts',{
        next : {
            tags : ['posts','followings'],
        },
    });
    if(!res.ok){
        throw new Error('Failed to fatch data')
    }
    return res.json();
}