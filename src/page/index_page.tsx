import Draggable from "react-draggable";
import QuestionSection from "../component/question_section";
import Timer from "../component/timer";
import { useRef } from "react";
import FixedElement from "../component/fixed_element";

export default function IndexPage() {
  const nodeRef = useRef(null);

  return <div>
    <h1 className="text-4xl">면접 연습</h1>
    <FixedElement>
      <Draggable
        nodeRef={nodeRef}>
        <div ref={nodeRef}>
          <Timer second={10} />
        </div>
      </Draggable>
    </FixedElement>

    <ul>
      <li>
        <QuestionSection />
      </li>
      <li>
        <QuestionSection />
      </li>
    </ul>

    {/* <Draggable
        nodeRef={nodeRef}
        onDrag={(e, data) => trackPos(data)}
      >
        <div
          ref={nodeRef}
          className="box"
        >
          <div>BOX</div>
          <div>
            x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
          </div>
        </div>
      </Draggable> */}
  </div>
}