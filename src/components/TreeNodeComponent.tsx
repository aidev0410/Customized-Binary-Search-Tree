import { useCallback, MouseEvent, memo } from "react";
import { TreeNode } from "../lib/types";

interface TreeNodeComponentProps {
  node: TreeNode;
  onNodeSelect: (node: TreeNode) => void;
  isRed: boolean;
}

const TreeNodeComponent = ({
  node,
  onNodeSelect,
  isRed,
}: TreeNodeComponentProps) => {
  const onClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onNodeSelect(node);
    },
    [onNodeSelect, node]
  );

  return (
    <li
      onClick={onClick}
      style={{
        color: isRed ? "red" : "black",
        cursor: "pointer",
      }}
    >
      <span className="tf-nc">{node.value}</span>
      {(node.left || node.right) && (
        <ul>
          {node.left && (
            <TreeNodeComponent
              node={node.left}
              onNodeSelect={onNodeSelect}
              isRed={node.left.value > node.value}
            />
          )}
          {node.right && (
            <TreeNodeComponent
              node={node.right}
              onNodeSelect={onNodeSelect}
              isRed={node.right.value > node.value}
            />
          )}
        </ul>
      )}
    </li>
  );
};

export default memo(TreeNodeComponent);
