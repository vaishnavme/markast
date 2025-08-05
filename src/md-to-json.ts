import { nodes, nodesRegex } from "./constants";
import type { ChildNodeType, TreeType } from "./global.types";

const childNodeRules = [
  { type: nodes.bold, regex: nodesRegex.bold },
  { type: nodes.italic, regex: nodesRegex.italic },
  { type: nodes.link, regex: nodesRegex.link },
  { type: nodes.code, regex: nodesRegex.code },
  { type: nodes.text, regex: nodesRegex.text },
];

class MarkdownToJSON {
  #tree: TreeType[] = [];

  #parseLine(line: string) {
    let remainingLine = line;
    const childNodes: ChildNodeType[] = [];

    while (remainingLine.length > 0) {
      let matched = false;
      for (const rule of childNodeRules) {
        const result = rule.regex.exec(remainingLine);

        if (result) {
          matched = true;

          if (rule.type === nodes.bold) {
            childNodes.push({ type: nodes.bold, value: result[1] });
          } else if (rule.type === nodes.italic) {
            childNodes.push({ type: nodes.italic, value: result[1] });
          } else if (rule.type === nodes.link) {
            childNodes.push({
              type: nodes.link,
              value: result[1],
              href: result[2],
            });
          } else if (rule.type === nodes.code) {
            childNodes.push({ type: nodes.code, value: result[1] });
          } else if (rule.type === nodes.text) {
            childNodes.push({ type: nodes.text, value: result[0] });
          }
          remainingLine = remainingLine.slice(result[0].length);
          break;
        }
      }

      if (!matched) {
        childNodes.push({ type: nodes.text, value: remainingLine[0] });
        remainingLine = remainingLine.slice(1);
      }
    }

    return childNodes;
  }

  #heading(result: RegExpExecArray) {
    this.#tree.push({
      type: nodes.heading,
      level: result[1].length,
      children: this.#parseLine(result[2]),
    });
  }

  #blockquote(result: RegExpExecArray) {
    this.#tree.push({
      type: nodes.blockquote,
      children: this.#parseLine(result[1]),
    });
  }

  #image(result: RegExpExecArray) {
    this.#tree.push({
      type: nodes.image,
      alt: result[1],
      src: result[2],
    });
  }

  #list({
    currentIndex,
    lines,
    ordered,
    rule,
  }: {
    currentIndex: number;
    lines: string[];
    ordered: boolean;
    rule: { regex: RegExp };
  }) {
    const listItems = [];
    let listIndex = currentIndex;
    while (listIndex < lines.length && rule.regex.test(lines[listIndex])) {
      const result = rule.regex.exec(lines[listIndex]);
      if (result) {
        const plainText = ordered ? result[3] : result[2];

        listItems.push({
          type: nodes.listItem,
          children: this.#parseLine(plainText),
        });
        listIndex += 1;
      }
    }
    this.#tree.push({ type: nodes.list, ordered, children: listItems });
    return listIndex;
  }

  #codeblock({
    currentIndex,
    lines,
  }: {
    currentIndex: number;
    lines: string[];
  }) {
    const children = [];
    let codeLine = currentIndex + 1;
    while (
      codeLine < lines.length &&
      !nodesRegex.codeblockEnd.test(lines[codeLine])
    ) {
      children.push({ type: nodes.text, value: lines[codeLine] });
      codeLine += 1;
    }
    this.#tree.push({
      type: nodes.codeblock,
      children,
    });

    return codeLine;
  }

  parse(markdown: string) {
    if (!markdown) {
      throw new Error("no input provided!");
    }

    const lines = markdown.split("\n");

    for (let currentIndex = 0; currentIndex < lines.length; currentIndex++) {
      const currentLine = lines[currentIndex];

      if (currentLine.trim() === "") {
        this.#tree.push({ type: nodes.emptyLine });
        continue;
      }

      if (nodesRegex.heading.test(currentLine)) {
        const headingMatch = nodesRegex.heading.exec(currentLine);
        if (headingMatch) this.#heading(headingMatch);
        continue;
      }

      if (nodesRegex.blockquote.test(currentLine)) {
        const blockquoteMatch = nodesRegex.blockquote.exec(currentLine);
        if (blockquoteMatch) this.#blockquote(blockquoteMatch);
        continue;
      }

      if (nodesRegex.image.test(currentLine)) {
        const imageMatch = nodesRegex.image.exec(currentLine);
        if (imageMatch) this.#image(imageMatch);
        continue;
      }

      if (nodesRegex.codeblockStart.test(currentLine)) {
        const processedLines = this.#codeblock({ currentIndex, lines });
        currentIndex = processedLines;
        continue;
      }

      if (
        nodesRegex.ordered.test(currentLine) ||
        nodesRegex.unordered.test(currentLine)
      ) {
        const isOrdered = nodesRegex.ordered.test(currentLine);
        const processedLines = this.#list({
          currentIndex,
          lines,
          ordered: isOrdered,
          rule: {
            regex: isOrdered ? nodesRegex.ordered : nodesRegex.unordered,
          },
        });
        currentIndex = processedLines - 1;
        continue;
      }

      this.#tree.push({
        type: nodes.paragraph,
        children: this.#parseLine(currentLine),
      });
    }

    return this.#tree;
  }
}

export default MarkdownToJSON;
