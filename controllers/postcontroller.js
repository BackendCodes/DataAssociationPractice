const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

const createPost = async (req, res) => {
  const { title, content } = req.body;

  //   basic validation
  if (!title || !content) {
    return res.json({
      message: "all fields are required",
    });
  }

  try {
    const { userid } = req.user;

    const createPost = await postModel.create({
      title,
      content,
      user: userid,
    });

    const updateuser = await userModel
      .findById(userid)
      .select("-password")

    updateuser.posts.push(createPost._id);
    await updateuser.save();

    res.redirect("/allpostsuser");
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports = createPost;
