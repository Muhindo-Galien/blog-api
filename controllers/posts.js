const createPost = async (req, res) => {
  res.send("createPost");
};

const updatePost = async (req, res) => {
  res.send("updatePost");
};

const deletePost = async (req, res) => {
  res.send("deletePost");
};
const getAllPosts = async (req, res) => {
  res.send("getAllPosts");
};
const getPost = async (req, res) => {
  res.send("getPost");
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPost,
};
