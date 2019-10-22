const server = require("./index.js");
const Models = require("./users/user-model");

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
    describe("route", () => {
        it ("should return 404 status code", async () => {
            const expectedStatusCode = 404;
            const response = await request(server).get("/api/register")
            expect(response.status).toEqual(expectedStatusCode)
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
    })
} )