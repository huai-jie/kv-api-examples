export interface Example {
  id: string;
  title: string;
  description: string;
  files: ExampleFile[];
}

export interface ExampleFile {
  name: string;
  snippets: ExampleSnippet[];
}

export interface ExampleSnippet {
  text: string;
  code: string;
}

export function parseExample(id: string, file: string): Example {
  const [_init, jsdoc, rest] = file.match(/^\s*\/\*\*(.*?)\*\/\s*(.*)/s) || [];

  // Extract the @key value pairs from the JS doc comment
  let description = "";
  const kvs: Record<string, string> = {};
  for (let line of jsdoc.split("\n")) {
    line = line.trim().replace(/^\*/, "").trim();
    const [, key, value] = line.match(/^\s*@(\w+)\s+(.*)/) || [];
    if (key) kvs[key] = value.trim();
    else description += " " + line;
  }
  description = description.trim();

  // Seperate the code into snippets.
  const files: ExampleFile[] = [{
    name: "",
    snippets: [],
  }];
  let parseMode = "code";
  const currentFile = files[0];
  let text = "";
  let code = "";

  for (const line of rest.split("\n")) {
    const trimmedLine = line.trim();
    if (parseMode == "code") {
      if (trimmedLine.startsWith("//-")) {
        code += line.replace("//-", "//") + "\n";
      } else if (trimmedLine.startsWith("//")) {
        if (text || code.trimEnd()) {
          code = code.trimEnd();
          currentFile.snippets.push({ text, code });
        }
        text = trimmedLine.slice(2).trim();
        code = "";
        parseMode = "comment";
      } else {
        code += line + "\n";
      }
    } else if (parseMode == "comment") {
      if (trimmedLine.startsWith("//")) {
        text += " " + trimmedLine.slice(2).trim();
      } else {
        code += line + "\n";
        parseMode = "code";
      }
    }
  }
  if (text || code.trimEnd()) {
    code = code.trimEnd();
    currentFile.snippets.push({ text, code });
  }

  if (!kvs.title) {
    throw new Error("Missing title in JS doc comment.");
  }
  return {
    id,
    title: kvs.title,
    description,
    files,
  };
}
