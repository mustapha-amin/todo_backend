# Todo Backend API

A RESTful API backend for a Todo application built with Node.js, Express, TypeScript, and MongoDB.

## Author

**Mustapha Amin**

## Features

- ✅ JWT-based Authentication (login and register)
- ✅ Create, read, update, and delete todos
- ✅ MongoDB database integration with Mongoose
- ✅ TypeScript for type safety
- ✅ Express.js framework

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose v8.19.1
- **Language**: TypeScript v5.9.3
- **Dev Tools**: Nodemon, ts-node

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote instance)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo_backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3001
```

## Project Structure

```
todo_backend/
├── src/
│   ├── index.ts
│   ├── config/
│   ├── controllers/
│   ├── error/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── types/
│   └── validators/
├── dist/                # Compiled JavaScript (generated)
├── .env                 # Environment variables
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── nodemon.json         # Nodemon configuration
```

## API Endpoints

### Base URL
```
http://localhost:3001/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/todo` | Create a new todo |
| GET | `/todo` | Get all todos |
| GET | `/todo/:id` | Get a specific todo by ID |
| PATCH | `/todo/:id` | Update a todo by ID |
| DELETE | `/todo/:id` | Delete a todo by ID |

### Request/Response Examples

#### Create Todo
```bash
POST /api/todo
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the todo backend API",
  "completed": false
}
```

#### Get All Todos
```bash
GET /api/todo
```

#### Get Todo by ID
```bash
GET /api/todo/:id
```

#### Update Todo
```bash
PATCH /api/todo/:id
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true
}
```

#### Delete Todo
```bash
DELETE /api/todo/:id
```

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot reload using Nodemon.

### Build
```bash
npm run build
```
Compiles TypeScript to JavaScript in the `dist/` directory.

### Production
```bash
npm start
```
 