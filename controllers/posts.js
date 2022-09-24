const Post = require("../models/post");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const createPost = async (req, res) => {
  const { title, description } = req.body;
  const { path } = req.file;
  // upload image to cloudinary
  const result = await cloudinary.uploader.upload(path);
  // create new user
  let post = new Post({
    title: title,
    description: description,
    image: result.secure_url,
    cloudinary_id: result.public_id,
  });
  post.createdBy = req.user.userId;
  await post.save();
  // removed the uploaded image from the uploads folder
  fs.unlinkSync(path);
  res.status(StatusCodes.CREATED).json(post);
};

const updatePost = async (req, res) => {
  const {
    user: { userId },
    params: { id: postId },
  } = req;
  let post = await Post.findOne({ _id: postId, createdBy: userId });
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  await cloudinary.uploader.destroy(post.cloudinary_id);
  let result;
  // if we want to update the image then we check
  if (req.file) {
    const { path } = req.file;
    result = await cloudinary.uploader.upload(path);
  }

  const data = {
    title: req.body.title || post.title,
    description: req.body.description || post.description,
    image: result?.secure_url || post.image,
    cloudinary_id: result?.public_id || post.cloudinary_id,
  };
  post = await Post.findByIdAndUpdate(postId, data, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ post });
  if (req.file) {
    fs.unlinkSync(path);
  }
};

const deletePost = async (req, res) => {
  const {
    user: { userId },
    params: { id: postId },
  } = req;

  const post = await Post.findOne({
    _id: postId,
    createdBy: userId,
  });

  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  // delete the the picture from cloudinary using the cloudinary_id
  await cloudinary.uploader.destroy(post.cloudinary_id);
  // remove the contact from the database
  await post.remove();

  res.status(StatusCodes.OK).send(`Post successfully deleted`);
};
const getAllPosts = async (req, res) => {
  const posts = await Post.find({});
  res.status(StatusCodes.OK).json({ posts: posts, count: posts.length });
};
const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "createdBy",
    "_id name"
  );
  res.status(StatusCodes.OK).json(post);
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPost,
};
