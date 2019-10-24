const db = require("../data/dbconfig.js");

//**********register and login functionality***********/

const findById = (id) => {
    return db("users").where({ id }).first();
}
async function add(user) {
    const [id] = await db("users").insert(user, "id");
    return findById(id);
}

const findBy = filter => {
    return db("users").where(filter);
}

const getUsers = () => {
    return db("users")
}


//games functionality...

const addGame = (newGame, id) => {
    return db("games").insert(newGame, "id")
}

const getGames = (id) => {
    // return db("games").where({ instigator_id: id} || { friend_id: id})
    return db("games").where({ instigator_id: id });
}

const getMyGames = (id) => {
    return db("user_games as ug")
        .join("games as g", "ug.game_id", "g.id")
        .select("ug.id", "g.game_name")
        .where("ug.user_id", id)
}

const getGameById = (id) => {
    return db("games").where({id});
}

const deleteGame = (id) => {
    return db("games").where({id}).delete();
}

//friends-in-games functionality

const addUserToGame = ( gameId, friend) => {
    console.log(friend);
    return db("user_games").insert({ game_id: gameId, user_id: friend}, "id");
}

const findUserByName = (username) => {
    return db("users").where("username", username).first();
}

const getFriendsInGame = (id) => {
    return db("user_games as ug")
        .join("users as u", "ug.user_id", "u.id")
        .select("ug.id", "ug.game_id", "u.username")
        .where("ug.game_id", id)

}

const deleteFriendFromGame = (id) => {
    return db("user_games").where("user_id", id).delete();
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
    findUserByName, 
    addUserToGame, 
    getFriendsInGame,
    getMyGames,
    deleteFriendFromGame
}