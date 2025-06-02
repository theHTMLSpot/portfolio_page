export type Input = {
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  value: string;
};
