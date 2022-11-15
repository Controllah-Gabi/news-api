const express = require('express');
const { getTopics } = require('./controllers/topics.js');
const {getArticles,getArticleByID} = require('./controllers/articles.js')


const app = express();
//app.use(express.json());

app.get('/api/topics',getTopics);
app.get('/api/articles',getArticles);
app.get('/api/articles/:article_id',getArticleByID);

app.all("/*",(req,res)=>{
    res.status(404).send({msg: "Path not found"})
})

module.exports = app;