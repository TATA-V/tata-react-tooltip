import Tooltip from 'src/lib/Tooltip/Tooltip';
import './mainpage.scss';
import { useRef } from 'react';

function MainPage() {
  const parentRef = useRef<HTMLDivElement>(null);
  const shortTxt = 'hello\nhello';

  return (
    <div className="main-container2">
      <Tooltip
        parentRef={parentRef}
        leaveDelay={3000}
        tailColor="#330867"
        tailBorderColor="#330867"
        customStyle={{ backgroundColor: '#330867', color: '#30CFD0' }}
        direction="top"
        message={shortTxt}
      >
        <div ref={parentRef} className="hello">
          Hello Tooltip!
        </div>
      </Tooltip>
    </div>
  );
}

export default MainPage;
