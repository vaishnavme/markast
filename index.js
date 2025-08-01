import MarkdownToJSON from "./markdown-to-json.js";
import { testMarkdownString } from "./tests/test-inputs.js";

class Markast {
  #markdownToJSONParser = new MarkdownToJSON();

  markdownToJSON(string) {
    return this.#markdownToJSONParser.parse(string);
  }
}

export default Markast;

const markast = new Markast();
const output = markast.markdownToJSON(testMarkdownString);

console.log(JSON.stringify(output, null, 2));
