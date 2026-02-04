
import BlogCard from '@/components/homepage/BlogCard';
import { blogService } from '@/services/blog.service';
import { BlogPost } from '@/types/blog.type';




export default async function Home() {
  // const {data, error} = await userService.getSession();
  // console.log("result:",data);
  const {data} = await blogService.getBlogPost({
    isFeatured: false,
  }, {
    cache:"no-store"
  });
  // console.log('blog-data',data.data.data)
  return (
    <div className='grid grid-cols-3 max-w-7xl mx-auto px-4 gap-6'>
      {data?.data?.data.map((post: BlogPost)=>{
        return <BlogCard key={post.id} post={post}></BlogCard>
      })}
    </div>
  );
}
