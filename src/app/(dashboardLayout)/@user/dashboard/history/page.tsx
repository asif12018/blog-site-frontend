import { HistoryTable } from "@/components/ui/HistoryTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { blogService } from "@/services/blog.service"



export default async function HistoryPage({searchParams}:{searchParams: Promise<{page: string}>}) {
  const {page} = await searchParams;
  console.log('page number',page)
  const response = await blogService.getBlogPost({page});

  const post = response.data.data.data || [];
  const pagination = response.data.data.pagination || {
    limit:10,
    page:1,
    total:0,
    totalPages:1
  };


  return (
    <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Blog Post History</h1>
          <HistoryTable posts={post}></HistoryTable>
          <PaginationControls meta={pagination}></PaginationControls>
    </div>
  )
}
