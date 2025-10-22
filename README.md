# Todo Backend API

A RESTful API backend for a Todo application built with Node.js, Express, TypeScript, and MongoDB.

## Author

**Mustapha Amin**

## Features

- ✅ JWT-based authentication (register, login, admin registration)
- ✅ Role-based access control (user/admin roles)
- ✅ User-specific todo management (CRUD operations)
- ✅ User management endpoints (admin only)
- ✅ MongoDB integration with Mongoose
- ✅ TypeScript for type safety

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose v8.19.1
- **Language**: TypeScript v5.9.3
- **Authentication**: JWT (jsonwebtoken v9.0.2)
- **Validation**: Zod v4.1.12
- **Password Hashing**: bcryptjs v3.0.2
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
JWT_SECRET=your_jwt_secret_key
```

## Project Structure

```
todo_backend/
├── src/
│   ├── index.ts                      # Application entry point
│   ├── config/
│   │   ├── db.ts                     # MongoDB connection
│   │   └── env.ts                    # Environment configuration
│   ├── controllers/
│   │   ├── auth_controller.ts        # Authentication logic
│   │   ├── todo_controllers.ts       # Todo CRUD operations
│   │   └── user_controller.ts        # User management
│   ├── error/
│   │   ├── api_error.ts              # Base API error class
│   │   ├── bad_request_error.ts      # 400 errors
│   │   ├── not_found_error.ts        # 404 errors
│   │   ├── unauthenticated_error.ts  # 401 errors
│   │   └── unuthorized_error.ts      # 403 errors
│   ├── middleware/
│   │   ├── async_handler.ts          # Async error wrapper
│   │   ├── auth_middleware.ts        # JWT authentication
│   │   ├── role_middleware.ts        # Role-based authorization
│   │   ├── error_handler.ts          # Global error handler
│   │   ├── mongodb_error_handler.ts  # MongoDB error handler
│   │   ├── logger.ts                 # Request logger
│   │   └── not_found.ts              # 404 handler
│   ├── models/
│   │   ├── user.ts                   # User schema & model
│   │   ├── todo.ts                   # Todo schema & model
│   │   └── error_response.ts         # Error response model
│   ├── routes/
│   │   ├── auth.routes.ts            # Auth endpoints
│   │   ├── todo.routes.ts            # Todo endpoints
│   │   └── user.routes.ts            # User endpoints
│   ├── types/
│   │   ├── express.d.ts              # Express type extensions
│   │   └── user.d.ts                 # User type definitions
│   └── validators/
│       └── auth_validator.ts         # Authentication validation
├── dist/                              # Compiled JavaScript (generated)
├── .env                               # Environment variables
├── package.json                       # Project dependencies
├── tsconfig.json                      # TypeScript configuration
└── nodemon.json                       # Nodemon configuration
```

## API Endpoints

### Base URL
```
http://localhost:3001/api/v1
```

### Authentication Endpoints

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Auth Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td><code>/auth/register</code></td>
      <td>Register a new user</td>
      <td>No</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/auth/login</code></td>
      <td>Login user</td>
      <td>No</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/auth/admin/register</code></td>
      <td>Register admin user</td>
      <td>No</td>
    </tr>
  </tbody>
</table>

**Register Example:**
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Login Example:**
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Todo Endpoints (Protected)

All todo endpoints require JWT authentication via `Authorization: Bearer <token>` header.

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Auth Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td><code>/todos/</code></td>
      <td>Create a new todo</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/todos/</code></td>
      <td>Get all user's todos</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/todos/:id</code></td>
      <td>Get specific todo by ID</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>PATCH</td>
      <td><code>/todos/:id</code></td>
      <td>Update todo by ID</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td><code>/todos/:id</code></td>
      <td>Delete todo by ID</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>

**Create Todo:**
```bash
POST /api/v1/todos/
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the todo backend API",
  "completed": false
}
```

**Update Todo:**
```bash
PATCH /api/v1/todos/:id
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true
}
```

### User Management Endpoints (Admin Only)

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Auth Required</th>
      <th>Role Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td><code>/users/</code></td>
      <td>Get all users</td>
      <td>Yes</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td><code>/users/</code></td>
      <td>Delete all users</td>
      <td>Yes</td>
      <td>Admin</td>
    </tr>
  </tbody>
</table>

**Get All Users:**
```bash
GET /api/v1/users/
Authorization: Bearer <admin_jwt_token>
```

## Data Models

### User Model
```typescript
{
  userId: string,        // UUID
  username: string,      // Unique, optional
  email: string,         // Required, unique
  password: string,      // Hashed with bcrypt
  role: 'user' | 'admin', // Default: 'user'
  createdAt: Date,
  updatedAt: Date
}
```

### Todo Model
```typescript
{
  id: string,           // UUID
  userId: string,       // Reference to user
  title: string,        // Required
  description: string,  // Optional
  completed: boolean    // Default: false
}
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
Runs the compiled JavaScript from the `dist/` directory.
 