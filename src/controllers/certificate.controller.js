const {pool} = require ("../pg");

const createCertificate = async (req, res) => {
    const {user_id, course_id, percentage, certificate, correctAnswer, totalQuestions} = req.body;
    const date = new Date();
    const isoString = date.toUTCString();
    await pool.query("INSERT INTO certificate (user_id, course_id, date, percentage, certificate, correctAnswer, totalQuestions) VALUES ($1, $2, $3, $4, $5, $6, $7)", [user_id, course_id,isoString, percentage, certificate, correctAnswer, totalQuestions]);
    try{
        res.status(200).json({
        message: "Certificado creado correctamente.",
        body: {
            rol: {user_id, course_id, percentage, date, certificate, correctAnswer, totalQuestions}
        }})
    }catch(error){
        return res.json({error:error.message});
    }
};

const getCertificatebyId = async (req, res) => {
    const {user_id , course_id} = req.query;
    const response = await pool.query ("SELECT * FROM certificate WHERE user_id = $1 AND course_id = $2", [user_id, course_id]);
    res.json(response.rows);

}
const getCertificate = async (req, res) => {
    const response = await pool.query('SELECT * FROM certificate');
    try{
        res.status(200).json(response.rows);
    }catch(error){
        return res.json({error:error.message});
    }
}
const updateCertificate = async(req, res) => {
    const {percentage, certificate, correctAnswer, totalQuestions} = req.body;
    const {user_id, course_id} = req.query;
    const date = new Date();
    const isoString = date.toUTCString();
    const response = await pool.query("UPDATE certificate SET date = $1, percentage = $2, certificate = $3, correctAnswer= $4 WHERE user_id = $5 AND course_id = $6",
    [isoString, percentage, certificate, correctAnswer, user_id, course_id]);
    console.log();
    try{
        res.status(200).json({
        message: "Certificado actualizado correctamente",
        body: {
            certificate: {user_id, course_id, date, percentage, certificate, correctAnswer, totalQuestions}
        }})
    }catch(error){
        return res.json({error:error.message});
    }
}


module.exports = {
    getCertificate,
    createCertificate,
    getCertificatebyId,
    updateCertificate
}