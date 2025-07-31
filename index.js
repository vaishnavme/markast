import MarkdownToJSON from "./markdown-to-json.js";

class Markast {
  #markdownToJSONParser = new MarkdownToJSON();

  markdownToJSON(string) {
    return this.#markdownToJSONParser.parse(string);
  }
}

export default Markast;
