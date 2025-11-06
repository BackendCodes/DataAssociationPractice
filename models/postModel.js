
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId
  }
}, { timestamps: true });

const Post = mongoose.model('post', postSchema);

module.exports = Post;