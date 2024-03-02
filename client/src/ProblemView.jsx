import React, { useState } from 'react';
import './ProblemView.css';

function ProblemView({ problems }) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    if (userAnswer === problems[currentProblemIndex].answer) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    }
    setUserAnswer('');
  };

  return (
    <div>
      <h1>{problems[currentProblemIndex].body}</h1>
      <form onSubmit={handleAnswerSubmit}>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        </form>
          <p>Press Enter to Submit</p>
    </div>
  );
}

export default ProblemView;