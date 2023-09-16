const jwt = require("jsonwebtoken");

function jwtTokens({id, name, email}){
    const user = {id, name, email};
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '60m'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,{expiresIn: '3d'});
    return ({accessToken, refreshToken});

}

module.exports =  {jwtTokens};