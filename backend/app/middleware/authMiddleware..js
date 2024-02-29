const jwt = require('jsonwebtoken');
// const User = require('../models/user');
const responder = require('../utils/responder');

const checkUser = async (req, res, next) => {
    try {

        const token = await req.cookies.jwt_token;

        if (!token) {
            return responder(res, 401, false, 'Unauthorized');
        }
        // eslint-disable-next-line no-unused-vars
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                return responder(res, 401, false, 'Unauthorized');
            }
            // for Zero trust architecture we need to check if the user is in the db on not(important for multi-tenant system) using the decodedToken
            const userInfo = req.session.user;
            if(userInfo){
                // chaining user data to this request
                req.userData = userInfo;
                next();
            }else{
                return responder(res, 403, false, 'User validation failed');
            }
        });
    } catch (err) {
        console.log(err);
        return responder(res, 401, err.message);
    }
};
module.exports = {checkUser};