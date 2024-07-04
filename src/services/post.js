import PostModel from '../models/post.js';

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
    const posts = await PostModel.findAll({order: [['id', 'DESC']]});
    return posts;
}

/**
 * @param {string} title
 * @param {string} content
 * @returns {Promise<void>}
 */
async function create(title, content) {
    await PostModel.create({title, content});
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
