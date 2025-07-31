const heading = "heading";
const paragraph = "paragraph";
const bold = "bold";
const italic = "italic";
const text = "text";
const link = "link";
const image = "image";

const list = "list";
const ordered = "ordered";
const unordered = "unordered";
const listItem = "listItem";

const regex = {
  [heading]: /^(#{1,6})\s+(.*)/,
  [bold]: /^\*\*(.+?)\*\*/,
  [italic]: /^\*(.+?)\*/,
  [text]: /^[^\*\[]+/, // plain text until a special char
  [link]: /^\[([^\]]+)\]\(([^)]+)\)/,
  [ordered]: /^(\s*)(\d+)\.\s+(.*)/,
  [unordered]: /^(\s*)[-*+]\s+(.*)/,
  [image]: /^!\[([^\]]*)\]\(([^)]+)\)/,
};

const subNodesRules = [
  { type: bold, regex: regex.bold },
  { type: italic, regex: regex.italic },
  { type: text, regex: regex.text },
  { type: link, regex: regex.link },
];

class MarkdownToJSON {
  #tree = [];

  #orderedContent = {};
  #unorderedContent = {};

  #insertListNodes({ orderedInsert, unorderedInsert }) {
    if (this.#orderedContent?.type && orderedInsert) {
      this.#tree.push(this.#orderedContent);
      this.#orderedContent = {};
    }

    if (this.#unorderedContent?.type && unorderedInsert) {
      this.#tree.push(this.#unorderedContent);
      this.#unorderedContent = {};
    }
  }

  #parseLine(line) {
    let remainingText = line;
    const nodes = [];
    while (remainingText?.length > 0) {
      let matched = false;
      for (const rule of subNodesRules) {
        const result = rule.regex.exec(remainingText);
        if (result) {
          matched = true;
          if (rule.type === text) {
            nodes.push({ type: text, value: result[0] });
          } else if (rule.type === bold || rule.type === italic) {
            nodes.push({ type: rule.type, value: result[1] });
          } else if (rule.type === link) {
            nodes.push({
              type: link,
              value: result[1],
              href: result[2],
            });
          }
          remainingText = remainingText.slice(result[0].length);
          break;
        }
      }
      if (!matched) {
        nodes.push({ type: text, value: remainingText[0] });
        remainingText = remainingText.slice(1);
      }
    }
    return nodes;
  }

  parse(string) {
    if (!string) {
      throw new Error("no input string provided");
    }
    const lines = string.split("\n");

    lines.forEach((line) => {
      switch (true) {
        case regex.heading.test(line): {
          this.#insertListNodes({ orderedInsert: true, unorderedInsert: true });
          const result = regex.heading.exec(line);

          this.#tree.push({
            type: heading,
            content: result[2],
            attr: {
              level: result[1].length,
            },
          });
          break;
        }

        case regex.image.test(line): {
          this.#insertListNodes({ orderedInsert: true, unorderedInsert: true });

          const imageMatch = regex.image.exec(line);
          this.#tree.push({
            type: image,
            alt: imageMatch[1],
            src: imageMatch[2],
          });
          break;
        }

        case regex.ordered.test(line): {
          this.#insertListNodes({
            orderedInsert: false,
            unorderedInsert: true,
          });

          const orderedMatch = regex.ordered.exec(line);
          const listItemNodes = this.#parseLine(orderedMatch[3]);

          this.#orderedContent = {
            type: listItem,
            ordered: true,
            children: [
              ...(this.#orderedContent?.children || []),
              listItemNodes,
            ],
          };
          break;
        }

        case regex.unordered.test(line): {
          this.#insertListNodes({
            orderedInsert: true,
            unorderedInsert: false,
          });

          const unorderedMatch = regex.unordered.exec(line);
          const listItemNodes = this.#parseLine(unorderedMatch[2]);

          this.#unorderedContent = {
            type: list,
            ordered: false,
            children: [
              ...(this.#unorderedContent?.children || []),
              listItemNodes,
            ],
          };
          break;
        }

        default:
          this.#insertListNodes({ orderedInsert: true, unorderedInsert: true });
          const childNodes = this.#parseLine(line);
          this.#tree.push({ type: paragraph, children: childNodes });
          break;
      }
    });

    return this.#tree;
  }
}

export default MarkdownToJSON;
