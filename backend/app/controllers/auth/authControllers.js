const { validationResult } = require('express-validator');
const responder = require('../../utils/responder');
const authHelper = require('./authHelper');
function authControllers() {
    return {
        //signup user
        async signUp(req, res) {
            try {
                const error = validationResult(req);
                if (!error.isEmpty()) {
                    console.log(error.array());
                    return responder(res, 400, false, error.array()[0].msg);
                }

                const returnedData = await authHelper().signUp(req);
                if (returnedData?.success) {
                    return responder(res, 201, returnedData.success, returnedData.message);
                }
                return responder(res, 400, false, returnedData?.message);

            } catch (err) {
                return responder(res, 500, false, err.message);
            }
        },
        // signIn
        async signIn(req, res) {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return responder(res, 400, false, 'All fields are required');
                }
                const returnedData = await authHelper().signIn(req);
                if (returnedData?.success) {
                    res.cookie('jwt_token', returnedData.data, {
                        expires: new Date(new Date().getTime() + (5 * 60 * 60 * 1000)),
                        httpOnly: process.env.PROD === 'false' ? false : true,
                        sameSite: process.env.PROD === 'false' ? 'lax' : 'none',
                        secure: process.env.PROD === 'false' ? false : true,
                    }
                    );
                    return responder(res, 200, returnedData.success, returnedData.message);
                }
                return responder(res, 400, false, returnedData?.message);
            } catch (err) {
                return responder(res, 500, false, err.message);
            }
        }
    };
}

module.exports = authControllers;