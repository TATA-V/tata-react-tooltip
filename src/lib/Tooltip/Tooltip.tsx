'use client';

import { ReactNode, CSSProperties, useState, MouseEvent, useRef, useEffect } from 'react';
import TooltipDialog from 'src/lib/Tooltip/TooltipDialog';
import { createPortal } from 'react-dom';
import { getTooltipPositin } from 'src/utils/getTooltipPosition';
import 'src/lib/Tooltip/scss/tooltip.scss';

type Direction = 'tl' | 'top' | 'tr' | 'rt' | 'right' | 'rb' | 'bl' | 'bottom' | 'br' | 'lt' | 'left' | 'lb'

interface Props {
  children: ReactNode;
  parentWidth: number;
  parentHeight: number;
  message?: string;
  direction?: Direction;
  customStyle?: CSSProperties;
  leaveDelay?: number;
  enterDelay?: number;
  color?: string;
  bgColor?: string;
  tailColor?: string;
  tailBorderColor?: string;
  hideTail?: boolean;
  dialog?: boolean;
  dialogIcon?: ReactNode;
  dialogBtnText?: string;
  customTooltip?: ReactNode;
}

function Tooltip(props: Props) {
  const { children, parentWidth, parentHeight, message, direction = 'top', customStyle, leaveDelay, enterDelay, color, bgColor, tailColor, tailBorderColor, hideTail, dialog, dialogIcon, dialogBtnText, customTooltip } = props;
  const bgc = customStyle ? customStyle.backgroundColor : bgColor;
  const [isShow, setIsShow] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number; } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }

  const mouseLeave = () => {
    setIsShow(false);
    if (isHide) {
      setIsHide(false);
    }
    if (!leaveDelay) return;
    setIsShow(true);
    setTimeout(() => {
      setIsShow(false);
    }, leaveDelay);
  };

  const mouseOver = (e: MouseEvent<HTMLElement>) => {
    setIsShow(true);
    const bounds = e.currentTarget.getBoundingClientRect();
    const tooltipBounds = tooltipRef.current?.getBoundingClientRect();
    const parent = { width: parentWidth, height: parentHeight };
    const { x, y } = getTooltipPositin(direction, bounds, tooltipBounds, parent);
    setPosition({ x, y });

    setIsHide(true);
    setTimeout(() => {
      setIsHide(false);
    }, enterDelay);
  };

  const dialogOk = () => {
    setIsHide(true);
    setIsShow(false);
  };

  const tooltipMouseOver = () => {
    setIsShow(true);
  };
  const tooltipMouseLeave = () => {
    setIsShow(false);
  };

  return (
    <div className={`container ${direction} ${(dialog || customTooltip) && 'dialog'} ${hideTail && 'hide-tail'} ${isShow && 'show'} ${isHide && 'hide'}`}>
      <div onMouseOver={mouseOver} onMouseLeave={mouseLeave} className="child">
        {children}
      </div>
      {createPortal(
        <div
          style={{
            opacity: position ? '1' : '0',
            top: position ? position.y : undefined,
            left: position ? position.x : undefined,
            position: 'fixed',
            zIndex: 10,
          }}
        >
          <div
            className={`tooltip ${(!dialog && !customTooltip) && 'default'} ${isShow && 'show'} ${isHide && 'hide'}`}
            style={customStyle || undefined}
            ref={tooltipRef}
            onMouseOver={tooltipMouseOver}
            onMouseLeave={tooltipMouseLeave}
          >
            {!dialog && message}
            {dialog && <TooltipDialog message={message} icon={dialogIcon} btnText={dialogBtnText} dialogOk={dialogOk} />}
            {customTooltip && customTooltip}
            {!hideTail && <div className={`tooltip-arrow ${direction}`} />}
          </div>
        </div>,
        document.body,
      )}
      <style>{`
        :root {
          --bg-color: ${bgc || '#333'};
          --text-color: ${color || '#fff'};
          --tail-bg: ${tailColor || (dialog ? '#fff' : '#333')};
          --tail-border: ${tailBorderColor || (dialog ? '#E4E5EA' : '#333')};
        }
      `}
      </style>
    </div>
  );
}

export default Tooltip;
