import React, { useState, useEffect } from "react";
import "./../styles/table.css";
import Row from "./TableRow";
import exampleData from "../data/exampleData.json"; // Sem importujeme JSON
import { GenericDataItem } from "../types"; // Importujeme interface

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

  return data.map(parseItem);
};



const Table: React.FC = () => {
  const [data, setData] = useState<GenericDataItem[]>(transformData(exampleData));

  const handleDelete = (id: number) => {
    const newData = data.filter((item: GenericDataItem) => item.id !== id);
    setData(newData);
  };

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th></th>
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
          {data.map((item: GenericDataItem) => (
          <Row key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </tbody>
    </table>
  );
};


export default Table;
