# Back-End



## Register a user
**Information required to register a user**
```Post``` https://bw-guess-who.herokuapp.com/api/register
```
{
    username: "",
    password:""
}
```
Id is added automatically on the backend, along with points (automatically 0) and level (Beginner);
This is how your item would be returned:

```
{
  "id": 1,
  "username": "totz",
  "password": "$2a$10$GP91a3OevPYabel5rMkbBOo/oLCDbSTlIGBJApvg8/InmZBvnfmne",
  "points": 0,
  "level": "Beginner"
}
```
## Log in a user
```Post``` https://bw-guess-who.herokuapp.com/api/login

Login should be pretty basic: 
```
{
    username: "",
    password: ""
}
```

## Return info for current user
```Get```
https://bw-guess-who.herokuapp.com/api/users

This should be just a basic get request

## Return games for current user

```Get```
https://bw-guess-who.herokuapp.com/api/games

It should just be a basic get request



## Add a new game

```Post```
https://bw-guess-who.herokuapp.com/api/games

You'll want to format it like this...
```
{
  "game_name": "",
  "instigator_id": ""
  }
```
Set instigator_id as your user's id.

## See a game by id
```Get```
https://bw-guess-who.herokuapp.com/api/games/:id

## Delete a game
```Delete```
https://bw-guess-who.herokuapp.com/api/games/:id


## Add a user to a new game
It is a ```Post``` using this format:

`
{
  username: ""
}
`


## Get all users involved in a game
It will be a ```get``` request:
https://bw-guess-who.herokuapp.com/api/games/:id/friends



## Get all games in which you are a participant and not an instigator
