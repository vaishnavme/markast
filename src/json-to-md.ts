import { nodes } from "./constants";
import type { ChildNodeType, TreeType } from "./global.types";

class JSONTOMarkdown {
  #md = "";

  #parseChildrenBlocks(childrenBlocks: ChildNodeType[]) {
    let str = "";

    for (
      let childNodeIndex = 0;
      childNodeIndex < childrenBlocks.length;
      childNodeIndex += 1
    ) {
      const childBlock = childrenBlocks[childNodeIndex];
      switch (childBlock.type) {
        case nodes.bold:
          str += `**${childBlock.value}**`;
          continue;

        case nodes.italic:
          str += `*${childBlock.value}*`;
          continue;

        case nodes.code:
          str += `\`${childBlock.value}\``;
          continue;

        case nodes.link:
          str += `[${childBlock.value}](${childBlock.href})`;
          continue;

        case nodes.text:
        default:
          str += childBlock.value;
          continue;
      }
    }

    return str;
  }

  #appendNodeString(nodeString: string) {
    this.#md += nodeString;
  }

  #insertNewLink() {
    this.#md += `\n`;
  }

  parse(tree: TreeType[]) {
    for (let nodeIndex = 0; nodeIndex < tree.length; nodeIndex += 1) {
      const currentNode = tree[nodeIndex];

      switch (currentNode.type) {
        case nodes.heading: {
          if (currentNode.children) {
            const headingText = this.#parseChildrenBlocks(currentNode.children);
            const headingLevel = new Array(currentNode.level)
              .fill("#")
              .join("");

            this.#appendNodeString(`${headingLevel} ${headingText}`);
          }
          this.#insertNewLink();
          continue;
        }

        case nodes.paragraph:
          if (currentNode.children) {
            this.#appendNodeString(
              this.#parseChildrenBlocks(currentNode.children)
            );
          }
          this.#insertNewLink();
          continue;

        case nodes.image:
          const alt = currentNode?.alt || "image";
          this.#appendNodeString(`![${alt}](${currentNode.src})`);
          this.#insertNewLink();
          continue;

        case nodes.blockquote:
          if (currentNode.children) {
            const blockquoteString = this.#parseChildrenBlocks(
              currentNode.children
            );
            this.#appendNodeString(`> ${blockquoteString}`);
          }
          continue;

        case nodes.codeblock:
          if (currentNode.children) {
            let codeString = "";
            currentNode.children.forEach((child) => {
              codeString += `${child.value} \n`;
            });

            const codeblockString = `\`\`\`\n ${codeString}\`\`\``;
            this.#appendNodeString(codeblockString);
            this.#insertNewLink();
          }
          continue;

        case nodes.list:
          if (currentNode.children) {
            for (
              let itemIndex = 0;
              itemIndex < currentNode.children.length;
              itemIndex += 1
            ) {
              const listItem = currentNode.children[itemIndex];
              const listItemString = listItem.children
                ? this.#parseChildrenBlocks(listItem.children)
                : listItem.type;
              const prefix = currentNode.ordered ? `${itemIndex + 1}.` : "- ";
              this.#appendNodeString(`${prefix} ${listItemString}`);
              this.#insertNewLink();
            }
          }
          continue;

        case nodes.emptyLine:
          this.#insertNewLink();
          continue;

        default:
          break;
      }
    }

    return this.#md;
  }
}

export default JSONTOMarkdown;
