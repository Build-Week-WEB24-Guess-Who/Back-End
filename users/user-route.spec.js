const server = require("../index.js");
const db = require("../data/dbconfig.js");
const request = require("supertest");

describe ("sanity check to prep for testing", () => {
    beforeEach( () => {
        db("users").truncate();
        request(server).post("/api/auth/register").send({ username: "fish", password: "alsofish"})
    })
})

// afterEach(function (done) {
//     trx.rollback().then(function () {
//       done();
//     });
//   });

//get user info



/***********ADD TEST HERE************* */

/*********games functionality******************/

describe ("games", () => {
    it ("should return a 200 and resolve itself", () => {
        const response = request(server)
        .post("/api/login")
        .send({
            username: "fish",
            password: "alsofish"
        })

        const finalResponse = request(server)
            .get("/api/games")
            .set("Authorization", response.body.token)
        
            expect(finalResponse.status).toBe(200)
            expect(finalResponse).toBeResolved();
    })
}) 

describe("mygames", () => {
    it ("should return a 200 and resolve itself", () => {
        const response = request(server)
            .post("/api/login")
            .send({
                username: "fish",
                password: "alsofish"
            })
        const finalResponse = request(server)
            .get("./api/mygames")
            .set("Authorization", response.body.token)

            expect(finalResponse.status).toBe(200);
            expect(finalResponse).toBeResolved();
    })
})



describe("add a game", () => {
    const response = request(server)
    .post("/api/login")
    .send({
        username: "fish",
        password: "alsofish"
    })

    const finalResponse = request(server)
        .post("api/games")
        .set("Authorization", response.body.token)
        .send({
            game_name: "beepbopboop",
            instigator_id: 1
        })

        expect(finalResponse.status).toBe(200);
        expect(finalResponse).toBeResolved();
})

describe("get game by id", () => {
    const response = request(server)
    .post("/api/login")
    .send({
        username: "fish",
        password: "alsofish"
    })

    const finalResponse = request(server)
        .get("/api/games/:id")
        .set("Authorization", response.body.token)
        
        expect(finalResponse.status).toBe(200);
})

//users and games
describe("add a user to the game", () => {
    it ("add a user", () => {
        const response = request(server)
            .post("/api/login")
            .send({
                username: "fish",
                password: "alsofish"
            })

        const finalResponse = request(server)
            .post("/api/games")
            .set("Authorization", response.body.token)
            .send({
                username: "bob"
            })

            expect(finalResponse.status).toBe(200);
            expect(finalResponse).toBeResolved()
    })

})