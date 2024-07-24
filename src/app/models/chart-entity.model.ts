export interface ChartEntity {
  id?: number;
  name: string;
  type?: string;
  color?: string;
  data?: Axis[];
}
export interface Axis {
  date: Date;
  value: number;
}
