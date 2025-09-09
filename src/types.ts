export type PersonRow = {
  id: number;
  name: string;
  position: string;
  office: string;
  age: number;
  startDate: string;
};

export interface RawPersonData {
  id: number;
  Name: string;
  Position: string;
  Office: string;
  Age: number;
  "Start date": string;
}
