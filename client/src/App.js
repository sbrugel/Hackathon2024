import './App.css';
import React, {useState} from 'react'

const problems = ["problem 1", "problem 2", "problem 3"];
const creators = ["creator 1", "creator 2", "creator 3"];
const difficulty = ["difficulty 1", "difficulty 2", "difficulty 3"];


function App() {
  return (
    <div classname="homepage">
      <p>Welcome back user</p>
      <text>Problem Set</text>
      <div classname="search-bar">
        <input placeholder="Problem search..."></input>
      </div>
      <div classname="problem-name">Name of problem
        <ul>
          {problems.map((problem, index) => (
            <li key={index}>{problem}</li>
          ))}

        </ul>
      </div>
      <div classname="problem-creator">Creator of problem
        <ul>
          {creators.map((creator, index) => (
            <li key={index}>{creator}</li>
          ))}

        </ul>
      </div>
      <div classname="problem-difficulty">Difficulty of problem
        <ul>
          {difficulty.map((difficulty, index) => (
            <li key={index}>{difficulty}<button onClick={() => handleButtonClick(index)}>Click me</button></li>
          ))}

        </ul>
      </div>
      <div classname="problem-play-button">
        

      </div>
      <div classname="problem-leaderboard">leaderboards
      
      </div>

    </div>
  );
  const handleButtonClick = (index) => {
    // Handle button click for the specific element (index) here
    console.log(`Button clicked for element at index ${index}`);
  };
}


export default App;
