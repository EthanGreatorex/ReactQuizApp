
export const fetchQuizData = async (limit = 5, difficulty = 'medium', category='') => {
    try {
        const response = await fetch(
            `https://the-trivia-api.com/api/questions?limit=${limit}&difficulty=${difficulty}&categories=${category}`
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Failed to fetch quiz data:', error);
        return [];
    }
}
