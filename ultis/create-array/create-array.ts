export interface IArrayItem {
  label: string;
  value: number;
}
export const createArray = (length: number, add = 0): IArrayItem[] =>
  Array.from({ length }, (_, i) => {
    const value = i + add;
    return {
      label: value.toString().padStart(2, '0'),
      value: value,
    };
  });
