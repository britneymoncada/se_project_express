# WTWR (What to Wear?): Back End

This project is the server-side component of the WTWR (What to Wear?) application.
It provides a RESTful API that allows clients to:

Create and manage users

Create, list, and delete clothing items

Like and unlike items

Associate clothing items with weather types

Store and retrieve item owners

Handle request validation and basic error handling

During Sprint 12, the project focuses on learning Express.js, MongoDB/Mongoose, routing, controllers, middleware, authorization structure, and basic CRUD operations.

This version includes a temporary middleware that injects a test user into req.user so that endpoints can be tested without JWT authentication. In later sprints, real authentication and authorization logic is implemented.

API Functionality

The API currently supports:

Users

POST /users — create a new user (Sprint 12 uses only name and avatar)

GET /users — list all users

GET /users/:userId — get a specific user by ID

POST /signin — log in (password-based login implemented for later sprints)

Items

GET /items — list all clothing items

POST /items — create an item (owner automatically assigned from req.user.\_id)

DELETE /items/:itemId — delete an item by ID

PUT /items/:itemId/likes — like an item

DELETE /items/:itemId/likes — unlike an item

Technologies Used

Node.js

Express.js

MongoDB

Mongoose ODM

ES Modules (import/export syntax)

bcryptjs (for password hashing in later sprints)

jsonwebtoken (JWT) (login flow)

Express middleware for routing, JSON parsing, temporary authorization

ESLint (airbnb-base + prettier)

Validator.js for URL validation

Nodemon for development auto-reload

## Running the Project

`npm run start` — to launch the server

`npm run dev` — run the server with nodemon

Frontend (se_project_react):

Live site: https://soft-shares.com
Backend repo
Frontend repo

Backend (se_project_express):

API: https://api.soft-shares.com
