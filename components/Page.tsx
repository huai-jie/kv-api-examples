import type { ComponentChildren } from "preact";
import { Head } from "$fresh/runtime.ts";
// import { Footer } from "@/componets/Footer.tsx";
// import { Header } from "./Header.tsx";

export default function Page(props: {
  title: string;
  noSubtitle?: boolean;
  children: ComponentChildren;
}) {
  return (
    <div
      class="min-h-screen grid grid-cols-1"
      style="grid-template-rows: auto 1fr auto;"
    >
      <Head>
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/vnd.microsoft.icon"
        />
        <title>{props.title}</title>
      </Head>
      <Header noSubtitle={props.noSubtitle} />
      <div>
        {props.children}
      </div>
      <Footer />
    </div>
  );
}

export function Header(props: { noSubtitle?: boolean }) {
  return (
    <header class="px(3 lg:14) h(12 lg:20) text-gray-500 flex justify-between items-center">
      <a class="flex items-center flex-shrink-0" href="/">
        <span class="ml-4 flex items-baseline gap-x-1 flex-col sm:flex-row tracking-tighter">
        <span class="font-medium italic text(sm sm:base gray-900) leading-none">
                Deno
              </span>
          <span class="text(2xl gray-900) font-bold leading-none">
            KV 
          </span>
            <span class="font-medium italic text(sm sm:base gray-900) leading-none">
                APIs
              </span>
          {!props.noSubtitle &&
            (
              <span class="font-medium italic text(sm sm:base gray-900) leading-none">
                Example
              </span>
            )}
        </span>
      </a>
      <div class="flex items-center gap-6">
        <a
          href="https://deno.com/kv"
          class="hover:underline focus:underline"
        >
          Page
        </a>
        <a
          href="https://deno.land/api@v1.33.3?s=Deno.AtomicOperation&unstable="
          class="hover:underline focus:underline"
        >
          API
        </a>
      </div>
    </header>
  );
}

export const FOOTER_LINKS = [
  { href: "https://github.com/huai-jie/kv-api-examples", internal: "Source" },
  {
    href: "https://fresh.deno.dev",
    internal: (
      <img
        width="197"
        height="37"
        src="https://fresh.deno.dev/fresh-badge.svg"
        alt="Made with Fresh"
      />
    ),
  },
];

export function Footer() {
  return (
    <footer class="px(8 lg:14) py-4">
      <div class="flex flex-column justify-between">
        {FOOTER_LINKS.map(({href, internal}) => (
          <a href={href} class="text-gray-900 font-medium hover:underline">{internal}</a>
        ))}
      </div>
    </footer>
  );
}
