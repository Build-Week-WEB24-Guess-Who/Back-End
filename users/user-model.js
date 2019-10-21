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

const getUsers = () => {
    return db("users")
}
//add games and friends functionality...

const addGame = (newGame, id) => {
    return db("games").insert(newGame)
}

const getGames = (id) => {
    // return db("games").where({ instigator_id: id} || { friend_id: id})
    return db("games").where({ instigator_id: id });
}

const getGameById = (id) => {
    return db("games").where({id});
}

const deleteGame = (id) => {
    return db("games").where({id}).delete();
}

const addUserToGame = (gameId, friendId) => {
    // return "I have noooo idea how to do this one..."
    return db("user_games").insert({game_id: gameId, friend_id: friendId});
}

module.exports = {
    getUsers,
    add,
    findBy, 
    findById,
    addGame,
    getGames,
    getGameById,
    deleteGame, 
    addUserToGame
}