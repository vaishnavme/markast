## Markast

**markast** is javascript script that helps you convert between different markup formats — Markdown, JSON (AST), and HTML.

This project is built to understand how parsers and abstract syntax trees (ASTs) work

It’s not meant to be a production-ready tool — it’s a **learning experiment** to dig deeper into:

- Parsing line-based and inline text structures
- Creating and transforming ASTs
- Working with regex and tokenization
- Building modular parsing systems

### Features

**Markdown to JSON**

Supported syntax

- [x] heading
- [x] paragraph
- [x] link
- [x] image
- [x] list (ordered/un-ordered)
- [x] blockquote
- [x] code
- [x] codeblock

**Upcoming**

- JSON to Markdown
- HTML to Markdown

### API Docs

```js
const markast = new Markast();

markast.toJSON(inputString); // converts markdown to JSON (AST)
```
