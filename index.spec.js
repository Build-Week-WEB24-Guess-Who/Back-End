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
        it ("should return status code", async () => {
            const expectedStatusCode = 404;
            const response = await request(server).get("/login");
            expect(response.status).toEqual(expectedStatusCode);
        })
    })
})