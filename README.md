# The Wall App Backend

API intended for use by [The Wall App Project](https://github.com/hpmoreira05/frontend_wall_app). From there, we can register user, authenticate, search posts, search posts by author, edit posts, and delete posts.

# What's included?

- Node.js
- Express.js
- JWT
- MongoDb
- Nodemailer
- Mocha
- Chai
- Sinon

# How to use it?

- Ensure that Node.js and MongoDB are installed.

1. Clone the repository
- `git clone git@github.com:hpmoreira05/backend_wall_app.git`
- Go to the repository folder you just cloned:
  -`cd Backend`

2. Install dependencies

- `npm install`

3. Create a file `.env` in the root project
- Enter the following values:
``` 
PORT = 5000
DATABASE_CONNECTION_STRING=mongodb+srv://admin_TSL:123456TSL@cluster0.upv53.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
SECRET_KEY=wallapptoken123456
EMAIL_USER=the.wall.app.service@gmail.com
EMAIL_PASSWORD=TSL123456
DB_NAME=myFirstDatabase
```
4. Start the server
- `npm start`

# Tests

Integration tests developed with Mocha, Chai and Sinon

1. To run all tests
- `npm test`

2. To run an especific test
- `NAME='testFileName' npm test`

# Data Base

[MongoDB Atlas](https://www.mongodb.com/pt-br/cloud/atlas/register) was used for hosting

# Deployment
Host: [Heroku](https://www.heroku.com)

Access it from here: [The Wall App API](https://wall-app-hpmoreira05-back.herokuapp.com/)

# Documentation

## POST user

- Resource URL: `https://wall-app-hpmoreira05-back.herokuapp.com/users`

### Resource Information

- Response formats: JSON
- Require Authentication? No
- Rate limited? No 
- Method: POST

### Parameters

- Body:
  - name (string)
  - email (sting)
  - password (string)

### Example request

```javascript
POST https://wall-app-hpmoreira05-back.herokuapp.com/users
Body{
  name:"User",
  email: "user@user.com",
  password: "123456"
}
```

### Example response
```JSON
{
   "message": "User successfully registered"
}
```
# POST login

- Resource URL: `https://wall-app-hpmoreira05-back.herokuapp.com/users/login`

### Resource Information

- Response formats: JSON
- Require Authentication? No
- Rate limited? No 
- Method: POST

### Parameters

- Body:
  - email (sting)
  - password (string)

### Example request

```javascript
POST https://wall-app-hpmoreira05-back.herokuapp.com/users/login

Body{
email: "user@user.com",
password: "123456"
}
```

### Example response

```JSON
{
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjYxOTVhYmFiNzQ0NDk2NjNkMzYxMDUwOCIsImVtYWlsIjoiaHBtb3JlaXJhMDUyQGdtYWlaaaNvbSJ9LCJpYXQiOjE2Mzc5NzUxMDksImV4cCI6MTYzODAwMzkwOX0.btsDuOgfx6lrxehaMMFKAS4pzjg1Ixe6FbPxjRs0Ke0"
}
```

## POST posts

- Resource URL: `https://wall-app-hpmoreira05-back.herokuapp.com/posts`

### Resource Information

- Response formats: JSON
- Require Authentication? Yes
- Rate limited? No 
- Method: POST

### Parameters

- Body:
  - title (sting)
  - description (string)

- Header:
  - Authorization (string)

### Example request
```javascript
POST https://wall-app-hpmoreira05-back.herokuapp.com/posts

Body{
title: "Lorem ipsum"
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis nisi eu erat scelerisque lobortis."
}

Headers{ 
'Content-type': 'application/json',
Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjYxOTVhYmFiNzQ0NDk2NjNkMzYxMDUwOCIsImVtYWlsIjoiaHBtb3JlaXJhMDUyQGdtYWlaaaNvbSJ9LCJpYXQiOjE2Mzc5NzUxMDksImV4cCI6MTYzODAwMzkwOX0.btsDuOgfx6lrxehaMMFKAS4pzjg1Ixe6FbPxjRs0Ke0"
}
```
### Example response
```JSON
{
   "message": "Post created succesfully",
   "id": "61a18701563b616afe59860b"
}
```

## GET posts

- Resource URL: `https://wall-app-hpmoreira05-back.herokuapp.com/posts`

### Resource Information

- Response formats: JSON
- Require Authentication? No
- Rate limited? No 
- Method: GET

### Parameters

- none

### Example request
```javascript
GET https://wall-app-hpmoreira05-back.herokuapp.com/posts
```
### Example response
```JSON
[{
       "_id": "619fa27394762ce4f935dc76",
       "title": "The best place in the world to see rainbows is in Hawaii.",
       "description": "If you're an avid rainbow gazer and want to get your fill of the beautiful phenomenon, look no further than the state of Hawaii.",
       "userId": "619f1d85138932e2f0718f0d",
       "name": "John"
   },
   {
       "_id": "619fa57d94762ce4f935dc78",
       "title": "Did you know? Yoda's original name was Buffy.",
       "description": "Most Star Wars fanatics already know that Yoda's full name, at least in the original script, was \"Minch Yoda,\" before being shortened to something that rolls off the tongue a little easier.",
       "createdAt": "11/25/2021, 12:02:21 PM",
       "userId": "619fa48994762ce4f935dc77",
       "name": "Yoda",
       "updatedAt": "11/25/2021, 12:06:54 PM"
   }
]
```
## GET user posts

- Resource URL: `https://wall-app-hpmoreira05-back.herokuapp.com/posts/myposts`

### Resource Information

- Response formats: JSON
- Require Authentication? Yes
- Rate limited? No 
- Method: GET

### Parameters

- Header:
  - Authorization (string)

### Example request

```javascript
GET https://wall-app-hpmoreira05-back.herokuapp.com/posts/myposts

Headers{ 
'Content-type': 'application/json',
Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjYxOTVhYmFiNzQ0NDk2NjNkMzYxMDUwOCIsImVtYWlsIjoiaHBtb3JlaXJhMDUyQGdtYWlaaaNvbSJ9LCJpYXQiOjE2Mzc5NzUxMDksImV4cCI6MTYzODAwMzkwOX0.btsDuOgfx6lrxehaMMFKAS4pzjg1Ixe6FbPxjRs0Ke0"
}
```
### Example response
```JSON
[
  {
    "_id": "61a18aad563b616afe59860c",
    "title": "Lorem ipsum",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis nisi eu erat scelerisque lobortis.",
    "createdAt": "11/26/2021, 10:32:29 PM",
    "userId": "61a183d706d8c70023439702",
    "name": "User"
  }
]
```
## PUT posts

- Resource URL: `https://wall-app-hpmoreira05-back.herokuapp.com/posts/:id`

### Resource Information

- Response formats: JSON
- Require Authentication? Yes
- Rate limited? No 
- Method: PUT

### Parameters

- Body:
  - title (sting)
  - description (string)

- Header:
  - Authorization (string)

- Params:
  - id

### Example request
```javascript
PUT https://wall-app-hpmoreira05-back.herokuapp.com/posts/61a18aad563b616afe59860c

Body{
title: "Update Lorem Ipsum"
description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis nisi eu erat scelerisque lobortis."
}

Headers{ 
'Content-type': 'application/json',
Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjYxOTVhYmFiNzQ0NDk2NjNkMzYxMDUwOCIsImVtYWlsIjoiaHBtb3JlaXJhMDUyQGdtYWlaaaNvbSJ9LCJpYXQiOjE2Mzc5NzUxMDksImV4cCI6MTYzODAwMzkwOX0.btsDuOgfx6lrxehaMMFKAS4pzjg1Ixe6FbPxjRs0Ke0"
}
```
### Example response
```JSON
{
  "message": "Post updated succesfully"
}
```
## DELETE posts

- Resource URL: `https://wall-app-hpmoreira05-back.herokuapp.com/posts/:id`

### Resource Information

- Response formats: JSON
- Require Authentication? Yes
- Rate limited? No 
- Method: DELETE

### Parameters

- Header:
  - Authorization (string)

- Params:
  - id

### Example request
```javascript
DELETE https://wall-app-hpmoreira05-back.herokuapp.com/posts/61a18aad563b616afe59860c

Headers{ 
'Content-type': 'application/json',
Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjYxOTVhYmFiNzQ0NDk2NjNkMzYxMDUwOCIsImVtYWlsIjoiaHBtb3JlaXJhMDUyQGdtYWlaaaNvbSJ9LCJpYXQiOjE2Mzc5NzUxMDksImV4cCI6MTYzODAwMzkwOX0.btsDuOgfx6lrxehaMMFKAS4pzjg1Ixe6FbPxjRs0Ke0"
}
```
### Example response
```JSON
{
  "message": "Post deleted succesfully"
}
```
