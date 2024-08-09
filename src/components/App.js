import React, { useState } from "react";
import Question from "./Question";
import quiz from "../data/quiz";

function App() {
  const [questions, setQuestions] = useState(quiz);
  const [currentQuestionId, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const currentQuestion = questions.find((q) => q.id === currentQuestionId);
  const [timeRemaining, setTimeRemaining] = useState(10);

  function handleQuestionAnswered(correct) {
    if (currentQuestionId < questions.length) {
      setCurrentQuestion((currentQuestionId) => currentQuestionId + 1);
    } else {
      setCurrentQuestion(null);
    }
    if (correct) {
      setScore((score) => score + 1);
    }
  }
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);   


    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
    }

    return () => clearInterval(timerId);
  }, [timeRemaining,onAnswered]);


  return (
    <main>
      <section>
        {currentQuestion ? (
          <Question
            question={currentQuestion}
            onAnswered={handleQuestionAnswered}
          />
        ) : (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}</h2>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
