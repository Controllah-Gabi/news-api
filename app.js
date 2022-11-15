const express = require('express');
const { getTopics } = require('./controllers/topics.js');
const {getArticles,getArticlesByID} = require('./controllers/articles.js')


const app = express();
//app.use(express.json());

app.get('/api/topics',getTopics);
app.get('/api/articles',getArticles);
app.get('/api/articles/:article_id',getArticlesByID);

app.all("/*",(req,res)=>{
    res.status(404).send({msg: "Path not found"})
})

module.exports = app;