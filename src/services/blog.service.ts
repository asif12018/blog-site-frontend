import { env } from "@/env"

const API_URL = env.API_URL;

//todo No Dynamic and No cache no-store: SSG -> Static page
//? {cache: no-store} : SSR -> Dynamic page
//- next: { revalidate: 10}: ISR -> mix between static and dynamic

interface GetBlogsParams {
    isFeatured?: boolean;
    search?: string;

}

interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}
export const blogService = {
    getBlogPost : async function (params?:GetBlogsParams, options?:ServiceOptions){
        try{
          const url = new URL(`${API_URL}/posts`);
          if(params){
            Object.entries(params).forEach(([key, value])=>{
                 if(value !== undefined && value !== null && value !== ""){
                    url.searchParams.append(key,value);
                 }
            });
          }
          
          //function to dynamically tell the server or  next js is it will cached or not for ssr or issr
          const config: RequestInit = {};
          if(options?.cache){
            config.cache = options.cache;
          }

          if(options?.revalidate){
            config.next ={revalidate: options.revalidate}
          }

          const res = await fetch(url.toString(), config);
          const data = await res.json();
          return {data: data, error: null}
        }catch(err){
           return {data:null, error: {message: "Something went wrong"}}
        }
    },
}