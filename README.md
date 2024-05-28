# React Tooltip

react portal tooltip

## Installation

```bash
#pnpm
pnpm add tata-react-tooltip

# npm
npm i tata-react-tooltip

# yarn
yarn add tata-react-tooltip
```

## Usage

```tsx
import Tooltip from 'tata-react-tooltip'

// default
<Tooltip direction="right" parentWidth={200} parentHeight={180} message="hello tooltip!">
  <div className="hello">
      Hello Tooltip!
  </div>
</Tooltip>

// dialog
<Tooltip dialog direction="right" parentWidth={200} parentHeight={180} message="hello tooltip!">
  <div className="hello">
      Hello Tooltip!
  </div>
</Tooltip>

// custom style
<Tooltip customTooltip={{ back }} direction="right" parentWidth={200} parentHeight={180} message="hello tooltip!">
  <div className="hello">
      Hello Tooltip!
  </div>
</Tooltip>
```

useRef

```tsx
import Tooltip from 'src/lib/Tooltip/Tooltip';
import { useEffect, useRef, useState } from 'react';
import './mainpage.scss';

function MainPage() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [parent, setParent] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
  useEffect(() => {
    if (!parentRef.current) return;
    setParent({ width: parentRef.current.clientWidth, height: parentRef.current.clientHeight });
  }, []);
  const shortTxt = 'hello\nhello';

  return (
    <div className="main-container2">
      <Tooltip dialog direction="bl" parentWidth={parent.width} parentHeight={parent.height} message={shortTxt}>
        <div ref={parentRef} className="hello">
          Hello Tooltip!
        </div>
      </Tooltip>
    </div>
  );
}

export default MainPage;
```



## API

<span style="color:red">*</span> : required

| Property | Description | Type | Default |
| ------- | ------- | ------- | ------- |
| <span style="color:red">*</span>parentWidth | 부모 요소의 너비 | `number` | - |
| <span style="color:red">*</span>parentHeight | 부모 요소의 높이 | `number` | - |
| message | 툴팁에 표시할 메시지 | `string` | - |
| direction | 툴팁의 방향 | `tl` ￨ `top` ￨ `tr` ￨ `rt` ￨ `right` ￨ `rb` ￨ `bl` ￨ `bottom` ￨ `br` ￨ `lt` ￨ `left` ￨ `lb` |
| customStyle | 툴팁의 커스텀 스타일 | `CSSProperties` | - |
| leaveDelay | 마우스가 툴팁에서 떠났을 때 사라지기까지의 지연 시간 | `number` | - |
| enterDelay | 마우스가 툴팁에 올려졌을 때 나타나기까지의 지연 시간 | `number` | - |
| color | 툴팁 텍스트의 색상 | `string` | - |
| bgColor | 툴팁 배경의 색상 | `string` | `#333` |
| tailColor | 툴팁 꼬리의 색상 | `string` | `#333` |
| tailBorderColor | 툴팁 꼬리의 테두리 색상 | `string` | `#333` |
| hideTail | 툴팁 꼬리 숨기기 여부 | `boolean` | `false` |
| dialog | 다이얼로그 형태의 툴팁 여부 | `boolean` | `false` |
| dialogIcon | 다이얼로그 툴팁 아이콘 | `ReactNode` | `<WarnIcon />` |
| dialogBtnText | 다이얼로그 버튼 텍스트 | `string` | `YES` |
| customTooltip | 기본 툴팁 대신 사용할 컴포넌트 | `ReactNode` | - |









