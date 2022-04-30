import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Article from "../models/articleModel.js";
import { isAdminOrWriter, isAdmin, isAuth } from "../util.js";

const articleRouter = express.Router();

articleRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const title = req.query.title || "";
    const category = req.query.category || "";
    const writer = req.query.writer || "";
    const titleFilter = title
      ? { title: { $regex: title, $options: "i" } }
      : {};
    const writerFilter = writer ? { writer } : {};
    const categoryFilter = category ? { category } : {};
    const articleList = await Article.find({
      ...writerFilter,
      ...titleFilter,
      ...categoryFilter,
    }).populate("writer");
    res.send(articleList);
  })
);

articleRouter.post(
  "/",
  isAuth,
  isAdminOrWriter,
  expressAsyncHandler(async (req, res) => {
    const article = new Article({
      title: "Sample Title" + Date.now(),
      writer: req.user._id,
      firstName: req.user.firstName,

      category: "Category",
      image1: "/images/profilebackground.jpg",
      paragraph1: "Paragraph 1",
      image2: "",
      paragraph2: "",
    });
    const createdArticle = await article.save();
    res.send({ message: "Article created", article: createdArticle });
  })
);

articleRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id).populate("writer");
    if (article) {
      res.send(article);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

articleRouter.put(
  "/:id",
  isAuth,
  isAdminOrWriter,
  expressAsyncHandler(async (req, res) => {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    if (article) {
      article.title = req.body.title;
      article.category = req.body.category;
      article.image1 = req.body.image1;
      article.paragraph1 = req.body.paragraph1;
      article.image2 = req.body.image2;
      article.paragraph2 = req.body.paragraph2;
      const updatedArticle = await article.save();
      res.send({ message: "Product Updated", article: updatedArticle });
    } else {
      res.status(404).send({ message: "News Not Found" });
    }
  })
);

articleRouter.delete(
  "/:id",
  isAuth,
  isAdminOrWriter,
  expressAsyncHandler(async (req, res) => {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    if (article) {
      const deleteArticle = await article.remove();
      res.send({ message: "Article Deleted", article: deleteArticle });
    } else {
      res.status(404).send({ message: "Article Not Found" });
    }
  })
);

articleRouter.get(
  "/latest",
  expressAsyncHandler(async (req, res) => {
    const articleList = await Article.find({});
    const latest = articleList.reverse();
    res.send(latest);
  })
);

articleRouter.get(
  "/related/:id",
  expressAsyncHandler(async (req, res) => {
    const articleList = await Article.find({});
    const article = await Article.findById(req.params.id);
    const related = articleList.filter((n) => n.category === article.category);

    res.send(related);
  })
);

articleRouter.get(
  "/notrelated/:id",
  expressAsyncHandler(async (req, res) => {
    const articleList = await Article.find({});
    const article = await Article.findById(req.params.id);
    const related = articleList.filter((n) => n.category !== article.category);

    res.send(related);
  })
);
export default articleRouter;
