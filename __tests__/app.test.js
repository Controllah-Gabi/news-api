const request = require("supertest");
const app = require("../app.js")
const pool = require("../db/connection")
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

beforeEach(() => seed(testData));

afterAll(() => {
  if (pool.end) pool.end();
});

describe("GET/api/topics",()=>{
    test('should return all topics', () => { 
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res)=>{
            expect(res.body.topic).toBeInstanceOf(Array);
            res.body.topic.forEach((topic)=>{
                expect(topic).toEqual(
                    expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String),
                    })
                )
            })
        })
    });
  describe("GET/api/topic return error message",()=>{
      test('should return 404 error if there is a spelling mistake', () => { 
          return request(app)
          .get("/api/topic")
          .expect(404)
          .then((res)=>{
              expect(res.body).toEqual({msg: "Path not found"})
              })
          })
      })
  })  

  describe('4. GET /api/articles',()=>{
    test('returns 200 with all articles data',()=>{
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then((data)=>{
            expect(data.body.articles).toBeInstanceOf(Array);
            expect(data.body.articles.length).toBeGreaterThan(0)
            data.body.articles.forEach((element)=>{
                expect(element).toEqual(
                    expect.objectContaining({
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                    })
                )
            })
        })
    })
  })

  describe("GET/api/articl return error message",()=>{
    test('should return 404 error if there is a spelling mistake', () => { 
        return request(app)
        .get("/api/articl")
        .expect(404)
        .then((res)=>{
            expect(res.body).toEqual({msg: "Path not found"})
            })
        })
    })

describe("5. GET /api/articles/:article_id",()=>{
    test('should return 200 with the article with the specified id',()=>{
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(data=>{
            expect(data.body.article[0]).toEqual(
                {
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: '2020-07-09T20:11:00.000Z',
                votes: 100
      })
        })
    })
    test("should return error message if id is invalid",()=>{
        return request(app)
        .get("/api/articles/1000")
        .expect(404)
        .then(data=>{
            expect(data.body.msg).toBe("Invalid ID")
        })
    })
})

describe("/api/articles/:article_id/comments",()=>{
    test('should return all comment of the specified article', () => { 
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(data=>{
            expect(data.body.comments).toBeInstanceOf(Array);
            expect(data.body.comments.length).toBeGreaterThan(0)
            data.body.comments.forEach(element=>{
                expect(element).toEqual(
                    expect.objectContaining({
                        comment_id: expect.any(Number),
                        body: expect.any(String),
                        article_id: 1,
                        author: expect.any(String),
                        votes: expect.any(Number),
                        created_at: expect.any(String)
                    })
                )
            })

        })
        })
        test("should return empty array if article exists but there are no comments",()=>{
            return request(app)
            .get("/api/articles/12/comments")
            .expect(200)
            .then(data=>{
                expect(data.body.comments).toEqual([])
            })
        })

        test("should return error message if spelling mistake",()=>{
            return request(app)
            .get("/api/articles/12/comment")
            .expect(404)
            .then(data=>{
                expect(data.body.msg).toBe("Path not found")
            })
        })

        test("should return error message if article does not exist. 999 test",()=>{
            return request(app)
            .get("/api/articles/999/comments")
            .expect(404)
            .then(data=>{
                expect(data.body.msg).toBe("Invalid ID")
            })
        })

        test("/api/articles/sports/comments this is when the article id is not a number",()=>{
            return request(app)
            .get("/api/articles/sports/comments")
            .expect(404)
            .then((data)=>{
                expect(data.body.msg).toBe("Invalid ID")
            })
        })
    })

    describe("7. POST /api/articles/:article_id/comments",()=>{
        const commentData = {
            author: "icellusedkars",
            body: "dam, did you see what heskey did",
        }
        test("post valid comment should return with 200, the comment with a unique id",()=>{
            return request(app)
            .post("/api/articles/1/comments")
            .send(commentData)
            .expect(200)
            .then(data=>{
                expect(data.body.comment).toEqual(expect.objectContaining({
                    body: "dam, did you see what heskey did",
                    article_id: 1,
                    username: "icellusedkars",
                    comment_id: 19,
                    created_at: expect.any(String)
                }))
            })
        })
        test("POST /api/articles/:article_id/comments when username does not exist",()=>{
            const commentData = {
                author: "heskey",
                body: "dam, did you see what heskey did",
            }
            return request(app)
            .post("/api/articles/1/comments")
            .send(commentData)
            .expect(404)
            .then((data)=>{
                expect(data.body.msg).toBe("Username does not exist")
            })
        })
        test("POST /api/articles/:article_id/comments when article does not exist",()=>{
            const commentData = {
                author: "icellusedkars",
                body: "dam, did you see what heskey did",
            }
            return request(app)
            .post("/api/articles/1000/comments")
            .send(commentData)
            .expect(404)
            .then((data)=>{
                expect(data.body.msg).toBe("Invalid ID")
            })
        })
        test("POST /api/articles/:article_id/comments when article_id is string",()=>{
            const commentData = {
                author: "icellusedkars",
                body: "dam, did you see what heskey did",
            }
            return request(app)
            .post("/api/articles/sports/comments")
            .send(commentData)
            .expect(404)
            .then((data)=>{
                expect(data.body.msg).toBe("Invalid ID")
            })
        })
        test("POST /api/articles/:article_id/comments when post missing username",()=>{
            const commentData = {
                body: "dam, did you see what heskey did",
            }
            return request(app)
            .post("/api/articles/1/comments")
            .send(commentData)
            .expect(404)
            .then((data)=>{
                expect(data.body.msg).toBe("Missing field")
            })
        })
        test("POST /api/articles/:article_id/comments when post is empty object",()=>{
            const commentData = {
            }
            return request(app)
            .post("/api/articles/1/comments")
            .send(commentData)
            .expect(404)
            .then((data)=>{
                expect(data.body.msg).toBe("Missing field")
            })
        })
    })

    describe("PATCH /api/articles/:article_id",()=>{
        test("increments votes by 2 when passed an inc_votes:2",()=>{
            return request(app)
            .patch('/api/articles/1')
            .send({inc_votes: 2})
            .expect(201)
            .then(({body})=>{
                expect(body.articles).toEqual(
                    {
                        article_id: 1,
                        title: 'Living in the shadow of a great man',
                        topic: 'mitch',
                        author: 'butter_bridge',
                        body: 'I find this existence challenging',
                        created_at: '2020-07-09T20:11:00.000Z',
                        votes: 102
                      }
                )
            })
        })

        test("returns 404 error when article ID is invalid but is an integer",()=>{
            return request(app)
            .patch('/api/articles/100000')
            .send({inc_votes: 2})
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe("Invalid ID")
            })
        })

        test("returns 404 error when article ID is not found",()=>{
            return request(app)
            .patch('/api/articles/sports')
            .send({inc_votes: 2})
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe("Bad request")
            })
        })

        test("returns 404 error when there is a spelling mistake",()=>{
            return request(app)
            .patch('/api/article/1')
            .send({inc_votes: 2})
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("Path not found")
            })
        })

        test("returns 400 error when increment is NaN",()=>{
            return request(app)
            .patch('/api/articles/1')
            .send({inc_votes: "hello"})
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe("Bad request")
            })
        })

        test("returns 400 error when inc_votes is not used",()=>{
            return request(app)
            .patch('/api/articles/1')
            .send({inc_: 1})
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe("Bad request")
            })
        })
    })