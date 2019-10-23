const Users = require("./user-model.js");
const db = require("../data/dbconfig.js")
;
describe("gets users", () => {
    it ("should show all users", async () => {
        await Users.getUsers()
    })

})

describe("gets games", () => {
    it("should get games based off a user id number", async() => {
       await Users.getGames(1);
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
    })
})

describe("it should get all users with a particular game id", () => {
    it ("should do the thing", async () => {
        
    })
})