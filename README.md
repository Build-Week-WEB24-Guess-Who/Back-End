# Back-End

## Register a user
**Information required to register a user**
```Post``` /api/register
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
```Post``` /api/login

Login should be pretty basic: 
```
{
    username: "",
    password: ""
}
```

## Return info for current user
```Get```
/api/users

This should be just a basic get request

## Return games for current user

```Get```
/api/games

It should just be a basic get request


## Add a new game

```Post```
/api/games

You'll want to format it like this...
```
{
  "game_name": "",
  "instigator_id": ""
  }
```

## Add a user to a new game