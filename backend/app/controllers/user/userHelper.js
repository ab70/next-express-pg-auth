function userHelper() {
    return{
        // User Info
        async getUserInfo(req){
            try{
                const userData = req.userData;
                return {success: true, message: 'User info fetched successfully', data: userData};
            }catch(err){
                return{
                    success: false,
                    message: err.message
                };
            }
        }
    };
}

module.exports = userHelper;