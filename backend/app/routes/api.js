const authRoute = require('./authRoute/authRoute');

function initRoutes(app) {
    app.use('/api/auth', authRoute);

    app.use('/*', (req, res) => {
        return res.status(500).json({ success: false, message: 'Server error' });
    });
}

module.exports = initRoutes;
