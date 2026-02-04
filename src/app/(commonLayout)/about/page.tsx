"use client";
import { getBlogs } from "@/app/actions/blog.action";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      const { data } = await getBlogs();
      setData(data);
    })();
  }, []);





  return (
    <div>
      <h1>This is about page</h1>
    </div>
  );
}
