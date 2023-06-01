import { KEYBOARD_DISPLAY_LABELS } from "../constants";

export function keyboardLayoutToDisplayLabel(layoutKey: string): string {
  if (layoutKey === "{space}") {
    return "";
  }

  return KEYBOARD_DISPLAY_LABELS[layoutKey] || layoutKey.toUpperCase() || "";
}
