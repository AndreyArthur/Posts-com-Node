import * as db from './db.js';

const PostModel = db.sequelize.define('posts', {
    title: {
        type: db.Sequelize.STRING,
    },
    content: {
        type: db.Sequelize.STRING,
    },
});

export default PostModel;
