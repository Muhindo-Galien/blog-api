const mongoose = require("mongoose");

// const { ObjectId } = mongoose;
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      maxlength: 150,
    },
    image: {
      type: String,
      required: [true, "Please provide an image"],
    },
    cloudinary_id: {
      type: String,
      required: [true, "Please provide cloudinary id"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
