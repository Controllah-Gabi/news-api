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