import { useCallback, useRef } from "preact/hooks";

export default function Input() {
  const input = useRef<HTMLInputElement>(null);
  const add = useCallback(() => {
    if (!input.current) return;
    fetch(`/?title=${input.current.value}`, {
      method: "POST",
      credentials: "same-origin",
    });
  }, []);
  return (
    <div class="flex">
      <input
        type="text"
        ref={input}
        class="border rounded w-full py-2 px-3 mr-4"
      />
      <button
        class="p-2 bg-blue-600 text-white rounded disabled:opacity-50"
        onClick={add}
      >
        Add
      </button>
    </div>
  );
}
