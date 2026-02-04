import { IRoute } from "@/types";

export const userRoutes: IRoute[] = [
    {
      title: "Blog Management",
      items: [
        {
          title: "Create Blog",
          url: "/dashboard/create-blog",
        },
        {
          title: "History",
          url:"/dashboard/history"
        }
      ],
    },
  ];