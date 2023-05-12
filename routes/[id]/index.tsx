import { Handlers, PageProps } from "$fresh/server.ts";
import { Prism } from "@/utils/prism.ts";
import { type Example, ExampleSnippet, parseExample } from "@/utils/example.ts";

type Data = Example;

export const handler: Handlers = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    try {
      const data = await Deno.readTextFile(`./data/${id}.ts`);

      if (!data) return new Response("404 Example Not Found", { status: 404 });

      return ctx.render(parseExample(id, data));
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) return ctx.render!(null);

      throw err;
    }
  },
};

export default function examplePage(props: PageProps<Data>) {
  if (props.data === null) {
    return <div>404 Example Not Found</div>;
  }
  const { data: example } = props;
  return (
    <>
      <main class="max-w-screen-lg mx-auto p-4">
        <h1 class="mt-2 text-3xl font-bold">{example.title}</h1>
        {example.description && (
          <div class="mt-1">
            <p class="text-gray-500">
              {example.description}
            </p>
          </div>
        )}
        {example.files.map((file) => (
          <div class="mt-10">
            {file.snippets.map((snippet, i) => (
              <SnippetComponent
                key={i}
                filename={file.name}
                snippet={snippet}
              />
            ))}
          </div>
        ))}
      </main>
    </>
  );
}

function SnippetComponent(props: {
  filename: string;
  snippet: ExampleSnippet;
}) {
  const renderedSnippet = Prism.highlight(
    props.snippet.code,
    Prism.languages.ts,
    "ts",
  );

  return (
    <div class="grid grid-cols-1 sm:grid-cols-5 gap-x-6  transition duration-150 ease-in">
      <div class="py-4 text-gray-700 select-none col-span-2">
        {props.snippet.text}
      </div>
      <div
        class={`col-span-3 relative bg-gray-100 ${
          props.snippet.code.length === 0 ? "hidden sm:block" : ""
        }`}
      >
        <div class="px-4 py-4 text-sm overflow-scroll sm:overflow-hidden relative gfm-highlight">
          <pre dangerouslySetInnerHTML={{ __html: renderedSnippet }} />
        </div>
      </div>
    </div>
  );
}
