import { ReactNode, CSSProperties, useState, useRef, useEffect, useLayoutEffect, RefObject } from 'react';
import TooltipDialog from 'src/lib/Tooltip/TooltipDialog';
import { createPortal } from 'react-dom';
import { getTooltipPositin } from 'src/utils/getTooltipPosition';
import 'src/lib/Tooltip/scss/tooltip.scss';

export type Direction = 'tl' | 'top' | 'tr' | 'rt' | 'right' | 'rb' | 'bl' | 'bottom' | 'br' | 'lt' | 'left' | 'lb'

interface Props {
  children: ReactNode;
  parentRef: RefObject<any>;
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
  const { children, parentRef, message, direction = 'top', customStyle, leaveDelay, enterDelay, color, bgColor, tailColor, tailBorderColor, hideTail, dialog = false, dialogIcon, dialogBtnText, customTooltip } = props;
  const [isShow, setIsShow] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number; } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const isScrolling = useRef(false);
  let scrollTimeout: ReturnType<typeof setTimeout>;

  const updatePosition = () => {
    if (!parentRef.current || !tooltipRef.current) return;
    const bounds = parentRef.current.getBoundingClientRect();
    const tooltipBounds = tooltipRef.current.getBoundingClientRect();
    const parentData = { width: bounds.width, height: bounds.height };
    const { x, y } = getTooltipPositin(direction, bounds, tooltipBounds, parentData);
    setPosition({ x, y });
  };

  const handleScroll = () => {
    if (!isShow) return;
    if (!isScrolling.current) {
      isScrolling.current = true;
      requestAnimationFrame(updatePositionContinuously);
    }
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling.current = false;
    }, 100);
  };

  const updatePositionContinuously = () => {
    if (isScrolling.current && isShow) {
      updatePosition();
      requestAnimationFrame(updatePositionContinuously);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      clearTimeout(scrollTimeout);
    };
  }, [isShow]);

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

  const mouseOver = () => {
    setIsShow(true);
    updatePosition();
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

  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
  const [isClient, setIsClient] = useState(false);
  useIsomorphicLayoutEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }

  const tooltipStyle: any = {
    '--bg-color': bgColor || '#333',
    '--text-color': color || '#fff',
    '--tail-bg': tailColor || (dialog ? '#fff' : '#333'),
    '--tail-border': tailBorderColor || (dialog ? '#E4E5EA' : '#333'),
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
            width: '100%',
            whiteSpace: 'pre-wrap',
          }}
        >
          <div
            className={`tooltip ${(!dialog && !customTooltip) && 'default'} ${isShow && 'show'} ${isHide && 'hide'}`}
            style={{ ...tooltipStyle, ...customStyle }}
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
    </div>
  );
}

export default Tooltip;
