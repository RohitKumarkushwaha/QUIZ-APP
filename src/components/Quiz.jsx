import React, { useState, useEffect } from 'react';
import questions from '../Data/questions.json';

const Quiz = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const savedCurrentQuestion = localStorage.getItem('currentQuestion');
    return savedCurrentQuestion ? parseInt(savedCurrentQuestion) : 0;
  });
  const [score, setScore] = useState(0);
  const [seeScore, setSeeScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTimeLeft = localStorage.getItem('timeLeft');
    return savedTimeLeft ? parseInt(savedTimeLeft) : 600; // 10 minutes in seconds
  });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      setScore((prevScore) =>
        selectedOption === questions[currentQuestion].answer ? prevScore + 1 : prevScore
      );
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => {
        const nextQuestion = prevQuestion + 1;
        localStorage.setItem('currentQuestion', nextQuestion);
        return nextQuestion;
      });
      setSelectedOption('');
    } else {
      setSeeScore(true);
    }
  };

  const handleHome = () => {
    window.location.reload();
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('timeLeft');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        localStorage.setItem('timeLeft', prevTime - 1);
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('currentQuestion', currentQuestion);
  }, [currentQuestion]);

  return (
    <div className='flex w-full h-screen items-center justify-center flex-col gap-10 bg-gradient-to-r from-blue-100 to-blue-300 p-4'>
      {seeScore ? (
        <div className='flex items-center justify-center flex-col gap-10'>
          <div className='flex items-center justify-center text-center p-4 h-[200px] w-[200px] rounded-full border-4 border-blue-600 bg-white shadow-xl'>
            <h1 className='text-[40px] font-semibold text-blue-600'>
              {score} / 10
            </h1>
          </div>
          <button
            onClick={handleHome}
            className='p-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 shadow-md'
          >
            Go to Home
          </button>
        </div>
      ) : (
        <>
          <h3 className='text-lg font-semibold text-gray-800'>
            Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </h3>
          <div className='w-[90%] max-w-[600px] bg-gray-200 rounded-full h-4 mb-6'>
            <div
              className='bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out'
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className='p-6 bg-white rounded-lg shadow-xl w-[90%] max-w-[600px]'>
            <h3 className='text-xl font-semibold mb-6 text-gray-900'>
              Q.{currentQuestion + 1}. {questions[currentQuestion].question}
            </h3>
            <div className='font-medium gap-4 flex flex-col'>
              {questions[currentQuestion].options.map((option) => (
                <label key={option} className='flex items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-300'>
                  <input
                    type='radio'
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                    className='w-5 h-5 text-blue-600 focus:ring-blue-500'
                  />
                  <span className='ml-4 text-lg text-gray-800'>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={handleNextQuestion}
            className='p-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 shadow-md'
          >
            {currentQuestion === questions.length - 1 ? 'See Score' : 'Next Question'}
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
