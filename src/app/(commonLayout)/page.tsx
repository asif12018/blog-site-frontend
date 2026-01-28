
import { Button } from '@/components/ui/button';
import { blogService } from '@/services/blog.service';
import { userService } from '@/services/user.service';




export default async function Home() {
  // const {data, error} = await userService.getSession();
  // console.log("result:",data);
  const {data} = await blogService.getBlogPost({
    isFeatured: false,
  }, {
    cache:"no-store"
  });
  console.log('blog-data',data)
  return (
    <div>
      <Button variant="outline">Click here</Button>
    </div>
  );
}
