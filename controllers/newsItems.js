const NewsItem = require("../models/newsItem");

const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");
const { RESPONSE_MESSAGES, ERROR_MESSAGES } = require("../utils/constants");

const getNewsItem = (req, res, next) => {
  NewsItem.find({ owner: req.user._id })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.log(err.name);
      next(err);
    });
};

const createNewsItem = (req, res, next) => {
  const { _id } = req.user;
  const { keyword, title, text, date, source, link, image } = req.body;
  NewsItem.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: _id,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.log(err.name);
      if (err.name === "ValidationError") {
        next(new BadRequestError(ERROR_MESSAGES.INVALID));
      } else {
        next(err);
      }
    });
};

const deleteNewsItem = (req, res, next) => {
  const { _id } = req.user;

  NewsItem.findById(req.params.articleId)
    .select("+owner")
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== _id) {
        return next(new ForbiddenError(ERROR_MESSAGES.FORBIDDEN));
      }
      return NewsItem.findByIdAndRemove(req.params.articleId).then(() =>
        res.send({ message: RESPONSE_MESSAGES.ITEM_DELETED, item })
      );
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === "CastError") {
        next(new BadRequestError(ERROR_MESSAGES.INVALID));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND));
      } else {
        next(err);
      }
    });
};

module.exports = { getNewsItem, createNewsItem, deleteNewsItem };
