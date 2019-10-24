const server = require("./index.js");
const request = require("supertest");

let token;
beforeAll((done) => {
    request(server)
        .post("/login")
        .send({
            username: user,
            password: pw
        })
        .end((err, response) => {
            token = response.body.token;
            done()
        })
})

describe ("games", () => {
    it ("should return a 200", async () => {
        const expectedStatusCode = 200;
        const response = await request(server).get("/api/games")
        expect(response.status).toBe(expectedStatusCode)
    })
}) 

describe("mygames")

describe("")