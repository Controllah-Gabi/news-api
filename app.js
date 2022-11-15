const express = require('express');
const { getTopics } = require('./controllers/topics.js');
const {getArticles} = require('./controllers/articles.js')
const {
    articleData,
    commentData,
    topicData,
    userData
} = require('./db/data/development-data/index.js')

const app = express();
//app.use(express.json());

app.get('/api/topics',getTopics);
app.get('/api/articles',getArticles);

app.all("/*",(req,res)=>{
    res.status(404).send({msg: "Path not found"})
})

module.exports = app;