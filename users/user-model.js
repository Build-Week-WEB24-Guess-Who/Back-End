const db = require("../data/dbconfig.js");

//**********register and login functionality***********/

const findById = (id) => {
    return db("users").where({ id }).first();
}
async function add(user) {
    const [ id ] = await db("users").insert(user);
    return findById(id);
}

const findBy = filter => {
    return db("users").where(filter);
}

//add games and friends functionality...

const addGame = (newGame) => {
    return db("games").insert(newGame)
}

const getGames = (id) => {
    return db("games").where({ instigator_id: id})
}

module.exports = {
    add,
    findBy, 
    findById,
    addGame,
    getGames
}