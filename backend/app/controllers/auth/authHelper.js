const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function authHelper() {
    return {
        // signUp
        async signUp(req) {
            try {
                const { userName, email, password } = req.body;
                const findUser = await User.findOne({ where: { email: email } });
                if (findUser) {
                    return { success: false, message: 'User already exists' };
                }
                console.log('saltvalue', process.env.SALT_VALUE);
                const hashedPass = await bcrypt.hashSync(password, 10);
                const saveUser = await User.create({
                    userName,
                    email,
                    password: hashedPass
                });
                return saveUser ? { success: true, message: 'User signup successful!' } : { success: false, message: 'Failed to save user' };

            } catch (err) {
                console.log(err);
                return { success: false, message: err.message };
            }
        },
        // signIn
        async signIn(req) {
            try {
                const user = await User.findOne({ where: { email: req.body.email } });
                if (user) {
                    const isMatch = await bcrypt.compareSync(req.body.password, user.password);
                    if (!isMatch) {
                        return { success: false, message: 'Invalid credentials!' };
                    }
                    const token = jwt.sign({ id: user.dataValues.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    // eslint-disable-next-line no-unused-vars
                    const { password, ...others } = user.dataValues;
                    req.session.user = others;
                    return { success: true, message: 'User login successful!', data: token };
                } else {
                    return { success: false, message: 'User does not exist!' };
                }
            } catch (err) {
                return { success: false, message: err.message };
            }
        }
    };
}

module.exports = authHelper;
