import { useCallback, useState } from "react";

const useSpeechSynthesis = () => {
  const [isSpeech, setSpeech] = useState(false);

  const speech = useCallback((question: string, onSpeechEnd?: () => void) => {
    if(isSpeech) return;
    setSpeech(true); // 현재 말하고 있으면 큐에 쌓이지 않아야 함.
    const synth = window.speechSynthesis;    

    const utterance = new SpeechSynthesisUtterance(question);
    utterance.onend = () => {
      setSpeech(false);
      onSpeechEnd?.();
    };
    synth.speak(utterance);
  }, [isSpeech]);

  // stop 같은 것은 아직 구현 X
  return {
    speech,
  }
};

export default useSpeechSynthesis;