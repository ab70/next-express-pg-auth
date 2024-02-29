const authRoute = require('./authRoute/authRoute');
const userRoute=require('./userRoute/userRoute');
function initRoutes(app) {
    // Auth routes
    app.use('/api/auth', authRoute);
    // User routes
    app.use('/api/user',userRoute);

    
    // Error handling
    app.use('/*', (req, res) => {
        return res.status(500).json({ success: false, message: 'Server error' });
    });
}

module.exports = initRoutes;
