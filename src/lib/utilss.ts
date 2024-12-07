import { TreeNode } from "./types";

export const containsRedNodes = (node: TreeNode | null): boolean => {
  if (!node) return false;
  if (
    (node.left && node.left.value > node.value) ||
    (node.right && node.right.value > node.value)
  ) {
    return true;
  }
  return containsRedNodes(node.left!) || containsRedNodes(node.right!);
};
