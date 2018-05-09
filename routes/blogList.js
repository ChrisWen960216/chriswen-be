/** Created By ChrisWen
 *  2018/05/04
 *  BlogLists Router
 */

const express = require('express');

const router = express.Router();

const { getDataByFilter } = require('../common/filter');
const status = require('../common/status');

const ResponseExtend = require('../extends/response');
const BlogList = require('../controller/blogList');
const Blog = require('../lib/blog');
const BlogListService = require('../service/blogList');

// 获取全部博客
router.get('/', (request, response, next) =>
  new Blog()
    .retrieveBlogsByCondition()
    .then(_res => getDataByFilter(request.query.filter, _res))
    .then(_filterRes => new BlogListService(_filterRes).modifyBlogListForDate())
    .then(blogList => ResponseExtend.createResData(status.OPS_SUCCESS, '获取成功', blogList))
    .then(resData => response.json(resData))
    .catch(next));


// 根据种类获得博客
router.get('/:speciesId', (request, response, next) =>
// getSpeciseId => getSpeciesBlogs => Response
  new BlogList(request)
    .getSpeciesId()
    .then(speciesId => new Blog({ species: speciesId }).retrieveBlogListBySpecies())
    .then(blogList => ResponseExtend.createResData(status.OPS_SUCCESS, '获取成功', blogList))
    .then(resData => response.json(resData))
    .catch(next));


module.exports = router;
