require('dotenv').config();

const express = require("express");

const app = express();


const mongoose = require("mongoose");

const Article = require("./models/article.js");

app.use(express.json());

const MONGO_PASSWORD = process.env.MONGO_PASSWORD

mongoose
    .connect(
        `mongodb+srv://mongo:${MONGO_PASSWORD}@cluster0.yds9dkq.mongodb.net/?appName=Cluster0`
    )
    .then(() => {
        console.log("Connected Succeflly...");
    })
    .catch(() => {
        console.log("Erorr with Connected with DB");
    });

// mongodb+srv://mongo:<db_password>@cluster0.yds9dkq.mongodb.net/?appName=Cluster0

app.listen(3000, () => {
    console.log("I'M Lestin to Port 3000!");
});

app.get("/hello", (req, res) => {
    res.render("hello.ejs", {
        name: "Omar",
        age: 25,
    });
});

app.get("/hi", (req, res) => {
    let numbers = "";
    for (let i = 0; i < 100; i++) {
        numbers += i + "-";
    }

    res.send(`the numbers are:${numbers}`);
});

app.post("/addComment", (req, res) => {
    res.send("Post request to add Comment");
});

app.get("/findSum/:num1/:num2", (req, res) => {
    const sum = +req.params.num1 + +req.params.num2;
    res.send(sum.toString());
});

// ========== Articals Endpoints ==========
app.post("/articals", async (req, res) => {
    const newArticle = new Article();

    newArticle.title = req.body.title;
    newArticle.body = req.body.body;
    newArticle.liks = req.body.liks;

    await newArticle.save();

    res.json(newArticle);
});

app.get("/articals", async (req, res) => {
    const articles = await Article.find({});
    res.json(articles);
});

app.get("/articals/:articleID", async (req, res) => {
    const id = req.params.articleID;
    const article = await Article.findById(id);
    res.json(article);
});

app.delete("/articals/:articleID", async (req, res) => {
    const id = req.params.articleID;
    const article = await Article.findByIdAndDelete(id);
    res.send("Article Deleted Sucess");
});
