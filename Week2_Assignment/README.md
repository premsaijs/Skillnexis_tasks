# Week 2 Full Stack MERN Assignment

This repository contains my Week 2 internship work at Skill Nexis.

The main focus of this week was learning backend development with Node.js, Express.js, MongoDB, REST APIs, JWT authentication, and bcrypt. I also worked on a few React practice exercises.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- JWT
- bcrypt
- React
- React Router
- CSS Modules
- Postman

## Project Structure

```text
Week2_FullStack_MERN/
│
├── Assignment1_Todo_REST_API/
│
├── Assignment2_User_Authentication/
│
├── MiniProject_Notes_App/
│
└── React_Practice/
    ├── Product_Info/
    ├── Props_State/
    ├── Todo_App/
    ├── React_Router/
    └── CSS_Modules/
```

## Assignment 1: To-Do REST API

A REST API for managing tasks using Express.js and MongoDB.

### Features

- Add a task
- View tasks
- Update a task
- Delete a task
- Store tasks in MongoDB

### Main API Routes

```text
POST   /api/tasks
GET    /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

The API can be tested using Postman.

## Assignment 2: User Authentication API

This project implements basic user authentication using Express.js, MongoDB, bcrypt, and JWT.

### Features

- User registration
- Password hashing using bcrypt
- User login
- JWT generation
- Protected routes
- Authentication middleware

Passwords are not stored as plain text.

## Mini Project: Notes App Backend

A backend API for a notes application.

### Features

- Create notes
- View notes
- View a note by ID
- Update notes
- Delete notes
- MongoDB storage
- JWT-protected routes

The protected routes require a valid authentication token.

## React Practice

The React practice section contains five small exercises.

### 1. Product Information

A React component for displaying product information.

### 2. Props and State

A small example demonstrating the use of props and state in React.

### 3. To-Do App

A React To-Do application with:

- Add task
- Display tasks
- Delete task

### 4. React Router

A React application demonstrating navigation between different routes using React Router.

### 5. CSS Modules

A React application using CSS Modules for component-level styling.

## Running the Backend Projects

Open a terminal inside the required project folder.

Install the dependencies:

```bash
npm install
```

Create a `.env` file using the provided `.env.example` file.

Add the required MongoDB connection string and other environment variables.

Then start the server using the command specified in the project's `package.json`.

## MongoDB

The backend projects use MongoDB for storing application data.

Mongoose is used to connect the Node.js applications to MongoDB and define the data models.

## Postman

Postman is used to test the REST APIs.

The Postman collections are included with the respective backend projects.

The main operations tested include:

- Creating data
- Reading data
- Updating data
- Deleting data
- User registration
- User login
- Authentication using JWT

## Environment Variables

Sensitive values are kept in environment variables.

Example:

```text
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Do not upload the actual `.env` file to GitHub.

The repository includes `.env.example` files as a reference.

## Git

The project is maintained using Git and GitHub.

The repository contains the complete Week 2 assignment and practice work.

## Learning Outcomes

During Week 2, I worked with:

- Creating REST APIs using Express.js
- Connecting applications to MongoDB
- Using Mongoose models
- Performing CRUD operations
- Handling user authentication
- Hashing passwords with bcrypt
- Using JWT for authentication
- Testing APIs with Postman
- Building React components
- Using props and state
- Using React Router
- Using CSS Modules

## Author

Prem Sai J S

B.E. Artificial Intelligence and Machine Learning
New Horizon College of Engineering
