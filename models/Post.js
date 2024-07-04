const db = require('./db');

const Post = db.sequelize.define('posts', {
    title: {
        type: db.Sequelize.STRING,
    },
    content: {
        type: db.Sequelize.STRING,
    },
});

module.exports = Post;
