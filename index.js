import MarkdownToJSON from "./markdown-to-json.js";
import { testMarkdownString } from "./tests/test-inputs.js";

class Markast {
  #markdownToJSONParser = new MarkdownToJSON();

  toJSON(string) {
    return this.#markdownToJSONParser.parse(string);
  }
}

export default Markast;
