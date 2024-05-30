import FixedElement from "../component/fixed_element";
import QuestionSection from "../component/question_section";
import Timer from "../component/timer";

export default function IndexPage() {
  return <div>
    <h1 className="text-4xl">면접 연습</h1>
    <QuestionSection/>
    <QuestionSection/>

    <FixedElement>
    <Timer second={10}/>
    </FixedElement>
  </div>
}