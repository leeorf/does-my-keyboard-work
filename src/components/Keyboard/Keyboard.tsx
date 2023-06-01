import { useEffect, useState } from "react";
import { KEYBOARD_LAYOUT } from "../../constants";
import { KeyboardRow } from "./KeyboardRow";

export function Keyboard() {
  return (
    <div>
      {KEYBOARD_LAYOUT.map((keyboardRow) => (
        <KeyboardRow key={keyboardRow} rows={keyboardRow.split(" ")} />
      ))}
    </div>
  );
}
