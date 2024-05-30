import Tooltip from 'src/lib/Tooltip/Tooltip';
import './mainpage.scss';
import { useEffect, useRef, useState } from 'react';

function MainPage() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [parent, setParent] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
  useEffect(() => {
    if (!parentRef.current) return;
    setParent({ width: parentRef.current.clientWidth, height: parentRef.current.clientHeight });
  }, []);
  const shortTxt = 'hello\nhello';
  // const longTxt = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad id, quo quae pariatur dolorum commodi magni, sed, illum ipsam quod reprehenderit laudantium? Necessitatibus distinctio ducimus commodi quaerat, illo ea molestiae!';

  return (
    <div className="main-container2">
      {/* <div className="main-container"> */}
      <Tooltip customStyle={{ backgroundColor: '#330867', color: '#30CFD0' }} direction="bl" parentWidth={parent.width} parentHeight={parent.height} message={shortTxt}>
        <div ref={parentRef} className="hello">
          Hello Tooltip!
        </div>
      </Tooltip>
      {/* {[...Array(9)].map((_, idx) => (
          <Tooltip key={idx} parentWidth={200} parentHeight={104} direction="rb" message={shortTxt}>
            <div className="hello">
              Hello Tooltip!
            </div>
          </Tooltip>
        ))} */}
      {/* </div> */}
    </div>
  );
}

export default MainPage;
