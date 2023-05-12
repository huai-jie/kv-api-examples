export const kv = await Deno.openKv();

export interface Item {
  title: string;
  id: string;
}

export async function createItem(title: string) {
  let res = { ok: false };
  while (!res.ok) {
    const id = crypto.randomUUID();
    const itemKey = ["items", id];
    const item = { id, title };
    res = await kv.atomic() // kv atomic action
      .check({ key: itemKey, versionstamp: null }) // to check the itemkey is already used or not
      .set(itemKey, item) // set the value to that key
      .commit(); //atomic must end with commit

    return item;
  }
}

export async function getAllItems(option?: Deno.KvListOptions) {
  const iter = await kv.list({ prefix: ["items"] }, option);
  const items = [];
  for await (const res of iter) items.push(res);
  return items;
}
