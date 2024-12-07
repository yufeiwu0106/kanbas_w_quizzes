# Kanbas Node Server Application

## Overview
This is a Node.js HTTP Web server application built for the Kanbas learning management system. The application provides a RESTful API service that handles course management, user authentication, assignments, modules, and enrollments.

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- Express Session for authentication
- CORS for cross-origin resource sharing
- Axios for HTTP requests
- Dotenv for environment variable management

## Core Features

### 1. User Management
- User authentication (signin/signup)
- User profile management
- Role-based access control (STUDENT, FACULTY, ADMIN, USER)
- User search functionality with filters
- Session management

### 2. Course Management
- CRUD operations for courses
- Course enrollment system
- Course module management
- Assignment management within courses
- Course user management

### 3. Module System
- Module creation and management
- Module-course relationship
- Module content organization
- Lesson management within modules

### 4. Assignment System
- Assignment creation and management
- Due date management
- Point-based grading system
- Assignment-course relationship

### 5. Enrollment System
- Course enrollment management
- User-course relationship tracking
- Enrollment status tracking
- Grade management

## Database Schema

### User Schema
- Username (unique)
- Password
- Personal information (firstName, lastName, email, dob)
- Role-based access
- Activity tracking

### Course Schema
- Course name and number
- Credits
- Description
- Related modules and assignments

### Module Schema
- Module name and description
- Course relationship
- Lesson content

### Assignment Schema
- Title and description
- Due dates (available, due, until)
- Point-based grading
- Course relationship

### Enrollment Schema
- User-Course relationship
- Grade tracking
- Enrollment status
- Enrollment date

## API Endpoints

### User Routes
- POST `/api/users/signin` - User authentication
- POST `/api/users/signup` - New user registration
- GET `/api/users` - Retrieve users (with optional filters)
- PUT `/api/users/:userId` - Update user information
- POST `/api/users/profile` - Get current user profile
- POST `/api/users/signout` - User logout

### Course Routes
- GET `/api/courses` - Retrieve all courses
- POST `/api/courses` - Create new course
- DELETE `/api/courses/:courseId` - Delete course
- PUT `/api/courses/:courseId` - Update course
- GET `/api/courses/:courseId/modules` - Get course modules
- GET `/api/courses/:courseId/assignments` - Get course assignments
- GET `/api/courses/:courseId/enrollments` - Get course enrollments

### Module Routes
- PUT `/api/modules/:moduleId` - Update module
- DELETE `/api/modules/:moduleId` - Delete module
- POST `/api/courses/:courseId/modules` - Create new module

### Assignment Routes
- PUT `/api/assignments/:assignmentId` - Update assignment
- DELETE `/api/assignments/:assignmentId` - Delete assignment
- POST `/api/courses/:courseId/assignments` - Create new assignment

## Environment Configuration
The application uses environment variables for configuration:
- `MONGO_CONNECTION_STRING` - MongoDB connection string
- `SESSION_SECRET` - Session secret key
- `NETLIFY_URL` - Frontend application URL
- `NODE_ENV` - Environment mode
- `PORT` - Server port number

## Security Features
- Session-based authentication
- Password protection
- CORS configuration
- Role-based access control
- Environment variable protection

## Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env` file
4. Start the server: `npm start`

## Production Considerations
- Secure session configuration for production
- Proxy settings for deployment
- Domain configuration for cookies
- Cross-origin resource sharing settings