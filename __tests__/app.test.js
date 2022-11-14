const request = require("supertest");
const app = require("../app.js")
const pool = require("../db/connection")



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
                        topic_id: expect.any(Number),
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