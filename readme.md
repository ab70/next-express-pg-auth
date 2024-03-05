# API Endpoints Documentation

Welcome to our API documentation. Below you'll find details about various endpoints available in our API along with example POST requests and their corresponding request bodies.

<!-- ## 1. /users/create -->

### Description:
Creates a new user in the system.

### SignUp (POST):
http://localhost:4000/api/auth/signup
### Request Body:
```json
{
    "userName": "ab1",
    "email": "ab1@gmail.com",
    "password": "12345678"
}

```
### SignIn (POST):
http://localhost:4000/api/auth/signin
### Request Body:
```json
{
    "email": "ab@gmail.com",
    "password": "12345678"
}
```

### Logged In User info/profile (GET)
http://localhost:4000/api/user/user


### All user with view count (GET)
http://localhost:4000/api/user/all

### View a User's profile (GET)
### Description:
This will increase view count and will send updated count of this profile.

http://localhost:4000/api/user/user/1
