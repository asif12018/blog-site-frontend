import { CreateBlogFormClient } from '@/components/modules/user/createBlog/CreateBlogFromClient';
import CreateBlogFromServer from '@/components/modules/user/createBlog/CreateBlogFromServer'
import { blogService } from '@/services/blog.service'
import React from 'react'

export default async function CreateBlogPage() {
  const blogPosts = await blogService.getBlogPost({}, {cache: "no-store"});
  return (
    <div>
       {/* <CreateBlogFromServer></CreateBlogFromServer> */}
       <CreateBlogFormClient></CreateBlogFormClient>
    </div>
  )
}
