import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_API = env.AUTH_URL;

//business logic also know as service layer
export const userService = {
  getSession: async function () {
    try{
     const cookieStore = await cookies();
    // console.log(cookieStore.get("better-auth.session_token"));
    const res = await fetch(`${AUTH_API}/get-session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    const session = await res.json();
    if(session === null){
        return {data: null, error:{message:"Session is missing"}}
    }
    return {data:session, err: null};
    }catch(err){
       return {data:null, error: {message: "something Went Wrong"}}
    }
  },
};
