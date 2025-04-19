# Library Management System (LMS)

A full-stack web application for managing a library, built with **React** (frontend) and **Node.js/Express/MongoDB** (backend). The system supports user authentication, book management, borrowing/returning books, role-based access control, reports, and automated notifications.

## Features
- **User Management**: Register, login, and manage user profiles with roles (admin, librarian, member). Full CRUD for users (admin only).
- **Book Management**: Add, update, delete, and search books by title, author, or ISBN.
- **Borrowing System**: Borrow and return books, track due dates, and calculate fines for overdue returns ($1/day).
- **Search and Filters**: Search books with filters for genre and availability.
- **Reports**: View most borrowed books and overdue books (admin/librarian only).
- **Notifications**: Email reminders for overdue books, sent daily via cron job.
- **Responsive UI**: Built with Material-UI for a modern, mobile-friendly interface.

## Tech Stack
### Frontend
- React
- React Router
- Material-UI
- Axios
- React Hook Form
- React Toastify

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for email notifications
- Winston for logging
- node-cron for scheduled tasks

### Testing
- Jest and Supertest for backend unit tests
- mongodb-memory-server for in-memory MongoDB testing

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

## Project Structure

## Setup Instructions

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```

### Features

#### New Features
- **Testing**: Jest is used for unit and integration tests.
  - MongoDB in-memory server is used for testing database operations.
  - Tests cover user registration, login, and book CRUD operations.
  - Additional tests for transactions and reports can be added.

### Testing Instructions
1. Ensure all dependencies are installed in the `backend` directory.
2. Run the following command to execute tests:
   ```bash
   npm test
   ```
3. Notes:
   - `mongodb-memory-server` creates an in-memory MongoDB instance for testing.
   - Tests include user registration, login, and book CRUD operations.