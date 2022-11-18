const express = require('express');
const { getTopics } = require('./controllers/topics.js');
const {getArticles,getArticleByID, patchArticleByArticleId} = require('./controllers/articles.js');
const { getCommentsByID, postComment } = require('./controllers/comments');


const app = express();
app.use(express.json());

//get requests 
app.get('/api/topics',getTopics);
app.get('/api/articles',getArticles);
app.get('/api/articles/:article_id',getArticleByID);
app.get('/api/articles/:article_id/comments',getCommentsByID);
// post requets
app.post('/api/articles/:article_id/comments',postComment);

// patch requests
app.patch('/api/articles/:article_id',patchArticleByArticleId)

//errors
app.use((err,req,res,next)=>{
    if(err.status !== undefined && err.msg !== undefined){
        res.status(err.status).send({msg: err.msg})
    }else{
        next(err);
    }
})

app.use((err,req,res,next)=>{
    if(err.code === "23502"){
        res.status(404).send({msg: err.msg})
    }else{
        next(err);
    }
})

app.use((err,req,res,next)=>{
    if(err.code === "22P02"){
        res.status(400).send({msg: "Bad request"})
    }else{
        next(err);
    }
})

app.all("/*",(req,res)=>{
    res.status(404).send({msg: "Path not found"})
})

module.exports = app;