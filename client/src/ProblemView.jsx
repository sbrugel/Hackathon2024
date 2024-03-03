import React, { useState, useEffect } from 'react';
import './ProblemView.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProblemView({ problems }) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    if (userAnswer === problems[currentProblemIndex].answer) {
      toast.success('Correct!');
      setCurrentProblemIndex(currentProblemIndex + 1);
    } else {
      toast.error('Incorrect...');
    }
    setUserAnswer('');
  };

  const startStopwatch = () => {
    setElapsedTime(0);
    const intervalId = setInterval(() => {
      setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
    }, 1000);
    return intervalId;
  };

  const stopStopwatch = (intervalId) => {
    clearInterval(intervalId);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

  useEffect(() => {
    const intervalId = startStopwatch();
    return () => {
      stopStopwatch(intervalId);
    };
  }, []); 

  return (
    <div>
      <h1>{problems[currentProblemIndex].body}</h1>
      <form onSubmit={handleAnswerSubmit}>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <p>Press Enter to Submit</p>
        </form>
        <p>Time: {formatTime(elapsedTime)}</p>
        <ToastContainer />
    </div>
  );
}

export default ProblemView;