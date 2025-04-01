import React, { useState } from "react";
import TableRow from "./TableRow";
import data from "../data/exampleData.json";
import "../styles/table.css";

const Table: React.FC = () => {
  const [tableData, setTableData] = useState(data);

  // Získame všetky unikátne kľúče zo všetkých záznamov
  const extractKeys = (items: any[]): string[] => {
    const keys = new Set<string>();
    const findKeys = (obj: any) => {
      Object.keys(obj.data).forEach((key) => keys.add(key));
      if (obj.children) {
        Object.values(obj.children).forEach((childGroup: any) => {
          childGroup.records.forEach(findKeys);
        });
      }
    };
    items.forEach(findKeys);
    return Array.from(keys);
  };

  const columns = extractKeys(tableData);

  // Odstránenie riadka (rekurzívne)
  const handleDelete = (id: string) => {
    const deleteRecursively = (items: any[]) =>
      items.filter((item) => {
        if (item.data.ID === id) return false;
        if (item.children) {
          Object.keys(item.children).forEach((key) => {
            item.children[key].records = deleteRecursively(item.children[key].records);
          });
        }
        return true;
      });

    setTableData(deleteRecursively(tableData));
  };

  return (
    <table className="hierarchy-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item) => (
          <TableRow key={item.data.ID} item={item} columns={columns} onDelete={handleDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
