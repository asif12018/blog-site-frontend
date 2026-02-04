"use server"
import { blogService } from "@/services/blog.service"
import { BlogPost } from "@/types/blog.type";
import { updateTag } from "next/cache";

interface BlogData {
  title: string,
  content: string,
  tag?: string[]
}
export const getBlogs = async() =>{
  return await blogService.getBlogPost();
};

export const createBlogPost = async(data: BlogData)=>{
  
  const res = await blogService.createBlogPost(data);
  updateTag("blogPosts")
  return res

}