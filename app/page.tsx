import { Inter } from "@next/font/google";
import Link from "next/link";
import FormPost from "./Form";
async function getPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/getPosts`);
  if (!res.ok) {
    // throw new Error(res.statusText);
    console.log(res);
  }
  // const posts = res.json();
  return res.json();
}
export default async function Home() {
  const data: { id: number; title: string }[] = await getPosts();
  return (
    <main className="py-8 px-48  flex flex-col gap-[40px]">
      <FormPost />

      <Link
        href={"/dashboard"}
        className="bg-teal-500  text-black font-medium py-2 px-4 rounded-md "
      >
        go to the dashboard
      </Link>
      {data.map((post) => (
        <div key={post.id}>
          <h1 className=" my-4 text-white">{post.title}</h1>
        </div>
      ))}
    </main>
  );
}
