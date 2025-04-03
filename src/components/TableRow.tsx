import React, { useState } from "react";
import { RowProps } from "../types"; // Importujeme interface

const Row: React.FC<RowProps> = ({ item, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const dataEntries = Object.entries(item.data);

  return (
    <>
      <tr className="parent-row">
        <td onClick={() => setExpanded(!expanded)}>{expanded ? "▼" : "▶"}</td>
        {dataEntries.map(([key, value]) => (
          <td key={key}>{value}</td>
        ))}
        <td className="delete-btn" onClick={() => onDelete(item.id)}>✖</td>
      </tr>

      {expanded && item.children.length > 0 && (
        <tr className="child-row">
          <td colSpan={dataEntries.length + 2}>
            <table>
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
                {item.children.map((child) => (
                  <Row key={child.id} item={child} onDelete={onDelete} />
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
