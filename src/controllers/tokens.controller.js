const {pool} = require ("../pg");





const getTokens = async (req, res) => {
    const response = await pool.query('SELECT * FROM tokens');
    try{
        res.status(200).json(response.rows);
    }catch(error){
        return res.json({error:error.message});
    }
   
   
}

module.exports={
    getTokens
}