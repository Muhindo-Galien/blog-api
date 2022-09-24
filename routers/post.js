const express = require("express");
const auth = require("../middleware/authentication");
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPost,
} = require("../controllers/posts");
const upload = require("../middleware/multer");
const router = express.Router();

router.get('/',getAllPosts)
router.post('/add',auth,upload.single('image'), createPost);
router.patch('/:id',auth,upload.single('image'),updatePost);
router.delete('/:id',auth,upload.single('image'),deletePost);
router.get('/:id',auth, getPost);


module.exports = router;
