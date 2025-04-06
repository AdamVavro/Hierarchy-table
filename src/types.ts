export interface GenericDataItem {
  id: number;
  data: Record<string, string>;
  children: GenericDataItem[];
  relationName?: string;
}

export interface RowProps {
  item: GenericDataItem;
  onDelete: (id: number) => void;
  depth: number;
  rowIndex: number;
  expandAll: boolean;
}
