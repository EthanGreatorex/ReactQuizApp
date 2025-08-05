import { useEffect, useState } from "react";
import "../css/QuizCard.css";

function QuizCard({ question, handleAnswerSelected }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);

  // This will shuffle the answer option order, otherwise the correct answer would always be in the same position
  useEffect(() => {
    const randomOrderAnswers = question.incorrectAnswers
      .concat(question.correctAnswer)
      .sort(() => Math.random() - 0.5);

    setAnswers(randomOrderAnswers);
    setSelectedAnswer(null);
  }, [question]);

  const handleOptionClick = (option) => {
    // Only run this if the user is selecting an answer for the first time
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    handleAnswerSelected(option === question.correctAnswer);
  };

  // This will determine the correct styling to apply to each of the answer option buttons. 
  const getOptionClass = (answer) => {
    if (!selectedAnswer) return "quiz-card__option";

    if (answer === selectedAnswer) {
      return answer === question.correctAnswer
        ? "quiz-card__option quiz-card__option--correct"
        : "quiz-card__option quiz-card__option--incorrect";
    }
    if (
      selectedAnswer !== question.correctAnswer &&
      answer === question.correctAnswer
    ) {
      return "quiz-card__option quiz-card__option--correct";
    }

    return "quiz-card__option";
  };

  return (
    <div className="quiz-card">
      <h3 className="quiz-card__title">{question.question}</h3>
      <ul className="quiz-card__list">
        {answers.map((answer, index) => (
          <button
            className={getOptionClass(answer)}
            key={index}
            onClick={() => handleOptionClick(answer)}
          >
            {answer}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default QuizCard;
