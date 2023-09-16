const {pool} = require ("../pg");






const getTasks = async (req, res) => {
    const response = await pool.query('SELECT * FROM tasks');
    try{
        res.status(200).json(response.rows);
    }catch(error){
        return res.json({error:error.message});
    }
   
   
}

const getTaskbyId = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query ("SELECT * FROM tasks WHERE id = $1", [id]);
    res.json(response.rows);

}

const createTask = async (req, res) => {
    const {title, status} = req.body;
    const task = await pool.query("INSERT INTO tasks (title, status) VALUES ($1, $2)", [title, "pendiente"]);
    try{
        res.status(200).json({
        message: "Tarea creada correctamente.",
        body: {
            task: {title, status}
        }})
    }catch(error){
        return res.json({error:error.message});
    }
    };

const deleteTask = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    try{
        res.status(200).json(`Tarea ${id} eliminado correctamente.`);
    }catch(error){
        return res.json({error:error.message});
    }

}





module.exports = {
    getTasks,
    getTaskbyId,
    createTask,
    deleteTask
}