import Draggable from "react-draggable";
import Timer from "../component/timer";
import { useRef } from "react";
import FixedElement from "../component/fixed_element";
import QuestionSectionList from "../component/question/question_section_list";

export default function IndexPage() {
  const nodeRef = useRef(null);

  return <div>
    <h1 className="text-4xl">면접 연습</h1>
    <QuestionSectionList />
    <FixedElement>
      <Draggable
        nodeRef={nodeRef}>
        <div ref={nodeRef}>
          <Timer second={10} />
        </div>
      </Draggable>
    </FixedElement>
  </div>
}