import Markast from ".";
import { testMarkdownString } from "./tests/test-inputs";

const markast = new Markast();
const tree = markast.mdToJSON(testMarkdownString);
const markdown = markast.JSONToMd(tree);

export default Markast;
