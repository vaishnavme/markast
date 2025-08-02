// nodes
const heading = "heading";
const paragraph = "paragraph";
const blockquote = "blockquote";
const list = "list";
const codeblock = "codeblock";
const image = "image";

// child nodes
const text = "text";
const bold = "bold";
const italic = "italic";
const link = "link";
const code = "code";

const listItem = "listItem";
const ordered = "ordered";
const unordered = "unordered";

const emptyLine = "emptyLine";

const regex = {
  [heading]: /^(#{1,6})\s+(.*)/,
  [blockquote]: /^>\s?(.*)/,
  [image]: /^!\[([^\]]*)\]\(([^)]+)\)/,

  [bold]: /^\*\*(.+?)\*\*/,
  [italic]: /^\*(.+?)\*/,
  [text]: /^[^\*\[`]+/, // plain text until a special char
  [link]: /^\[([^\]]+)\]\(([^)]+)\)/,
  [code]: /^`([^`]+)`/,

  [ordered]: /^(\s*)(\d+)\.\s+(.*)/,
  [unordered]: /^(\s*)[-*+]\s+(.*)/,

  codeblockStart: /^```(\w+)?$/,
  codeblockEnd: /^```[\s]*$/,
};

const childNodeRules = [
  { type: bold, regex: regex.bold },
  { type: italic, regex: regex.italic },
  { type: link, regex: regex.link },
  { type: code, regex: regex.code },
  { type: text, regex: regex.text },
];

class MarkdownToJSON {
  #tree = [];

  #parseLine(line) {
    let remainingLine = line;
    const childNodes = [];

    while (remainingLine.length > 0) {
      let matched = false;
      for (const rule of childNodeRules) {
        const result = rule.regex.exec(remainingLine);

        if (result) {
          matched = true;

          if (rule.type === bold) {
            childNodes.push({ type: bold, value: result[1] });
          } else if (rule.type === italic) {
            childNodes.push({ type: italic, value: result[1] });
          } else if (rule.type === link) {
            childNodes.push({ type: link, value: result[1], href: result[2] });
          } else if (rule.type === code) {
            childNodes.push({ type: code, value: result[1] });
          } else if (rule.type === text) {
            childNodes.push({ type: text, value: result[0] });
          }
          remainingLine = remainingLine.slice(result[0].length);
          break;
        }
      }

      if (!matched) {
        childNodes.push({ type: text, value: remainingLine[0] });
        remainingLine = remainingLine.slice(1);
      }
    }

    return childNodes;
  }

  #heading(result) {
    this.#tree.push({
      type: heading,
      level: result[1].length,
      children: this.#parseLine(result[2]),
    });
  }

  #blockquote(result) {
    this.#tree.push({
      type: blockquote,
      children: this.#parseLine(result[1]),
    });
  }

  #image(result) {
    this.#tree.push({
      type: image,
      alt: result[1],
      src: result[2],
    });
  }

  #list({ currentIndex, lines, ordered, rule }) {
    const listItems = [];
    let listIndex = currentIndex;
    while (listIndex < lines.length && rule.regex.test(lines[listIndex])) {
      const result = rule.regex.exec(lines[listIndex]);
      const plainText = ordered ? result[3] : result[2];

      listItems.push({
        type: listItem,
        children: this.#parseLine(plainText),
      });
      listIndex += 1;
    }
    this.#tree.push({ type: list, ordered, children: listItems });
    return listIndex;
  }

  #codeblock({ currentIndex, lines }) {
    const children = [];
    let codeLine = currentIndex + 1;
    while (
      codeLine < lines.length &&
      !regex.codeblockEnd.test(lines[codeLine])
    ) {
      children.push({ type: text, value: lines[codeLine] });
      codeLine += 1;
    }
    this.#tree.push({
      type: codeblock,
      children,
    });

    return codeLine;
  }

  parse(markdown) {
    if (!markdown) {
      throw new Error("no input provided!");
    }

    const lines = markdown.split("\n");

    for (let currentIndex = 0; currentIndex < lines.length; currentIndex++) {
      const currentLine = lines[currentIndex];

      if (currentLine.trim() === "") {
        this.#tree.push({ type: emptyLine });
        continue;
      }

      if (regex.heading.test(currentLine)) {
        this.#heading(regex.heading.exec(currentLine));
        continue;
      }

      if (regex.blockquote.test(currentLine)) {
        this.#blockquote(regex.blockquote.exec(currentLine));
        continue;
      }

      if (regex.image.test(currentLine)) {
        this.#image(regex.image.exec(currentLine));
        continue;
      }

      if (regex.codeblockStart.test(currentLine)) {
        const processedLines = this.#codeblock({ currentIndex, lines });
        currentIndex = processedLines;
        continue;
      }

      if (
        regex.ordered.test(currentLine) ||
        regex.unordered.test(currentLine)
      ) {
        const isOrdered = regex.ordered.test(currentLine);
        const processedLines = this.#list({
          currentIndex,
          lines,
          ordered: isOrdered,
          rule: { regex: isOrdered ? regex.ordered : regex.unordered },
        });
        currentIndex = processedLines - 1;
        continue;
      }

      this.#tree.push({
        type: paragraph,
        children: this.#parseLine(currentLine),
      });
    }

    return this.#tree;
  }
}

export default MarkdownToJSON;
