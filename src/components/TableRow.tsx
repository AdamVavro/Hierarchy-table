import React, { useState, useEffect } from "react";
import { RowProps } from "../types";

const Row: React.FC<RowProps> = ({ item, onDelete, depth, rowIndex, expandAll }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(expandAll);
  }, [expandAll]);

  const dataEntries = Object.entries(item.data);
  const hasChildren = item.children.length > 0;
  const rowClass = rowIndex % 2 === 0 ? "even-row" : "odd-row";

  return (
    <>
      <tr className={`parent-row ${rowClass}`}>
        <td
          onClick={() => hasChildren && setExpanded(!expanded)}
          style={{ cursor: hasChildren ? "pointer" : "default" }}
        >
          {hasChildren ? (expanded ? "▼" : "▶") : ""}
        </td>
        {dataEntries.map(([key, value]) => (
          <td key={key}>{value}</td>
        ))}
        <td className="delete-btn" onClick={() => onDelete(item.id)}>✖</td>
      </tr>

      {expanded && hasChildren && (
        <tr className={`child-row ${rowClass}`}>
          <td colSpan={dataEntries.length + 2}>
            <table className={rowClass}>
              <thead>
                <tr>
                  <th></th>
                  {Object.keys(item.children[0].data).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {item.children.map((child, idx) => (
                  <Row
                    key={`${child.id}-${depth + 1}-${idx}`}
                    item={child}
                    onDelete={onDelete}
                    depth={depth + 1}
                    rowIndex={rowIndex}
                    expandAll={expandAll}
                  />
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

export default Row;
