const responder = require('../../utils/responder');
const userHelper = require('./userHelper');

function userController(){
    return{
        // User Info
        async getUserInfo(req, res){
            try{
                
                const returnedData = await userHelper().getUserInfo(req);
                if(returnedData.success){
                    return responder(res, 200, returnedData.success, returnedData.message, returnedData.data);
                }
                return responder(res, 400, false, returnedData.message);
            }catch(err){
                console.log(err);
                return responder(res, 500, false, err.message);
            }
        }
    };
}

module.exports = userController;