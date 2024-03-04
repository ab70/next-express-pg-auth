const User = require('../../models/user');
const ViewCount = require('../../models/viewCount');
function userHelper() {
    return {
        // User Info
        async getUserInfo(req) {
            try {
                const userData = req.userData;
                return { success: true, message: 'User info fetched successfully', data: userData };
            } catch (err) {
                return {
                    success: false,
                    message: err.message
                };
            }
        },
        // Visit profile
        async visitProfile(req) {
            try {
                // const userData = req.userData;
                const findUser = await User.findByPk(req.params.id);
                if (!findUser) {
                    return { success: false, message: 'User not found' };
                }
                const findViews = await ViewCount.findOne({ where: { userId: req.params.id } });
                let totalViews = 0;
                if (!findViews) {
                    await ViewCount.create({
                        userId: req.params.id,
                        viewCount: 1
                    });
                    totalViews = 1;
                } else {
                    // add a check to see if logged in user === profile user then dont increment the value
                    await ViewCount.update({
                        viewCount: findViews.dataValues.viewCount + 1
                    }, {
                        where: { userId: req.params.id }
                    });
                    totalViews = findViews.dataValues.viewCount + 1;
                }
                return { success: true, message: 'Profile visited successfully', data: { ...findUser.dataValues, totalViews } };
            } catch (err) {
                console.log(err);
                return {
                    success: false,
                    message: err.message
                };
            }
        },
        // All user with viewCount
        async getAllUserWithViewCount() {
            try {
                const userData = await User.findAll({
                    attributes: ['id', 'userName', 'email', 'createdAt'],
                    include: {
                        model: ViewCount,
                        attributes: ['viewCount'],
                    }
                });
                return { success: true, message: 'User info fetched successfully', data: userData };
            } catch (err) {
                return {
                    success: false,
                    message: err.message
                };
            }
        }
    };
}

module.exports = userHelper;