const Users = require("./user-model.js");
const db = require("../data/dbconfig.js");


/***sanity check****/
describe("gets users", () => {
    it ("should show all users", async () => {
        await Users.getUsers()
    })
})

/*********login and register**********/
describe("can register a user", () => {
    beforeEach(async() => {
        db("users").truncate()
    })
    it("registers a user", async () => {
        await Users.add({username: "j", password: "j"});
        const users = await db("users");
        expect(users).not.toBeUndefined();
        let i = users.length;
        expect(users).toHaveLength(i++)
        expect(users).toHaveProperty(username);
        expect(users).toContain("j")
    })
})

/****functionality for users********* */
describe("gets games", () => {
    it("should get games based off a user id number", async() => {
        const users = await Users.getGames(1);
        expect(users).not.toBeUndefined();
    })
})

describe("user games", () => {

    beforeEach(async () => {
        await db("user_games").truncate();
    })
    it("lets a user add a friend to a game", async () => {
        await Users.addUserToGame({ game_id: 10, user_id: 3})
        const usergames = await db("user_games");
        const i = usergames.length;
        expect(usergames).toHaveLength(i++)
    })
})

describe("make a game", () => {
    it("lets a user make a new game", async () => {
        await Users.addGame({game_name: "test", instigator_id: 1})
        const usergames = await db("games");
        let i = usergames.length;
        expect(usergames).toHaveLength(i++);
        expect(usergames).not.toBeUndefined();
    })
})

describe("it should get all users with a particular game id", () => {
    it ("should do the things", async () => {

        const friends = await Users.getFriendsInGame(1);
        expect(friends).toEqual(friends);
        expect(friends).not.toBeUndefined();
    })
})

