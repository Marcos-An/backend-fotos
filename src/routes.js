const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const Post = require('./models/post')


routes.get("/", (req, res) => {
  return res.json({  hello: "World"})
})

routes.post("/posts", multer(multerConfig).single('file') , async ({file}, res) => {

  const post = await Post.create({
    name: file.originalname,
    size: file.size, 
    key: file.filename,
    url: ''
  })
  return res.json(post)
})


module.exports = routes