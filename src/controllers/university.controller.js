const {pool} = require ("../pg");




const getUniversity = async (req, res) => {
    const response = await pool.query('SELECT * FROM university');
    try{
        res.status(200).json(response.rows);
    }catch(error){
        return res.json({error:error.message});
    }
   
   
}

const getUniversitybyId = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query ("SELECT * FROM university WHERE id = $1", [id]);
    res.json(response.rows);

}

const createUniversity = async (req, res) => {
    const {name, city, logo} = req.body;
    await pool.query("INSERT INTO university (name, city, logo) VALUES ($1, $2, $3)", [name, city, logo]);
    try{
        res.status(200).json({
        message: "Universidad creada correctamente.",
        body: {
            university: {name, city, logo}
        }})
    }catch(error){
        return res.json({error:error.message});
    }
    };


const updateUniversity = async (req, res) => {
    const id = req.params.id;
    const {name, city, logo} = req.body;
    const response = await pool.query("UPDATE university SET name = $1, city = $2, logo = $3 WHERE id = $4",
    [name, city, logo, id]);
    try{
        res.status(200).json({
        message: "Universidad actualizada correctamente.",
        body: {
            university: {name, city, logo}
        }})
    }catch(error){
        return res.json({error:error.message});
    }
}

const deleteUniversity = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query("DELETE FROM university WHERE id = $1", [id]);
    try{
        res.status(200).json(`Universidad ${id} eliminada correctamente.`);
    }catch(error){
        return res.json({error:error.message});
    }
}



module.exports = {
    getUniversity,
    getUniversitybyId,
    createUniversity,
    updateUniversity,
    deleteUniversity,
}