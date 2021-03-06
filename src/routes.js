const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const Post = require("./models/post");

routes.get("/posts", async (req, res) => {
  const post = await Post.find();

  return res.json(post);
});

routes.post(
  "/posts",
  multer(multerConfig).single("file"),
  async ({ file }, res) => {
    const { originalname: name, size, location: url = "", key } = file;

    const post = await Post.create({
      name,
      size,
      key,
      url,
    });

    return res.json(post);
  }
);

routes.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  await post.remove();

  return res.send();
});

module.exports = routes;
