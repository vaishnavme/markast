const input = `# Welcome
## heading 2
This is *italic*, **bold**, and [a link](https://example.com).

- First bullet **item is bold**
- Second bullet **item is italice**

1. First item **item is bold**
2. Second item **item is italice**

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

/**
 * tokens
 */
const heading = "heading";
const paragraph = "paragraph";

/**
 * regex
 */

const regex = {
  [heading]: /^(#{1,6})\s+(.*)/,
};

class Markast {
  constructor() {
    this.tree = [];
  }

  parseLine(line) {}

  markdownToJSON(string) {
    if (!string) {
      throw new Error("no input string provided");
    }
    const lines = string.split("\n");
    lines.forEach((line) => {
      if (regex.heading.test(line)) {
        const result = regex.heading.exec(line);

        this.tree.push({
          type: heading,
          content: result[2],
          attr: {
            level: result[1].length,
          },
        });
      } else if (line.trim()) {
        this.tree.push({
          type: paragraph,
          content: line,
        });
      }
    });
  }

  debug() {
    console.log("tree: ", this.tree);
  }
}

const markast = new Markast();
markast.markdownToJSON(input);
markast.debug();
