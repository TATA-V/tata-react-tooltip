# TATA React Tooltip

react portal tooltip

**<a href="https://tata-react-tooltip-docs.vercel.app">Documentation</a>**

## Introduction
 
Tooltip that **always stays on top** of the screen was created using the React **portal** feature.

## Install

```bash
# npm
npm i -D tata-react-tooltip

# yarn
yarn add -D tata-react-tooltip

# pnpm
pnpm add -D tata-react-tooltip
```

## Usage

```jsx copy
import { Tooltip } from 'tata-react-tooltip';
import { useRef } from 'react';

const ref = useRef<HTMLDivElement>(null);
```

### Default

```jsx
<Tooltip
  direction="right"
  parentRef={ref}
  message="hello tooltip!"
>
  <div ref={ref} className="hello">
    Hello Tooltip!
  </div>
</Tooltip>
```

### Dialog

```jsx
<Tooltip
  dialog
  direction="right"
  parentRef={ref}
  message="hello tooltip!"
>
  <div ref={ref} className="hello">
    Hello Tooltip!
  </div>
</Tooltip>
```

### Custom Style

```jsx
<Tooltip
  direction="right"
  parentRef={ref}
  message="hello tooltip!"
  bgColor='#9667E9'
  tailColor='#9667E9'
  tailBorderColor='#9667E9'
  customStyle={{ fontSize: '0.9rem', fontWeight: '600' }}
>
  <div ref={ref} className="hello">
    Hello Tooltip!
  </div>
</Tooltip>
```

## API

<span style="color:red">*</span> : required

| Property | Description | Type | Default |
| ------- | ------- | ------- | ------- |
| <span style="color:red">*</span>parentRef | 부모 요소의 ref | `RefObject<any>` | - |
| message | 툴팁에 표시할 메시지 | `string` | - |
| direction | 툴팁이 부모 요소에 상대적으로 나타나는 방향 | `tl` ￨ `top` ￨ `tr` ￨ `rt` ￨ `right` ￨ `rb` ￨ `bl` ￨ `bottom` ￨ `br` ￨ `lt` ￨ `left` ￨ `lb` | `top` |
| customStyle | 툴팁에 적용할 사용자 지정 CSS 스타일 | `CSSProperties` | - |
| leaveDelay | 마우스가 부모 요소에서 떠난 후 툴팁이 사라지기까지의 지연 시간(밀리초) | `number` | - |
| enterDelay | 마우스가 부모 요소에 올려진 후 툴팁이 나타나기까지의 지연 시간(밀리초) | `number` | - |
| color | 툴팁 텍스트의 색상 | `string` | - |
| bgColor | 툴팁 배경의 색상 | `string` | `#333` |
| tailColor | 툴팁 꼬리의 색상 | `string` | `#333` |
| tailBorderColor | 툴팁 꼬리의 테두리 색상 | `string` | `#333` |
| hideTail | 툴팁의 꼬리를 숨길지 여부 | `boolean` | `false` |
| dialog | 툴팁을 대화 상자 형태로 표시할지 여부 | `boolean` | `false` |
| dialogIcon | 대화 상자 스타일 툴팁에 표시할 아이콘 | `ReactNode` | `<WarnIcon />` |
| dialogBtnText | 대화 상자 스타일 툴팁에 표시할 버튼 텍스트 | `string` | `YES` |
| customTooltip | 기본 툴팁 대신 사용할 사용자 지정 컴포넌트 | `ReactNode` | - |









