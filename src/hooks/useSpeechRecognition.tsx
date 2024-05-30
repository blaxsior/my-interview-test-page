import { useCallback, useEffect, useRef, useState } from "react";

type UseSpeechRecognitionProps = {
  onStop?: () => void
}

const useSpeechRecognition = ({onStop}: UseSpeechRecognitionProps = {}) => {
  const [completeSpeech, setCompleteSpeech] = useState<string>("");
  const [tempSpeech, setTempSpeech] = useState<string>("");
  const ref = useRef<SpeechRecognition|null>(null);
  const [isRunning, setRunning] = useState(false);

  useEffect(() => {
    if (ref.current === null) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
      const speechrecog = new SpeechRecognition();
      speechrecog.continuous = true;
      speechrecog.interimResults = true;

      speechrecog.onstart = () => {
        setTempSpeech("");
        setCompleteSpeech("");
        setRunning(true);
        console.log("speech start");
      }
    
      speechrecog.onend = () => {
        onStop?.();
        setRunning(false);
        console.log("speech end");
      }
    
      speechrecog.onresult = (e: SpeechRecognitionEvent) => {
        const results = e.results;
        const resultarr = [];
        const interm = [];
    
        for (const result of results) {
          if (result.isFinal) resultarr.push(result[0].transcript);
          else interm.push(result[0].transcript);
        }
    
        if (interm.length > 0) {
          const str = interm.join("");
          setTempSpeech(str);
        } else {
          const resultstr = resultarr.join('');
          setTempSpeech("");
          setCompleteSpeech(resultstr);
        }
      };

      ref.current = speechrecog;
    }
  }, [completeSpeech, tempSpeech, onStop]);

  const start = useCallback(() => {
    ref.current?.start();
  }, [ref]);

  const stop =  useCallback(() => {
    ref.current?.stop();
  }, [ref]);

  return {
    completeSpeech,
    tempSpeech,
    isRunning,
    start,
    stop,
  }
};
  export default useSpeechRecognition;