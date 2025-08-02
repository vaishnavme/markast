export const testMarkdownString = `# Welcome
## *heading 2*
This is *italic*, **bold**, and [a link](https://example.com) and inline \`code-node\`.
This is second paragraph with **bold content**

- Bullet First bullet **item is bold**
- Bullet Second bullet *item is italice*

1. Numbered First item **item is bold**
2. Numbered Second item *item is italice*.

![Alt text](https://example.com/image.png)

\`\`\`
const hello = () => {
  console.log("hello world") // comment
}
\`\`\`

this should be new line

this can be another inline code example like \`const hello = () => console.log('hello world')\`

> This is blockquote with **bold** and *italic* text, along with [a sample link](https://sample.com) and line code
`;

// [
//   {
//     "type": "heading",
//     "level": 1,
//     "children": [
//       {
//         "type": "text",
//         "value": "Welcome"
//       }
//     ]
//   },
//   {
//     "type": "heading",
//     "level": 2,
//     "children": [
//       {
//         "type": "italic",
//         "value": "heading 2"
//       }
//     ]
//   },
//   {
//     "type": "paragraph",
//     "children": [
//       {
//         "type": "text",
//         "value": "This is "
//       },
//       {
//         "type": "italic",
//         "value": "italic"
//       },
//       {
//         "type": "text",
//         "value": ", "
//       },
//       {
//         "type": "bold",
//         "value": "bold"
//       },
//       {
//         "type": "text",
//         "value": ", and "
//       },
//       {
//         "type": "link",
//         "value": "a link",
//         "href": "https://example.com"
//       },
//       {
//         "type": "text",
//         "value": " and inline "
//       },
//       {
//         "type": "code",
//         "value": "code-node"
//       },
//       {
//         "type": "text",
//         "value": "."
//       }
//     ]
//   },
//   {
//     "type": "paragraph",
//     "children": [
//       {
//         "type": "text",
//         "value": "This is second paragraph with "
//       },
//       {
//         "type": "bold",
//         "value": "bold content"
//       }
//     ]
//   },
//   {
//     "type": "emptyLine"
//   },
//   {
//     "type": "list",
//     "ordered": false,
//     "children": [
//       {
//         "type": "listItem",
//         "children": [
//           {
//             "type": "text",
//             "value": "Bullet First bullet "
//           },
//           {
//             "type": "bold",
//             "value": "item is bold"
//           }
//         ]
//       },
//       {
//         "type": "listItem",
//         "children": [
//           {
//             "type": "text",
//             "value": "Bullet Second bullet "
//           },
//           {
//             "type": "italic",
//             "value": "item is italice"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "type": "emptyLine"
//   },
//   {
//     "type": "list",
//     "ordered": true,
//     "children": [
//       {
//         "type": "listItem",
//         "children": [
//           {
//             "type": "text",
//             "value": "Numbered First item "
//           },
//           {
//             "type": "bold",
//             "value": "item is bold"
//           }
//         ]
//       },
//       {
//         "type": "listItem",
//         "children": [
//           {
//             "type": "text",
//             "value": "Numbered Second item "
//           },
//           {
//             "type": "italic",
//             "value": "item is italice"
//           },
//           {
//             "type": "text",
//             "value": "."
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "type": "emptyLine"
//   },
//   {
//     "type": "image",
//     "alt": "Alt text",
//     "src": "https://example.com/image.png"
//   },
//   {
//     "type": "emptyLine"
//   },
//   {
//     "type": "codeblock",
//     "children": [
//       {
//         "type": "text",
//         "value": "const hello = () => {"
//       },
//       {
//         "type": "text",
//         "value": "  console.log(\"hello world\") // comment"
//       },
//       {
//         "type": "text",
//         "value": "}"
//       }
//     ]
//   },
//   {
//     "type": "emptyLine"
//   },
//   {
//     "type": "paragraph",
//     "children": [
//       {
//         "type": "text",
//         "value": "this should be new line"
//       }
//     ]
//   },
//   {
//     "type": "emptyLine"
//   },
//   {
//     "type": "paragraph",
//     "children": [
//       {
//         "type": "text",
//         "value": "this can be another inline code example like "
//       },
//       {
//         "type": "code",
//         "value": "const hello = () => console.log('hello world')"
//       }
//     ]
//   },
//   {
//     "type": "emptyLine"
//   },
//   {
//     "type": "blockquote",
//     "children": [
//       {
//         "type": "text",
//         "value": "This is blockquote with "
//       },
//       {
//         "type": "bold",
//         "value": "bold"
//       },
//       {
//         "type": "text",
//         "value": " and "
//       },
//       {
//         "type": "italic",
//         "value": "italic"
//       },
//       {
//         "type": "text",
//         "value": " text, along with "
//       },
//       {
//         "type": "link",
//         "value": "a sample link",
//         "href": "https://sample.com"
//       },
//       {
//         "type": "text",
//         "value": " and line code"
//       }
//     ]
//   },
//   {
//     "type": "emptyLine"
//   }
// ]
