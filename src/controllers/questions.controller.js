const {pool} = require ("../pg");





const getQuestions = async (req, res) => {
    const response = await pool.query('SELECT * FROM questions');
    try{
        res.status(200).json(response.rows);
    }catch(error){
        return res.json({error:error.message});
    }
   
   
}

const getQuestionsbyId = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query ("SELECT * FROM questions WHERE id = $1", [id]);
    res.json(response.rows);

}

const createQuestions = async (req, res) => {
    const {question, answers, correctAnswer, selectedAnswer, course_id} = req.body;
    await pool.query("INSERT INTO questions (question, answers, correctAnswer, selectedAnswer, course_id) VALUES ($1, $2, $3, $4, $5)", [question, answers, correctAnswer, null, course_id]);
    try{
        res.status(200).json({
        message: "Pregunta creada correctamente.",
        body: {
            university: {question, answers, correctAnswer, selectedAnswer, course_id}
        }})
    }catch(error){
        return res.json({error:error.message});
    }
    };

    const updateQuestions = async (req, res) => {
        const id = req.params.id;
        const { answers } = req.body;
        const response = await pool.query("UPDATE questions SET answers = $1 WHERE id = $2",[answers, id]);
        try{
            res.status(200).json({
            message: "Pregunta actualizada correctamente.",
            body: {
                course: {answers}
            }})
        }catch(error){
            return res.json({error:error.message});
        }
    
        }

    const deleteQuestions = async (req, res) => {
        const id = req.params.id;
        const response = await pool.query("DELETE FROM questions WHERE id = $1", [id]);
        try {
            res.status(200).json(`Pregunta ${id} eliminado correctamente`)
        } catch (error) {
            return res.json({error: error.message});
        }
    }

    module.exports = {
        getQuestions,
        getQuestionsbyId,
        createQuestions,
        updateQuestions,
        deleteQuestions
    }