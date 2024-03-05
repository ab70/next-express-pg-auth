const responder = require('../../utils/responder');
const userHelper = require('./userHelper');

function userController() {
    return {
        // User Info
        async getUserInfo(req, res) {
            try {

                const returnedData = await userHelper().getUserInfo(req);
                if (returnedData.success) {
                    return responder(res, 200, returnedData.success, returnedData.message, returnedData.data);
                }
                return responder(res, 400, false, returnedData.message);
            } catch (err) {
                console.log(err);
                return responder(res, 500, false, err.message);
            }
        },
        // Visit profile
        async visitProfile(req, res) {
            try {
                const returnedData = await userHelper().visitProfile(req);
                if (returnedData.success) {
                    return responder(res, 200, returnedData.success, returnedData.message, returnedData.data);
                }
                return responder(res, 400, false, returnedData.message);
            } catch (err) {
                console.log(err);
                return responder(res, 500, false, err.message);
            }
        },

        // All user with viewCount
        async getAllUserWithViewCount(req, res) {
            try {
                const returnedData = await userHelper().getAllUserWithViewCount();
                if (returnedData.success) {
                    return responder(res, 200, returnedData.success, returnedData.message, returnedData.data);
                }
                return responder(res, 400, false, returnedData.message);
            } catch (err) {
                console.log(err);
                return responder(res, 500, false, err.message);
            }
        },
        // All user with viewCount
        async getAllUsers(req, res) {
            try {
                const returnedData = await userHelper().getAllUsers();
                if (returnedData.success) {
                    return responder(res, 200, returnedData.success, returnedData.message, returnedData.data);
                }
                return responder(res, 400, false, returnedData.message);
            } catch (err) {
                console.log(err);
                return responder(res, 500, false, err.message);
            }
        }

    };
}
module.exports = userController;