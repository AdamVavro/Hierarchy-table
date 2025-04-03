export interface GenericDataItem {
  id: number;
  data: Record<string, string>;
  children: GenericDataItem[];
}

export interface RowProps {
  item: GenericDataItem;
  onDelete: (id: number) => void;
}