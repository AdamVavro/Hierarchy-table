export interface DataItem {
    id: number;
    name: string;
    gender: string;
    ability: string;
    minimalDistance: string;
    weight: string;
    born: string;
    inSpaceSince: string;
    beerConsumption: string;
    knowsTheAnswer: boolean;
    children: DataItem[];
  }
  
  export interface RowProps {
    item: DataItem;
    onDelete: (id: number) => void;
  }