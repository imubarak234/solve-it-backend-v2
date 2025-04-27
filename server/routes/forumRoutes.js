const forumController = require('../controllers/forumController.js');
const apiLimiter = require('../middlewares/rateLimiter');
const express = require('express');

const router = express.Router();

router.post('/createForum', apiLimiter, forumController.createForum);
router.put('/updateForum', apiLimiter, forumController.updateForum);
router.get('getForum', apiLimiter, forumController.getForums);
router.post('/createForumCategory', apiLimiter, forumController.createForumCategory);
router.put('/updateForumCategory', apiLimiter, forumController.updateForumCategory);
router.get('/getForumCategories', apiLimiter, forumController.getForumCategories);
router.post('/createForumJoinRequest', apiLimiter, forumController.createForumJoinRequest);
router.put('/updateForumJoinRequest', apiLimiter, forumController.updateForumJoinRequest);
router.get('/getForumJoinRequests', apiLimiter, forumController.getForumJoinRequests);
router.put('/leaveForum', apiLimiter, forumController.leaveForum);


module.exports = router;
