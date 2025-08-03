import MarkdownToJSON from "./md-to-json";
import { testMarkdownString } from "./tests/test-inputs";

class Markast {
  #mdToJSONParser = new MarkdownToJSON();

  mdToJSON(string: string) {
    return this.#mdToJSONParser.parse(string);
  }
}

const markast = new Markast();
const tree = markast.mdToJSON(testMarkdownString);

console.log("tree: ", tree);

export default Markast;
