const server = require("./index.js");
const Users = require("./users/user-model");
const db = require("./data/dbconfig.js");
const request = require("supertest");


describe ("sanity check to prep for testing", () => {
    beforeEach( () => {
         db("users").truncate();
        request(server).post("/api/register").send({ username: "mop", password: "alsomop"})
    })
})


describe("server", () => {
    describe("base root", () => {
        it ("should return OK status code", async () => {
            const expectedStatusCode = 200;
            const response = await request(server).get("/");
            expect(response.status).toEqual(expectedStatusCode);
        })
    })
})

// describe("register")

describe("login", () => {
    describe("route", () => {
        it ("should return 404 status code", async () => {
            const expectedStatusCode = 404;
            const response = await request(server).get("/api/login");
            expect(response.status).toEqual(expectedStatusCode);
        })
    })
})

describe("register", () => {


    describe("route", () => {
        it ("should return 404 status code", async () => {
            const expectedStatusCode = 404;
            const response = await request(server).get("/api/register")
            expect(response.status).toEqual(expectedStatusCode)
        })
        
        it ("can add a new user", async () => {
            const bobby = { username: "Bobby", password: "b0b"}
            await Users.add(bobby);
            const saved = await db("users")
            expect(saved).toHaveLength(1);
        })


    })
})

describe("users", () => {
    describe("route", () => {
        it ("should return a 2oo status code", async () => {
            const expectedStatusCode = 200;
            const response = await request(server).get("/api/users")
            expect(response.status).toEqual(expectedStatusCode);
        })

        it ("should return JSON", async () => {
            const response = request(server).get("api/users")
            expect(response.type);
        })


    })
} )



describe ("games", () => {
    it ("should return a 200 and resolve itself", () => {
        const response = request(server)
        .post("/api/login")
        .send({
            username: "mop",
            password: "alsomop"
        })

        console.log("RESPONSE!!!!", response);

        const finalResponse = request(server)
            .get("/api/games")
            .set("Authorization", response)
        
            expect(finalResponse.status).toBe(200)
            expect(finalResponse).toBeResolved();
    })
}) 

describe("mygames", () => {
    it ("should return a 200 and resolve itself", () => {
        const response = request(server)
            .post("/api/login")
            .send({
                username: "mop",
                password: "alsomop"
            })
        const finalResponse = request(server)
            .get("./api/mygames")
            .set("Authorization", response.body.token)

            expect(finalResponse.status).toBe(200);
            expect(finalResponse).toBeResolved();
    })
})



describe("add a game", async () => {
    const response = await request(server)
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



