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
 */
