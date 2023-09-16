const {pool} = require ("../pg");





const getRol = async (req, res) => {
    const response = await pool.query('SELECT * FROM rol');
    try{
        res.status(200).json(response.rows);
    }catch(error){
        return res.json({error:error.message});
    }
   
   
}

const getRolbyId = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query ("SELECT * FROM rol WHERE id = $1", [id]);
    res.json(response.rows);

}

const createRol = async (req, res) => {
    const {name} = req.body;
    await pool.query("INSERT INTO rol (name) VALUES ($1)", [name]);
    try{
        res.status(200).json({
        message: "Rol creado correctamente.",
        body: {
            rol: {name}
        }})
    }catch(error){
        return res.json({error:error.message});
    }
    };

    const deleteRol = async (req, res) => {
        const id = req.params.id;
        const response = await pool.query("DELETE FROM rol WHERE id = $1", [id]);
        try {
            res.status(200).json(`Rol ${id} eliminado correctamente.`)
        } catch (error) {
            return res.json({error: error.message});
        }
    }

    module.exports = {
        getRol,
        getRolbyId,
        createRol,
        deleteRol
    }