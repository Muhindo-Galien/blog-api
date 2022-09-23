const express = require("express");
const auth = require("../middleware/authentication");
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPost,
} = require("../controllers/posts");
const router = express.Router();

router.get('/',getAllPosts)
router.post('/add',auth, createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.get('/:id',auth, getPost);


module.exports = router;
