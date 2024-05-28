export const getTooltipPositin = (direction: string, bounds: DOMRect, tooltipBounds: DOMRect | undefined, parent: { width: number, height: number }) => {
  let x = 0;
  let y = 0;

  if (!tooltipBounds) {
    return { x, y };
  }

  switch (direction) {
    case 'top':
      x = bounds.x + ((parent.width - tooltipBounds.width) / 2);
      y = bounds.y - tooltipBounds.height - 12;
      break;
    case 'tl':
      x = bounds.x;
      y = bounds.y - tooltipBounds.height - 12;
      break;
    case 'tr':
      x = bounds.x + parent.width - tooltipBounds.width;
      y = bounds.y - tooltipBounds.height - 12;
      break;
    case 'bottom':
      x = bounds.x + ((parent.width - tooltipBounds.width) / 2);
      y = bounds.y + parent.height + 12;
      break;
    case 'bl':
      x = bounds.x;
      y = bounds.y + parent.height + 12;
      break;
    case 'br':
      x = bounds.x + parent.width - tooltipBounds.width;
      y = bounds.y + parent.height + 12;
      break;
    case 'left':
      x = bounds.x - tooltipBounds.width - 12;
      y = bounds.y + ((parent.height - tooltipBounds.height) / 2);
      break;
    case 'lt':
      x = bounds.x - tooltipBounds.width - 12;
      y = bounds.y;
      break;
    case 'lb':
      x = bounds.x - tooltipBounds.width - 12;
      y = bounds.y + parent.height - tooltipBounds.height;
      break;
    case 'right':
      x = bounds.x + parent.width + 12;
      y = bounds.y + ((parent.height - tooltipBounds.height) / 2);
      break;
    case 'rt':
      x = bounds.x + parent.width + 12;
      y = bounds.y;
      break;
    case 'rb':
      x = bounds.x + parent.width + 12;
      y = bounds.y + parent.height - tooltipBounds.height;
      break;
    default:
      x = bounds.x + ((parent.width - tooltipBounds.width) / 2);
      y = bounds.y - tooltipBounds.height - 12;
  }

  return { x, y };
};
