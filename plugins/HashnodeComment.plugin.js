import { visit } from "unist-util-visit";
import { h } from "hastscript";

const hashnodeCommentPlugin = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === "textDirective" && node.name === "hn-comment-thread") {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes);

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  };
};

export default hashnodeCommentPlugin;
