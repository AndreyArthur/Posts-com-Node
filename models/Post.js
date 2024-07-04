import * as db from './db.js';

const Post = db.sequelize.define('posts', {
    title: {
        type: db.Sequelize.STRING,
    },
    content: {
        type: db.Sequelize.STRING,
    },
});

export default Post;
