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
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
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