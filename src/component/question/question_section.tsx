import { ChangeEvent, useState } from "react"
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material";

export default function QuestionSection() {
  const [question, setQuestion] = useState<string>("");
  const [completeAnswer, setCompleteAnswer] = useState<string>("");
  const [isAnswerVisible, setAnswerVisible] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const { speech } = useSpeechSynthesis();

  const onRecognitionStop = () => {
    setIsListening(false);
  };
  const speechrecog = useSpeechRecognition({
    onStop: onRecognitionStop
  });

  const { tempSpeech, completeSpeech, isRunning } = speechrecog;


  const startQuestion = () => {
    setIsListening(false);
    setCompleteAnswer("");
    speech(question, () => {
      startAnswer();
    });
  };

  const startAnswer = () => {
    setIsListening(true);
    speechrecog.start();
  };

  const stopAnswer = () => {
    setCompleteAnswer(completeSpeech);
    speechrecog.stop();
    setIsListening(false);
  };

  const handleQuestion = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const clearCompleteAnswer = () => {
    setCompleteAnswer("");
  };

  const toggleAnswerVisible = () => {
    setAnswerVisible(it => !it);
  };

  return <div className="p-1 border border-black">

    <div className="mb-1 justify-end flex border-b border-black">
      <IconButton aria-label="delete">
        <ClearIcon fontSize="medium" />
      </IconButton>
    </div>

    <div className="flex flex-col space-y-3 p-5">
      <div className="space-y-3">
        <div>질문</div>
        <textarea
          className="border border-black p-1 w-full"
          onChange={handleQuestion}
          value={question}
        />
      </div>
      <hr className="border-black" />
      <div>{isListening ? "듣는 중..." : "안듣는 중..."}</div>
      <div className="space-y-3">
        <div>대답</div>
        <div className={`relative border border-black p-1 w-full`} >
          {
            isRunning && <>
              <span>{completeSpeech}</span>
              {tempSpeech.length > 0 && <span className={`text-red-700`}>{tempSpeech}</span>}
            </>
          }
          {
            !isRunning && <span>{completeAnswer}</span>
          }
          {
            !isAnswerVisible && <div className="absolute w-full h-full top-0 left-0 bg-black"></div>
          }
        </div>
      </div>
      <div className="flex justify-center">
        {!isListening ?
          <button className="border border-black p-2 m-1 rounded active:bg-gray-300" onClick={startQuestion}>모의 질문 시작</button>
          :
          <button className="border border-black p-2 m-1 rounded active:bg-gray-300" onClick={stopAnswer}>대답 종료</button>
        }
        <button className="border border-black p-2 m-1 rounded active:bg-gray-300" onClick={clearCompleteAnswer}>
          대답 초기화
        </button>
        <button className="border border-black p-2 m-1 rounded active:bg-gray-300" onClick={toggleAnswerVisible}>
          {isAnswerVisible ? "내용 가리기" : "내용 보이기"}
        </button>
      </div>
    </div>
  </div>
}

// 질문을 입력한다
// 질문 시작 버튼을 누르면, 질문 말함
// 질문 다 말하면 타이머 동작
// 타이머가 동작하는 동안 내가 말한 내용이 대답에 입력됨.
