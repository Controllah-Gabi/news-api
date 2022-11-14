const express = require('express');

const {
    articleData,
    commentData,
    topicData,
    userData
} = require('./db/data/development-data/index.js')

const app = express();
app.use(express.json());
