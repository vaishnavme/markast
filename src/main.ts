import type { TreeType } from "./global.types";
import JSONTOMarkdown from "./json-to-md";
import MarkdownToJSON from "./md-to-json";
import { testMarkdownString } from "./tests/test-inputs";

class Markast {
  #mdToJSONParser = new MarkdownToJSON();
  #JSONToMdParser = new JSONTOMarkdown();

  mdToJSON(string: string) {
    return this.#mdToJSONParser.parse(string);
  }

  JSONToMd(tree: TreeType[]) {
    return this.#JSONToMdParser.parse(tree);
  }
}

const markast = new Markast();
const tree = markast.mdToJSON(testMarkdownString);
const markdown = markast.JSONToMd(tree);

export default Markast;
