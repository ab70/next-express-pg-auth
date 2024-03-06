# Setup

## Docker
### Step 1 : 
```
sudo docker compose up -d
```
This will create docker for redis, postgres and adminer
### Step 2:
```
cd backend/
npm i
npm run dev

```
Backend will be running on localhost:4000
### Step 3: 
```
cd frontend/
npm i
npm run dev
```
frontend will be running on localhost:3000

# Frontend url
#### login page 
```
localhost:3000/
```
#### dahboard (will show user list with details if user is logged in or only username as list)
```
localhost:3000/dashboard
```


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
