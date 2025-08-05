
import {use, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/Home.css'


function Home() {
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('medium');
    const [limit, setLimit] = useState(5);
    const navigate = useNavigate();

    const startGame = () => {
        navigate(`/game?difficulty=${difficulty}&limit=${limit}&category=${category}`);
    };

    const handleInputChange = (e) => {
        e.preventDefault();

        if (e.target.value > 0 && e.target.value < 21) {
            setLimit(e.target.value)
        } else{
            return
        }
    }

    return (
        <div className='home'>
            <h2 className='home__title'>Select Settings To Start</h2>
            <label className='home__label'>
                Topic
                <select className='home__select' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="general_knowledge">Generale Knowledge</option>
                    <option value="music">Music</option>
                    <option value="food_and_drink">Food & Drink</option>
                    <option value="sport_and_leisure">Sport & Leisure</option>
                    <option value="film_and_tv">Film & TV</option>
                    <option value="arts_and_literature">Arts & Literature</option>
                    <option value="geography">Geography</option>
                    <option value="science">Science</option>
                    <option value="society_and_culture">Society & Culture</option>
                    <option value="history">History</option>
                </select>
            </label>
            <label className='home__label'>
                Difficulty:
                <select className='home__select' value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </label>
            <label className='home__label'>
                Number of Questions:
                <input type="number"
                className='home__input'
                min="1" 
                max="20"
                value={limit}
                onChange={(e) => handleInputChange(e)}/>
            </label>
            <button className='home__button' onClick={startGame}>Start Quiz</button>
        </div>
    )
}

export default Home;