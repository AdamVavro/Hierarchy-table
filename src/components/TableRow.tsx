import React, { useState } from "react";
import { RowProps } from "../types"; // Importujeme interface

const Row: React.FC<RowProps> = ({ item, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr className="parent-row">
        <td onClick={() => setExpanded(!expanded)}>{expanded ? "▼" : "▶"}</td>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.gender}</td>
        <td>{item.ability}</td>
        <td>{item.minimalDistance}</td>
        <td>{item.weight}</td>
        <td>{item.born}</td>
        <td>{item.inSpaceSince}</td>
        <td>{item.beerConsumption}</td>
        <td>{item.knowsTheAnswer ? "✔" : "✖"}</td>
        <td className="delete-btn" onClick={() => onDelete(item.id)}>✖</td>
      </tr>
      {expanded && item.children.length > 0 && (
        <tr className="child-row">
          <td colSpan={11}>
            <table>
              <tbody>
                {item.children.map((child: any) => (
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
