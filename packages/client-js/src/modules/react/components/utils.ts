import { ITourStep } from "../../vanilla/tours";

export const popoverWrapperId = "__trilly__popover-wrapper";

export const nodeBorderClipPath = ({ top, bottom, right, left }: DOMRect) => {
  return `polygon(
    /* points of the outer triangle going counterclockwise */
    0 0, 100% 0, 100% 100%, 0 100%, 0 0,

    /* return to the first point of the outer triangle */
    ${left}px ${top}px, ${left}px ${bottom}px, ${right}px ${bottom}px, ${right}px ${top}px, ${left}px ${top}px
  )`;
};

export function getVerticalOffset(
  node?: Element | null,
  variant: ITourStep["alignVertical"] = "top"
) {
  if (!node) return undefined;

  const rect = node.getBoundingClientRect();
  const baseTop = rect.top;

  const offset =
    variant === "top"
      ? 0
      : variant === "bottom"
      ? rect.height
      : variant === "center"
      ? rect.height / 2 - 10
      : null;

  if (offset === null) throw new Error("Unknown vertical alignment variant!");

  return baseTop + offset;
}

export function getHorizontalOffset(
  node?: Element | null,
  variant: ITourStep["alignHorizontal"] = "right"
) {
  if (!node) return undefined;

  const rect = node.getBoundingClientRect();
  const baseLeft = rect.left;

  const offset =
    variant === "left" ? 0 : variant === "right" ? rect.width : null;

  if (offset === null) throw new Error("Unknown horizontal alignment variant!");

  return baseLeft + offset;
}

export function getMaxWidth(
  node: Element | null,
  variant: ITourStep["alignHorizontal"] = "right"
) {
  if (!node) return undefined;

  const offset = getHorizontalOffset(node, variant)!;
  const maxWidth = 384;
  const windowWidth = window.outerWidth;

  if (variant === "left" && offset - maxWidth - 10 < 0)
    return maxWidth - (maxWidth - offset) - 10;

  if (variant === "right" && windowWidth < offset + maxWidth + 10)
    return maxWidth - (windowWidth - (maxWidth + offset)) - 10;

  return maxWidth;
}
