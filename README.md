# Back-End

## Table of Contents
* Handle users
* Handle games
* Handle friends within games

## Handle Users

### Register a user

```Post``` to https://bw-guess-who.herokuapp.com/api/register

Your object should look like this:

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
### Log in a user

```Post``` to  https://bw-guess-who.herokuapp.com/api/login

Login should be pretty basic: 
```
{
    username: "",
    password: ""
}
```

### Return info for current user

```Get``` from https://bw-guess-who.herokuapp.com/api/users

This should be just a basic get request.





### Update points
This allows you to update a user's points. It will be shaped like this: 
```
{
  points: 15
}
```
You can replace 15 with an integer of your choice.

```put```https://bw-guess-who.herokuapp.com/api/users/:id

### Delete current user
A user can delete their own account from the inside:

```Delete```
https://bw-guess-who.herokuapp.com/api/users/:id


## Handle Games
Once they get into their accounts, users can add, view, and delete their games

### Return games for current user (instigator)
This is for games that the user has initiated.

```Get```
https://bw-guess-who.herokuapp.com/api/games

It should just be a basic get request

### Return games for current user (participant)
This is for the games in which the user is participating but has not initiated:

```Get```
https://bw-guess-who.herokuapp.com/api/mygames

### Add a new game

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



### See a game by id
```Get```
https://bw-guess-who.herokuapp.com/api/games/:id

### Delete a game
```Delete```
https://bw-guess-who.herokuapp.com/api/games/:id

## Handle friends with games

### Add a user to a new game
It is a ```Post``` using this format:

`
{
  username: ""
}
`
https://bw-guess-who.herokuapp.com/api/games/:id

### Get all users involved in a game
It will be a ```get``` request:
https://bw-guess-who.herokuapp.com/api/games/:id/friends




### Delete a user from a game:
It's just a ```delete```

https://bw-guess-who.herokuapp.com/api/friends/:id
