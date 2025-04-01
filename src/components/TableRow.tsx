import React, { useState } from "react";

interface TableRowProps {
  item: any;
  columns: string[];
  onDelete: (id: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({ item, columns, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr>
        {columns.map((col) => (
          <td key={col}>{item.data[col] || "-"}</td>
        ))}
        <td>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Hide" : "Show"}
          </button>
          <button onClick={() => onDelete(item.data.ID)}>Delete</button>
        </td>
      </tr>
      {isExpanded &&
        item.children &&
        Object.keys(item.children).map((key) =>
          item.children[key].records.map((child: any) => (
            <TableRow key={child.data.ID} item={child} columns={columns} onDelete={onDelete} />
          ))
        )}
    </>
  );
};

export default TableRow;
