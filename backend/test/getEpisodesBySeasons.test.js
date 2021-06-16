const request = require("supertest");
// app is supposed to point to the app.js file
const app = require("../web");
var assert = require("assert");
var chai  = require("chai")

describe("Testing get all episodes by seasons endpoint ", () => {
    it("respond with valid HTTP status code", (done) => {
        request(app.app)
            .get("/startrek/api/1.0.0/seasons/episodes")
            .expect(200, done);
    });

    it("check if  data exists",async () => {
       
        response =    await request(app.app)
            .get("/startrek/api/1.0.0/seasons/episodes")
            response.body.forEach(element => {
              chai.expect(element.seasonNumber).exist
              chai.expect(element.episodes).exist
              chai.expect(element.episodes[0].episodeUid).exist
              chai.expect(element.episodes[0].episodeTitle).exist
              chai.expect(element.episodes[0].episodeNumber).exist
              chai.expect(element.episodes[0].episodeSerialNumber).exist
            })
    });

    it("check if  data has a valide types",async () => {
       
      response =    await request(app.app)
          .get("/startrek/api/1.0.0/seasons/episodes")
          response.body.forEach(element => {
            chai.expect(element.seasonNumber).to.be.a("number")
            chai.expect(element.episodes).to.be.an("array")
            chai.expect(element.episodes[0].episodeUid).to.be.a("string")
            chai.expect(element.episodes[0].episodeTitle).to.be.a("string")
            chai.expect(element.episodes[0].episodeNumber).to.be.a("number")
            chai.expect(element.episodes[0].episodeSerialNumber).to.be.a("string")
          });
        
  });


});
