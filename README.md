# Project Title

A brief description of what your project does and its main features.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Schema](#database-schema)
- [Usage](#usage)
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
