export const testMarkdownString = `# Welcome
## heading 2
This is *italic*, **bold**, and [a link](https://example.com).
This is second paragraph with **bold content**

- Bullet First bullet **item is bold**
- Bullet Second bullet **item is italice**

1. Numbered First item **item is bold**
2. Numbered Second item **item is italice**

![Alt text](https://example.com/image.png)

this can be another inline code example like \`const hello = () => console.log('hello world')\`

> This is blockquote with **bold** and *italic* text, along with [a sample link](https://sample.com) and line code
`;

// [
//   {
//     "type": "heading",
//     "content": "Welcome",
//     "attr": {
//       "level": 1
//     }
//   },
//   {
//     "type": "heading",
//     "content": "heading 2",
//     "attr": {
//       "level": 2
//     }
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
//     "type": "paragraph",
//     "children": []
//   },
//   {
//     "type": "list",
//     "ordered": false,
//     "children": [
//       [
//         {
//           "type": "text",
//           "value": "Bullet First bullet "
//         },
//         {
//           "type": "bold",
//           "value": "item is bold"
//         }
//       ],
//       [
//         {
//           "type": "text",
//           "value": "Bullet Second bullet "
//         },
//         {
//           "type": "bold",
//           "value": "item is italice"
//         }
//       ]
//     ]
//   },
//   {
//     "type": "paragraph",
//     "children": []
//   },
//   {
//     "type": "listItem",
//     "ordered": true,
//     "children": [
//       [
//         {
//           "type": "text",
//           "value": "Numbered First item "
//         },
//         {
//           "type": "bold",
//           "value": "item is bold"
//         }
//       ],
//       [
//         {
//           "type": "text",
//           "value": "Numbered Second item "
//         },
//         {
//           "type": "bold",
//           "value": "item is italice"
//         }
//       ]
//     ]
//   },
//   {
//     "type": "paragraph",
//     "children": []
//   },
//   {
//     "type": "image",
//     "alt": "Alt text",
//     "src": "https://example.com/image.png"
//   },
//   {
//     "type": "paragraph",
//     "children": []
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
//         "value": " "
//       }
//     ]
//   },
//   {
//     "type": "paragraph",
//     "children": []
//   }
// ]
