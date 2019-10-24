const server = require("../index.js");
const db = require("../data/dbconfig.js");
const request = require("supertest");

describe ("sanity check to prep for testing", () => {
    beforeEach(async () => {
        await db("users").truncate();
        await request(server).post("/api/auth/register").send({ username: "mo", password: "alsomo"})
    })
})

describe ("games", () => {
    it ("should return a 200 and resolve itself", async () => {
        const response = await request(server)
        .post("/api/login")
        .send({
            username: "mop",
            password: "alsomop"
        })

        const finalResponse = await request(server)
            .get("/api/games")
            .set("Authorization", response.body.token)
        
            expect(finalResponse.status).toBe(200)
            expect(finalResponse).toBeResolved();
    })
}) 

describe("mygames", () => {
    it ("should return a 200 and resolve itself", async () => {
        const response = await request(server)
            .post("/api/login")
            .send({
                username: "mop",
                password: "alsomop"
            })
        const finalResponse = await request(server)
            .get("./api/mygames")
            .set("Authorization", response.body.token)

            expect(finalResponse.status).toBe(200);
            expect(finalResponse).toBeResolved();
    })
})

describe("add a user to the game", () => {
    it ("add a user", async () => {
        const response = await request(server)
            .post("/api/login")
            .send({
                username: "mop",
                password: "alsomop"
            })

        const finalResponse = await request(server)
            .post("/api/games")
            .set("Authorization", response.body.token)
            .send({
                username: "bob"
            })

            expect(finalResponse.status).toBe(200);
            expect(finalResponse).toBeResolved()
    })

})