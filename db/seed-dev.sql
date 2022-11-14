DROP DATABASE IF EXISTS nc_news;
CREATE DATABASE nc_news;

\c nc_news;

CREATE TABLE topics(
    topic_id SERIAL PRIMARY KEY,
    slug VARCHAR(40) NOT NULL,
    description VARCHAR(40) NOT NULL
);

    