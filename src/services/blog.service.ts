import { env } from "@/env";
import { cookies } from "next/headers";


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

interface BlogData {
  title: string,
  content: string,
  tag?: string[]
}
export const blogService = {
  getBlogPost: async function (
    params?: GetBlogsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/posts`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      //function to dynamically tell the server or  next js is it will cached or not for ssr or issr
      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = {...config.next, tags: ["blogPosts"]}
      
      // const res = await fetch(url.toString(), {
      //   next: {
      //     tags: ["blogPosts"]
      //   }
      // });
      const res = await fetch(url.toString(), config);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getBlogById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
   createBlogPost: async (blogData: BlogData)=>{
     try{
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/posts`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData)
      });

      const data = await res.json();
      if(data.error){
        return {data:null, error:{message:data.error || "Error: Post not created"}}
      }

      return {data: data, error: null}

     }catch(err){
      return {data: null, error: {message: "internal server error"}}
     }
   }
    
};
