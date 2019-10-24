const server = require("./index.js");
const Users = require("./users/user-model");
const db = require("./data/dbconfig.js");
const request = require("supertest");

describe("server", () => {
    describe("base root", () => {
        it ("should return OK status code", async () => {
            const expectedStatusCode = 200;
            const response = await request(server).get("/");
            expect(response.status).toEqual(expectedStatusCode);
        })
    })
})

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

    beforeEach(async () => {
        await db("users").truncate();
    })
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
            expect(response.status).toEqual(expectedStatusCode)
        })

        it ("should return JSON", async () => {
            const response = request(server).get("api/users")
            expect(response.type);
        })


    })
} )


//test those private routes!!!

