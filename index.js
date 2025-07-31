const input = `# Welcome
## heading 2
This is *italic*, **bold**, and [a link](https://example.com).
This is second paragraph with **bold content**

- Bullet First bullet **item is bold**
- Bullet Second bullet **item is italice**

1. Numbered First item **item is bold**
2. Numbered Second item **item is italice**

![Alt text](https://example.com/image.png)
`;

/** sample output structure
 * [
  {
    "type": "heading",
    "depth": 1,
    "content": "Welcome"
  },
  {
    "type": "paragraph",
    "children": [
      { "type": "text", "value": "This is " },
      { "type": "emphasis", "value": "italic" },
      { "type": "text", "value": ", " },
      { "type": "strong", "value": "bold" },
      { "type": "text", "value": ", and " },
      {
        "type": "link",
        "url": "https://example.com",
        "children": [
          { "type": "text", "value": "a link" }
        ]
      },
      { "type": "text", "value": "." }
    ]
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "type": "listItem",
        "children": [{ "type": "text", "value": "First bullet" }]
      },
      {
        "type": "listItem",
        "children": [{ "type": "text", "value": "Second bullet" }]
      }
    ]
  },
  {
    "type": "list",
    "ordered": true,
    "items": [
      {
        "type": "listItem",
        "children": [{ "type": "text", "value": "First item" }]
      },
      {
        "type": "listItem",
        "children": [{ "type": "text", "value": "Second item" }]
      }
    ]
  },
  {
    "type": "image",
    "alt": "Alt text",
    "url": "https://example.com/image.png"
  }
]
 * 
 */

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

class Markast {
  constructor() {
    this.tree = [];

    this.orderedContent = {};
    this.unorderedContent = {};
  }

  insertListNodes({ orderedInsert, unorderedInsert }) {
    if (this.orderedContent?.type && orderedInsert) {
      this.tree.push(this.orderedContent);
      this.orderedContent = {};
    }

    if (this.unorderedContent?.type && unorderedInsert) {
      this.tree.push(this.unorderedContent);
      this.unorderedContent = {};
    }
  }

  parseLine(line) {
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

  markdownToJSON(string) {
    if (!string) {
      throw new Error("no input string provided");
    }
    const lines = string.split("\n");

    lines.forEach((line) => {
      switch (true) {
        case regex.heading.test(line): {
          this.insertListNodes({ orderedInsert: true, unorderedInsert: true });
          const result = regex.heading.exec(line);

          this.tree.push({
            type: heading,
            content: result[2],
            attr: {
              level: result[1].length,
            },
          });
          break;
        }

        case regex.image.test(line): {
          const imageMatch = regex.image.exec(line);
          this.tree.push({
            type: image,
            alt: imageMatch[1],
            src: imageMatch[2],
          });
          break;
        }

        case regex.ordered.test(line): {
          this.insertListNodes({ orderedInsert: false, unorderedInsert: true });

          const orderedMatch = regex.ordered.exec(line);
          const listItemNodes = this.parseLine(orderedMatch[3]);

          this.orderedContent = {
            type: listItem,
            ordered: true,
            children: [...(this.orderedContent?.children || []), listItemNodes],
          };
          break;
        }

        case regex.unordered.test(line): {
          this.insertListNodes({ orderedInsert: true, unorderedInsert: false });

          const unorderedMatch = regex.unordered.exec(line);
          const listItemNodes = this.parseLine(unorderedMatch[2]);

          this.unorderedContent = {
            type: list,
            ordered: false,
            children: [
              ...(this.unorderedContent?.children || []),
              listItemNodes,
            ],
          };
          break;
        }

        default:
          this.insertListNodes({ orderedInsert: true, unorderedInsert: true });
          const childNodes = this.parseLine(line);
          this.tree.push({ type: paragraph, children: childNodes });
          break;
      }
    });
  }
}

const markast = new Markast();
markast.markdownToJSON(input);
