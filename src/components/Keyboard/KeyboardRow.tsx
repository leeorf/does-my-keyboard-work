import { Key } from "./Key";

type KeyboardRowProps = {
  rows: string[];
};

export function KeyboardRow({ rows = [] }: KeyboardRowProps) {
  return (
    <div>
      {rows.map((cell) => (
        <Key key={cell}>{cell}</Key>
      ))}
    </div>
  );
}
