import type { nodes } from "./constants.ts";

export type ChildNodeType = {
  value?: string;
  children?: ChildNodeType[];
  href?: string;
  type:
    | typeof nodes.bold
    | typeof nodes.italic
    | typeof nodes.text
    | typeof nodes.link
    | typeof nodes.code
    | typeof nodes.listItem;
};

export type TreeType = {
  type: (typeof nodes)[keyof typeof nodes];
  level?: number;
  ordered?: boolean;
  src?: string;
  alt?: string;
  children?: ChildNodeType[];
};
