const NewsItem = require("../models/newsItem");

const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");

const getNewsItem = (req, res, next) => {
  NewsItem.find({})
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
        next(new BadRequestError("Bad Request! Invalid data passed!"));
      } else {
        next(err);
      }
    });
};

const deleteNewsItem = (req, res, next) => {
  const { _id } = req.user;

  NewsItem.findById(req.params.articleId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== _id) {
        next(new ForbiddenError("Reqest was forbidden!"));
      }
      return NewsItem.findByIdAndRemove(req.params.articleId)
        .then(() =>
          res.send({ message: "Item was successfully deleted", item })
        )
        .catch((err) => {
          console.log(err.name);
          if ((err.name = "CastError")) {
            next(new BadRequestError("Bad Request! Invalid data passed!"));
          } else if (err.name === "DocumentNotFoundError") {
            next(
              new NotFoundError(
                "The request was sent to a non-existent address"
              )
            );
          } else {
            next(err);
          }
        });
    });
};

module.exports = { getNewsItem, createNewsItem, deleteNewsItem };
