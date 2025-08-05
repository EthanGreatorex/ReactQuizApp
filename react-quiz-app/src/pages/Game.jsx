import { use, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchQuizData } from "../services/api";
import QuizCard from "../components/QuizCard";
import { useNavigate } from "react-router-dom";
import "../css/Game.css";

function Game() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  // Fetch the quiz data based on the search parameters, if no data is found, use the default values
  const difficulty = searchParams.get("difficulty") || "medium";
  const limit = searchParams.get("limit") || 5;
  const category = searchParams.get("category") || 'general_knowledge';

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await fetchQuizData(limit, difficulty, category);
      setQuestions(data);
    };
    fetchQuestions();
  }, [limit, difficulty]);

  // This will update the index pointer to that the next question from the JSON data is displayed
  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };


  // This will keep a tally of the score. Takes a boolean flag which shows whether the user got the answer correct or not
  const handleAnswerSelected = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };


  // This will handle the home button click from the end of game screen
  const handleHomeClick = () => {
    navigate('/');
  }

  // Display a loading status whilst the data is loading
  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="completed">
        <h3 className="completed__title">You Finished The Quiz!</h3>
        <p className="completed__results">
          Your Score: {score}/{limit}
        </p>
        <button className="completed__button" onClick={handleHomeClick}>Home</button>
      </div>
    );
  }

  return (
    <div className="game">
      <QuizCard
        question={questions[currentQuestionIndex]}
        handleAnswerSelected={handleAnswerSelected}
      ></QuizCard>
      <button className="game__button" onClick={nextQuestion}>
        Next
      </button>
    </div>
  );
}

export default Game;
