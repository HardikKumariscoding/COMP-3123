# COMP3123 Full Stack Assignment 1

## Project Overview
This project is a full-stack application that manages users and employees using a RESTful API. It includes features for user signup and login, as well as CRUD operations for employee management. The application uses Node.js, Express, and MongoDB for the backend and validation is handled using express-validator.



## Features
- User registration and authentication
- Employee management with CRUD operations
- Input validation and error handling
- Responses in JSON format
- Easy deployment and testing

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- express-validator
- bcryptjs

## Installation Instructions

1.)Install Dependencies Make sure you have Node.js and npm installed, then run:
npm install

2.)Set Up MongoDB Ensure that MongoDB is installed and running on your local machine. You may need to create a database called comp3123_assignment1.

3.)Start the Server

4.)Access the API Open your browser and navigate to:
http://localhost:5000/api/v1/user/signup


API Documentation
User Endpoints
Signup

POST /api/v1/user/signup
Request Body:
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123"
}

Login

POST /api/v1/user/login
Request Body:
{
  "email": "johndoe@example.com",
  "password": "password123"
}

Employee Endpoints
Get All Employees

GET /api/v1/emp/employees
Create Employee

POST /api/v1/emp/employees
Request Body:

{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane.doe@example.com",
  "position": "Software Engineer",
  "salary": 90000,
  "date_of_joining": "2023-08-01",
  "department": "Engineering"
}


Get Employee by ID

GET /api/v1/emp/employees/:eid
Update Employee

PUT /api/v1/emp/employees/:eid
Request Body:

{
  "position": "Senior Software Engineer",
  "salary": 95000
}

Delete Employee

DELETE /api/v1/emp/employees?eid={eid}