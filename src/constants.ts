export const nodes = {
  // nodes
  heading: "heading",
  paragraph: "paragraph",
  blockquote: "blockquote",
  list: "list",
  codeblock: "codeblock",
  image: "image",

  // child nodes
  text: "text",
  bold: "bold",
  italic: "italic",
  link: "link",
  code: "code",

  listItem: "listItem",
  ordered: "ordered",
  unordered: "unordered",

  emptyLine: "emptyLine",
} as const;

export const nodesRegex = {
  [nodes.heading]: /^(#{1,6})\s+(.*)/,
  [nodes.blockquote]: /^>\s?(.*)/,
  [nodes.image]: /^!\[([^\]]*)\]\(([^)]+)\)/,

  [nodes.bold]: /^\*\*(.+?)\*\*/,
  [nodes.italic]: /^\*(.+?)\*/,
  [nodes.text]: /^[^\*\[`]+/, // plain text until a special char
  [nodes.link]: /^\[([^\]]+)\]\(([^)]+)\)/,
  [nodes.code]: /^`([^`]+)`/,

  [nodes.ordered]: /^(\s*)(\d+)\.\s+(.*)/,
  [nodes.unordered]: /^(\s*)[-*+]\s+(.*)/,

  codeblockStart: /^```(\w+)?$/,
  codeblockEnd: /^```[\s]*$/,
};
