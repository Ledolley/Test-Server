const {pool} = require ("../pg");






const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users');
    try{
        res.status(200).json(response.rows);
    }catch(error){
        return res.json({error:error.message});
    }
   
   
}

const getUserbyId = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query ("SELECT * FROM users WHERE id = $1", [id]);
    res.json(response.rows);

}

const createUser = async (req, res) => {
    const {name, email, password} = req.body;
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    //Email check
    if (users.rows.length !== 0)return res.status(401).json({error: "El correo ingresado ya existe."});
    await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, crypt($3, gen_salt('bf')))", [name, email, password]);
    try{
        res.status(200).json({
        message: "Usuario creado correctamente.",
        body: {
            user: {name, email}
        }})
    }catch(error){
        return res.json({error:error.message});
    }
    };


const updateUser = async (req, res) => {
    const id = req.params.id;
    const {name, lastName, email, password, university, birthDate} = req.body;
    const response = await pool.query("UPDATE users SET name = $1, lastName = $2, email = $3, password = crypt($4, gen_salt('bf')), university = $5, birthDate = $6 WHERE id = $7",
    [name, lastName, email, password, university, birthDate, id]);
    try{
        res.status(200).json({
        message: "Usuario actualizado correctamente.",
        body: {
            user: {name, lastName, email, password, university, birthDate}
        }})
    }catch(error){
        return res.json({error:error.message});
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    try{
        res.status(200).json(`Usuario ${id} eliminado correctamente.`);
    }catch(error){
        return res.json({error:error.message});
    }

}





module.exports = {
    getUsers,
    getUserbyId,
    createUser,
    updateUser,
    deleteUser
}