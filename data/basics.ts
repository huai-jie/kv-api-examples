/**
 * @title Get and Set
 *
 * Here is the description of Get and Set
 */
import { serve } from "$std/http/server.ts";
// Open the Deno KV database
const kv = await Deno.openKv();

serve(async (_req: Request) => {
  const id = 1;

  const item = {
    title: `example-${id}`,
    id,
  };

  const itemKey = ["items", id];
  // Save the value with the key
  const _set = await kv.set(itemKey, item);

  console.log(_set); //- { ok: true, versionstamp: "000xxx..." }
  // Get the value by the key
  const _get = await kv.get(itemKey);

  console.log(_get);
  //- {
  //-   key: [ "items", 1 ],
  //-   value: { title: "example-1", id: 1 },
  //-   versionstamp: "000xxx..."
  //- }

  return new Response(`${JSON.stringify(_get.value)}`);
});
