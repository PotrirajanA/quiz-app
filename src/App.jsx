import React, { useEffect, useState } from "react";
import Quiz from "./compnents/Quiz";
import Result from "./compnents/Result";
import questionsData from "./questions.json";
const App = () => {

  const [userName, setUserName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinisheded, setQuizFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleNameSubmit = (e)=>{
    e.preventDefault();
    if(userName.trim()){
      setQuizStarted(true);
    }
  }

  useEffect(()=>{
    if(quizStarted && questions.length == 0){
      const shuffeld = [...questionsData].sort(()=>Math.random() - 0.5);
      // console.log(shuffeld);
      setQuestions(shuffeld.slice(0,5));
    }
  },[quizStarted])

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-3 shadow-lg rounded max-w-md w-full">
        <h1 className="font-bold text-xl text-center mb-4 text-sky-950">
          Quiz App
        </h1>

        {!quizStarted && (
          <form onSubmit={handleNameSubmit}>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="rounded border-2  border-gray-300 w-full p-2 outline-none focus:border-gray-500 text-sky-950 mb-3"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="bg-sky-800 text-white p-2 w-full outline-none rounded shadow cursor-pointer hover:bg-sky-950 transition mb-3" type="submit">
            Start Quiz
          </button>
        </form>

        )}

        {quizStarted && !quizFinisheded && questions.length > 0 && (
           <Quiz key={currentIndex} question = {questions[currentIndex]} questionNumber ={currentIndex + 1} totalQuestion = {questions.length} />
        )}

        {quizFinisheded && <Result />}

      </div>
    </div>
  );
};

export default App;
