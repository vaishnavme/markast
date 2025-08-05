import type { TreeType } from "./global.types";
import JSONTOMarkdown from "./json-to-md";
import MarkdownToJSON from "./md-to-json";

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

export default Markast;
