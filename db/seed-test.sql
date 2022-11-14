DROP DATABASE IF EXISTS nc_news_test;
CREATE DATABASE nc_news_test;

\c nc_news_test;

CREATE TABLE topics(
    topic_id SERIAL PRIMARY KEY,
    slug VARCHAR(40) NOT NULL,
    description VARCHAR(40) NOT NULL
);