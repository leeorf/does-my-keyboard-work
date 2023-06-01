import { useEffect, useState } from "react";
import { keyboardLayoutToDisplayLabel } from "../../helpers/keyboard.helpers";
import { KEYBOARD_LAYOUT_TO_KEY_CODE } from "../../constants";

type KeyProps = {
  isPressed?: boolean;
  children: string;
};

export function Key({ children }: KeyProps) {
  const [isHealthy, setIsHealthy] = useState(false);
  const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    function trackKeyPressed(event: KeyboardEvent) {
      event.preventDefault();

      if (event.code === KEYBOARD_LAYOUT_TO_KEY_CODE[children]) {
        setIsHealthy(true);

        // For some reason still unknown, the F11 on macOS (Chrome) does not work
        // My guess is that this key press has some conflict with the OS funcionality
        // that shows desktop on macOS(Safari).
        setKeysPressed((previous) => {
          return {
            ...previous,
            [event.code]: event.type === "keydown",
          };
        });
      }
    }

    document.addEventListener("keydown", trackKeyPressed);
    document.addEventListener("keyup", trackKeyPressed);

    return () => {
      document.removeEventListener("keydown", trackKeyPressed);
      document.removeEventListener("keyup", trackKeyPressed);
    };
  }, []);

  function keyStyle() {
    const keyCode = KEYBOARD_LAYOUT_TO_KEY_CODE[children];

    if (keysPressed[keyCode]) {
      return "yellow";
    }

    if (isHealthy) {
      return "green";
    }

    return "transparent";
  }

  return (
    <div
      style={{
        border: "1px solid lightgray",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 12px",
        background: keyStyle(),
        width: children === "{space}" ? 296 : "fit-content",
        height: 41,
        verticalAlign: "bottom",
      }}
    >
      {keyboardLayoutToDisplayLabel(children)}
    </div>
  );
}
