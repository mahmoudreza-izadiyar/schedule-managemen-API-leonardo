# Project Title

A brief description of what your project does and its main features.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Database Schema](#database-schema)
- [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

This project is a comprehensive solution for managing schedules and tasks using TypeScript. It involves the design and implementation of RESTful API endpoints to handle scheduling and task management. The resources managed by this project include Schedules and Tasks.

A Schedule has a unique identifier, an associated account, an assigned agent, and start and end times. A Task, on the other hand, has a unique identifier, an associated account, a reference to the schedule it belongs to, a start time, a duration, and a type which can be either 'break' or 'work'.

There is a one-to-many relationship between Schedule and Tasks, where a Schedule can have multiple Tasks associated with it. The project is implemented using TypeScript and NestJS, with PostgreSQL as the database for data storage and Prisma as the ORM tool.

The codebase is designed with the SOLID principles in mind, ensuring it is clean, maintainable, and extensible. It also includes thorough unit tests to validate the functionality of the API endpoints.

## Features

- Implementation of RESTful API endpoints for managing schedules and tasks using TypeScript.
- Design and build of a comprehensive scheduling and task management system.
- Utilization of PostgreSQL for data storage and Prisma as an ORM tool.
- Adherence to SOLID principles for clean, maintainable, and extensible code.
- Thorough unit tests to validate the functionality of the API endpoints.

## Technologies Used

- NestJS
- Prisma
- PostgreSQL (or your chosen database)
- Swagger

## Prerequisites

To run this project, you will need the following prerequisites:

- Node.js (vXX.X.X)
- npm or yarn
- Docker

Once you have these prerequisites installed, follow these steps to run the project:

1. **Start Docker:** If you are using Docker for your database, start Docker by running the command `docker-compose up -d` in your terminal. This will start the PostgreSQL database in a Docker container.

2. **Run Database Seeds:** To populate your database with initial data, run the seed script with the command `npm run seed` or `yarn seed`. This will create some initial data in your database.

3. **Start the Server:** Start the NestJS server by running the command `npm run start` or `yarn start`. This will start the server and it will begin listening for requests.

4. **View the API Documentation:** Once the server is running, you can view the API documentation and interact with the API endpoints by navigating to `http://localhost:3000/api` in your web browser. This will open the Swagger UI where you can view the API documentation and send requests to the API endpoints.

## Database Schema

The database schema for this project is defined using Prisma, a modern database access tool. The schema is defined in the `schema.prisma` file and includes two models: `Schedule` and `Task`.

### Schedule Model

The `Schedule` model represents a schedule in the system. It has the following fields:

- `id`: A unique identifier for the schedule. It is a string and is automatically generated as a UUID.
- `account_id`: An integer representing the associated account.
- `agent_id`: An integer representing the assigned agent.
- `start_time`: A DateTime representing the start time of the schedule.
- `end_time`: A DateTime representing the end time of the schedule.
- `tasks`: A list of `Task` objects associated with the schedule. This establishes a one-to-many relationship between `Schedule` and `Task`, where a `Schedule` can have multiple `Task` objects associated with it.

### Task Model

The `Task` model represents a task in the system. It has the following fields:

- `id`: A unique identifier for the task. It is a string and is automatically generated as a UUID.
- `account_id`: An integer representing the associated account.
- `schedule_id`: A string representing the associated schedule. This establishes a relationship with the `Schedule` model.
- `start_time`: A DateTime representing the start time of the task.
- `duration`: An integer representing the duration of the task.
- `type`: A string representing the type of the task. It can be either 'break' or 'work'.
- `schedule`: A `Schedule` object associated with the task. This establishes a relationship with the `Schedule` model.

The `Task` model has a foreign key `schedule_id` that references the `id` field in the `Schedule` model. This establishes a one-to-many relationship between `Schedule` and `Task`, where a `Schedule` can have multiple `Task` objects associated with it.

## API Endpoints

This project provides several API endpoints for managing schedules and tasks.

### Schedule Endpoints

- **Create a Schedule:** Send a `POST` request to `/schedule` with a `CreateScheduleDto` object in the request body to create a new schedule.

- **Get All Schedules:** Send a `GET` request to `/schedule` to retrieve a list of all schedules.

- **Get a Specific Schedule:** Send a `GET` request to `/schedule/:id` with the ID of the schedule in the URL to retrieve a specific schedule.

- **Update a Schedule:** Send a `PATCH` request to `/schedule/:id` with the ID of the schedule in the URL and an `UpdateScheduleDto` object in the request body to update a specific schedule.

- **Delete a Schedule:** Send a `DELETE` request to `/schedule/:id` with the ID of the schedule in the URL to delete a specific schedule.

### Task Endpoints

- **Create a Task:** Send a `POST` request to `/task` with a `CreateTaskDto` object in the request body to create a new task.

- **Get All Tasks:** Send a `GET` request to `/task` to retrieve a list of all tasks.

- **Get a Specific Task:** Send a `GET` request to `/task/:id` with the ID of the task in the URL to retrieve a specific task.

- **Update a Task:** Send a `PATCH` request to `/task/:id` with the ID of the task in the URL and an `UpdateTaskDto` object in the request body to update a specific task.

- **Delete a Task:** Send a `DELETE` request to `/task/:id` with the ID of the task in the URL to delete a specific task.
