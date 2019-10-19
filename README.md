# Back-End

## Register a user
**Information required to register a user**
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

Login should be pretty basic: 
```
{
    username: "",
    password: ""
}
```