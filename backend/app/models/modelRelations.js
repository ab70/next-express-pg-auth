const User = require('./user');
const ViewCount = require('./viewCount');
// creating one to one relation
User.hasOne(ViewCount, { foreignKey: 'userId' });
ViewCount.belongsTo(User, { foreignKey: 'userId' });