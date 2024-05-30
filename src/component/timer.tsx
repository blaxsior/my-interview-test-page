import { ChangeEvent, useEffect } from "react";
import { useState } from "react";

type TimerProps = {
  second: number;
};

export default function Timer({ second }: TimerProps) {
  const [time, setTime] = useState(second);
  const [baseTime, setBaseTime] = useState(second);

  const [is_active, setActive] = useState(false);
  const [is_time_editable, setTimeEditable] = useState(false);

  useEffect(() => {
    let t: number | undefined;
    // start
    if (is_active) {
      if (time === 0) {
        clearTimeout(t);
      }
      else {
        t = setTimeout(() => {
          setTime(sec => sec - 1);
        }, 1000);
      }
    }
    // 직접 stop
    else if (!is_active && time !== 0) {
      clearTimeout(t);
    }

    return () => clearTimeout(t);
  }, [is_active, time]);

  const start = () => {
    setActive(true);
  };

  const stop = () => {
    setActive(false);
  }

  const reset = () => {
    setActive(false);
    setTime(baseTime);
  }

  const timeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(+(e.target.value));
    setBaseTime(+(e.target.value));
  }

  const toggleEditable = () => {
    setTimeEditable(it => !it);
  }

  return <div className="border border-black rounded-sm p-4 inline-block bg-slate-600">
    <div className="m-2 p-2 border border-black mb-8 rounded-lg bg-white">
      <span>
        second: <input type="text" value={time} onChange={timeChange} disabled={!is_time_editable}/>
      </span>
      <button onClick={toggleEditable} className={"border-2 px-1 rounded " + (is_time_editable ? "bg-green-400" : "bg-gray-300")}>edit</button>
    </div>
    <div className="flex flex-1 mx-2 my-1 gap-4 justify-center">
      <button className="border border-gray-900 rounded-lg px-2 py-1 bg-gray-100" onClick={start}>start</button>
      <button className="border border-gray-900 rounded-lg px-2 py-1 bg-gray-100" onClick={stop}>stop</button>
      <button className="border border-gray-900 rounded-lg px-2 py-1 bg-gray-100" onClick={reset}>reset</button>
    </div>
  </div>
}