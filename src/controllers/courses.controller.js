const {pool} = require ("../pg");





const getCourses = async (req, res) => {
    const response = await pool.query('SELECT * FROM courses');
    try{
        res.status(200).json(response.rows);
    }catch(error){
        return res.json({error:error.message});
    }
   
   
}

const getCoursesbyId = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query ("SELECT * FROM courses WHERE id = $1", [id]);
    res.json(response.rows);

}

const createCourses = async (req, res) => {
    const {name, description, content, note, university_id} = req.body;
    await pool.query("INSERT INTO courses (name, description, content, note, university_id) VALUES ($1, $2, $3, $4, $5)", [name, description, content, note, university_id]);
    try{
        res.status(200).json({
        message: "Curso creado correctamente.",
        body: {
            university: {name, description, note, content}
        }})
    }catch(error){
        return res.json({error:error.message});
    }
    };

const deleteCourses = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query("DELETE FROM courses WHERE id = $1", [id]);
    try {
        res.status(200).json({message: "Curso eliminado correctamente."})
    } catch (error) {
        return res.json({error: error.message});
    }
}

const updateCourses = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const response = await pool.query("UPDATE courses SET name = $1 WHERE id = $2",[name, id]);
    try{
        res.status(200).json({
        message: "Curso actualizado correctamente.",
        body: {
            course: {name}
        }})
    }catch(error){
        return res.json({error:error.message});
    }

    }

    module.exports = {
        getCourses,
        getCoursesbyId,
        createCourses,
        deleteCourses,
        updateCourses
    }