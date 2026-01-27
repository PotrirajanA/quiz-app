import React, { useState } from 'react'

const Quiz = ({question, questionNumber, totalQuestion}) => {
  const[selectedOption, setSelectedOption] = useState(null);
  return (
    <div>
      <h2>Question {questionNumber} of {totalQuestion}</h2>
      <h2>{questionNumber}.{question.question}</h2>
      <div className='my-2'>
        <p className='text-sm text-gray-400'>Time Left: 10s</p>
        <div className='w-full bg-gray-200 rounded-full h-2.5'>
          <div className='bg-blue-600 h-2.5 rounded-full' style={{width:`25%`}} ></div>
        </div>
      </div>
      {question.options.map((option,index)=>(
        <button key={index} className={`w-full text-left p-2 border border-gray-100 my-2 cursor-pointer ${selectedOption === option ? "bg-sky-700 text-white" : "hover:bg-gray-200"} rounded`}>{option}</button>
      ))}
    </div>
  )
}

export default Quiz