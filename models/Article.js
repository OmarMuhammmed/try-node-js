const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const articleScheme = new Scheme({
    title: String,
    body: String,
    liks: Number
});

const Article = mongoose.model("Article", articleScheme);

module.exports = Article;
