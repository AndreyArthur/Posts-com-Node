import PostModel from '../models/post.js';

class ApplicationError {
    /**
     * @param {string} message
     */
    constructor(message)  {
        /**
         * @type {string}
         * @public
         */
        this.message = message;
    }
}

/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {string} title
 * @property {number} content
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @returns {Promise<Post[]>}
 */
async function findAll() {
    const data = await PostModel.findAll({order: [['id', 'DESC']]});
    const posts = data.map((item) => item.dataValues);
    return posts;
}

/**
 * @param {string} title
 * @param {string} content
 * @throws {ApplicationError}
 * @returns {Promise<void>}
 */
async function create(title, content) {
    if (title.length < 4 || title.length > 64) {
        throw new ApplicationError('Post title must have 4-64 characters.');
    }

    if (content.length < 4 || content.length > 255) {
        throw new ApplicationError('Post content must have 4-255 characters.');
    }

    try {
        await PostModel.create({title, content});
    } catch {
        throw new ApplicationError('There was an error, post was not created.');
    }
}

/**
 * @param {number} id
 * @returns {Promise<void>}
 */
async function del(id) {
    await PostModel.destroy({where: {id}});
}

const PostService = {
    findAll,
    create,
    delete: del,
};

export default PostService;
