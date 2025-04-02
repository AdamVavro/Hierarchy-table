import React, { useState, useEffect } from "react";
import "./../styles/table.css";
import Row from "./TableRow";
import exampleData from "../data/exampleData.json"; // Sem importujeme JSON
import { DataItem } from "../types"; // Importujeme interface

const transformData = (data: any) => {
  return data.map((item: any) => ({
    id: Number(item.data.ID), // Premenujeme ID
    name: item.data["Name"], // Oprava názvov s medzerami
    gender: item.data["Gender"],
    ability: item.data["Ability"],
    minimalDistance: item.data["Minimal distance"],
    weight: item.data["Weight"],
    born: item.data["Born"],
    inSpaceSince: item.data["In space since"],
    beerConsumption: item.data["Beer consumption (l/y)"],
    knowsTheAnswer: item.data["Knows the answer?"] === "true",
    children: extractChildren(item.children) // Správne extrahujeme deti
  }));
};

const extractChildren = (childrenObj: any) => {
  if (!childrenObj) return [];
  let childrenArray: any[] = [];
  Object.values(childrenObj).forEach((relation: any) => {
    if (relation.records) {
      childrenArray.push(...transformData(relation.records));
    }
  });
  return childrenArray;
};



const Table: React.FC = () => {
  const [data, setData] = useState<DataItem[]>(transformData(exampleData));

  const handleDelete = (id: number) => {
    const newData = data.filter((item: DataItem) => item.id !== id);
    setData(newData);
  };

  return (
    <table className="custom-table">
      <thead>
        <tr>
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
          {data.map((item: DataItem) => (
          <Row key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </tbody>
    </table>
  );
};


export default Table;
