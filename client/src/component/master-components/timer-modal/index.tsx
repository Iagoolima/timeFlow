import { useState, useEffect } from "react";


export default function Timer() {
  const initialTime = 3; // 10 minutos em segundos
  const [time, setTime] = useState(initialTime);
  const [isFinished, setIsFinished] = useState(false);



  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        clearInterval(timer); // Pare o temporizador quando o tempo acabar
        setIsFinished(true);
      }
    }, 1000); // Atualize a cada segundo

    return () => {
      clearInterval(timer); // Limpe o temporizador quando o componente for desmontado
    };
  }, [time]);

  // Converte o tempo em segundos para minutos e segundos
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;





  return (
    <div>
      {isFinished ? (
        <h1 className="finish-timer-modal finish-red">Tempo Finalizado</h1>
      ) : (
        <h1 className="finish-timer-modal finish-green">
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </h1>
      )}
    </div>
  );
}
