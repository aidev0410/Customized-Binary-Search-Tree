import { useCallback, useState } from "react";

import { TreeNode } from "./lib/types";
import TreeNodeComponent from "./components/TreeNodeComponent";
import { containsRedNodes } from "./lib/utilss";

const App = () => {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addNode = useCallback(
    (value: number, isLeft: boolean) => {
      if (!selectedNode) {
        alert("Please select a node");
        return;
      }

      const newNode: TreeNode = { value };

      if (isLeft) {
        selectedNode.left = newNode;
      } else {
        selectedNode.right = newNode;
      }

      setSelectedNode(null);
      setRoot({ ...(root as TreeNode) });
    },
    [root, selectedNode]
  );

  const updateNodeValue = useCallback(
    (value: number) => {
      if (!selectedNode) {
        alert("Please select a node");
        return;
      }

      selectedNode.value = value;
      setSelectedNode(null);
      setRoot({ ...(root as TreeNode) });
    },
    [root, selectedNode]
  );

  const searchValueDFS = useCallback(
    (
      value: number,
      node: TreeNode | null,
      logs: string[],
      visitedCount: { count: number }
    ): boolean => {
      if (!node) return false;

      logs.push(`Visited node with value: ${node.value}`);
      visitedCount.count++;

      if (node.value === value) {
        logs.push(`Found value: ${value}`);
        return true;
      }

      if (searchValueDFS(value, node.left!, logs, visitedCount)) {
        return true;
      }

      return searchValueDFS(value, node.right!, logs, visitedCount);
    },
    []
  );

  const searchValue = useCallback(
    (value: number) => {
      if (!root) {
        alert("Tree is empty");
        return;
      }

      const logs: string[] = [];
      const visitedCount = { count: 0 };

      if (searchValueDFS(value, root, logs, visitedCount)) {
        logs.push(`Search completed with ${visitedCount.count} nodes visited.`);
      } else {
        logs.push(`Value ${value} not found.`);
        logs.push(`Search completed with ${visitedCount.count} nodes visited.`);
      }

      setLogs(logs);
    },
    [root, searchValueDFS]
  );

  const onCreateRoot = useCallback(() => {
    const value = parseInt(prompt("Enter root node value:") || "0", 10);
    if (!root) {
      setRoot({ value });
    } else {
      alert("Root already exists");
    }
  }, [root]);

  const onAddLeftChild = useCallback(() => {
    const value = parseInt(
      prompt("Enter value for left child node:") || "0",
      10
    );
    addNode(value, true);
  }, [addNode]);

  const onAddRightChild = useCallback(() => {
    const value = parseInt(
      prompt("Enter value for right child node:") || "0",
      10
    );
    addNode(value, false);
  }, [addNode]);

  const onUpdateNodeValue = useCallback(() => {
    const value = parseInt(
      prompt("Enter new value for selected node:") || "0",
      10
    );
    updateNodeValue(value);
  }, [updateNodeValue]);

  const onSearchValue = useCallback(() => {
    if (root && !containsRedNodes(root)) {
      const value = parseInt(prompt("Enter value to search:") || "0", 10);
      searchValue(value);
    } else {
      alert("Resolve red nodes first (children larger than parent)");
    }
  }, [searchValue, root]);

  return (
    <div className="App">
      <h1>Binary Search Tree Builder</h1>

      <div>
        <button onClick={onCreateRoot}>Create Root</button>
        <button onClick={onAddLeftChild}>Add Left Child</button>
        <button onClick={onAddRightChild}>Add Right Child</button>
        <button onClick={onUpdateNodeValue}>Update Node Value</button>
        <button onClick={onSearchValue}>Search Value</button>
      </div>

      <div className="treeflex tf-tree">
        {root && (
          <ul>
            <TreeNodeComponent
              node={root}
              onNodeSelect={setSelectedNode}
              isRed={false}
            />
          </ul>
        )}
      </div>

      <h2>Selected Node: {selectedNode?.value ?? "None"}</h2>

      <h3>Logs</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
