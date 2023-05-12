import { Head } from "$fresh/runtime.ts";
import Input from "@/islands/Input.tsx";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { createItem, getAllItems, type Item } from "../utils/db.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const items = await getAllItems();
    return ctx.render({ items });
  },
  async POST(req, ctx) {
    const title = new URL(req.url).searchParams.get("title");
    if (!title) return new Response(null, { status: 400 });
    await createItem(title);
    return new Response(null, { status: 201 });
  },
};

export default function Home(props: PageProps) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        {/* <Input /> */}
        <h1>
          Deno KV Example
        </h1>
        <ul class="list-disc">
          {/* {props.data.items.map((item: { value: Item }) => {
            return <li>{item.value.title}</li>;
          })} */}
          <li><a href="/basics" class="hover:underline text-blue-600">Get & Set</a></li>
        </ul>
      </div>
    </>
  );
}
