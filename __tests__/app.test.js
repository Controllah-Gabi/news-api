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
            console.log(res.body)
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
              console.log(res.body)
              expect(res.body).toEqual({msg: "Path not found"})
              })
          })
      })
  })  