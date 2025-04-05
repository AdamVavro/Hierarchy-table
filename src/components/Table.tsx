import React, { useState } from "react";
import "./../styles/table.css";
import Row from "./TableRow";
import exampleData from "../data/exampleData.json";
import { GenericDataItem } from "../types";

const transformData = (data: any[]): GenericDataItem[] => {
  const parseItem = (item: any): GenericDataItem => ({
    id: Number(item.data.ID),
    data: item.data,
    children: extractChildren(item.children),
  });

  const extractChildren = (childrenObj: any): GenericDataItem[] => {
    if (!childrenObj) return [];
    return Object.values(childrenObj).flatMap((rel: any) =>
      rel.records.map(parseItem)
    );
  };

  const uniqueDataById = (items: any[]) => {
    const seen = new Set();
    return items.filter((item) => {
      const id = item.data.ID;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  };

  return uniqueDataById(data).map(parseItem);
};

const Table: React.FC = () => {
  const [data, setData] = useState<GenericDataItem[]>(transformData(exampleData));
  const [expandAll, setExpandAll] = useState(false);

  const handleDelete = (id: number) => {
    const deleteRecursive = (items: GenericDataItem[]): GenericDataItem[] => {
      return items
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          children: deleteRecursive(item.children),
        }));
    };

    setData((prevData) => deleteRecursive(prevData));
  };

  const toggleExpandAll = () => {
    setExpandAll((prev) => !prev);
  };

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>
            <button
              className="expand-collapse-btn"
              onClick={toggleExpandAll}
              title={expandAll ? "Collapse All" : "Expand All"}
            >
              {expandAll ? "▲" : "▼"}
            </button>
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Ability</th>
          <th>Minimal Distance</th>
          <th>Weight</th>
          <th>Born</th>
          <th>In space since</th>
          <th>Beer consumption (l/y)</th>
          <th>Knows the answer?</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <Row
            key={`${item.id}-0`}
            item={item}
            onDelete={handleDelete}
            depth={0}
            rowIndex={index}
            expandAll={expandAll}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
