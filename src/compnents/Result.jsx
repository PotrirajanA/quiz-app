import React from 'react'

const Result = ({resultHistory, restartQuiz, answers, score, userName,total}) => {
  return (
    <div>

      <h2 className="text-sky-950 font-semibold mb-4">Result</h2>

      <p className='mb-2'>{userName} you scored {score} out of {total}!</p>

      {JSON.stringify(resultHistory)}

      <button className="bg-sky-800 text-white p-2 w-full outline-none rounded shadow cursor-pointer hover:bg-sky-950 transition mb-3"  onClick={restartQuiz}>Restart</button>
    </div>
  )
}

export default Result