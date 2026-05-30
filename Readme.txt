# Leave Management System

## Overview

The Leave Management System is a full-stack web application designed to streamline employee leave requests and administrative leave management. The system provides role-based access for Employees and Administrators, allowing efficient leave tracking, approval workflows, notifications, and leave balance management.

---

## Features

### Employee Features

* Secure login and authentication
* View personal leave balances
* Apply for leave
* Automatic leave adjustment recommendations
* Confirmation popup for leave adjustments
* View leave request history
* Revoke submitted or approved leave requests
* Receive notifications for:

  * Leave approval
  * Leave rejection
  * Leave revocation
  * Comp Off grants

---

### Admin Features

* Secure login and authentication
* Dashboard with leave analytics
* User management
* Create employee accounts
* Activate/Deactivate users
* Manage leave balances
* Grant Comp Off leaves
* Approve or reject leave requests
* Receive notifications for:

  * New leave requests
  * Leave revocations

---

## Leave Types Supported

* Casual Leave
* Paid Leave
* Sick Leave
* Comp Off
* Unpaid Leave

---

## Smart Leave Adjustment System

When employees apply for leave and the selected leave balance is insufficient:

1. The system checks the selected leave balance first.
2. It automatically checks other available leave balances.
3. If balances are still insufficient, remaining days become Unpaid Leave.
4. A confirmation popup displays the exact leave breakdown before submission.

Example:

Requested Leave: 5 Days Casual Leave

Available:

* Casual Leave: 2
* Paid Leave: 3

Suggested Breakdown:

* Casual Leave: 2
* Paid Leave: 3

The employee must confirm before submission.

---

## Notification System

Notifications are automatically generated for:

### Employee

* Leave Submitted
* Leave Approved
* Leave Rejected
* Leave Revoked
* Comp Off Granted

### Admin

* New Leave Request
* Leave Revoked

Unread notifications appear as a badge in the navigation menu.

---

## Technology Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS
* Recharts
* React Toastify
* Lucide React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

## Database Collections

### Users

Stores employee and admin information.

### Leave Balances

Stores yearly leave balances for employees.

### Leaves

Stores leave requests, status, and leave breakdown details.

### Notifications

Stores employee and admin notifications.

---

## Authentication

The application uses JWT-based authentication with role-based authorization.

Roles:

* Admin
* Employee

Protected routes ensure users can only access authorized resources.

---

## Leave Workflow

Employee Applies Leave

↓

System Checks Leave Balance

↓

If Adjustment Needed

↓

Confirmation Popup

↓

Leave Request Submitted

↓

Admin Reviews Request

↓

Approve / Reject

↓

Employee Receives Notification

↓

Leave Balance Updated

---

## Dashboard Analytics

### Admin Dashboard

* Total Employees
* Pending Requests
* Approved Requests
* Rejected Requests
* Leave Request Overview
* Leave Trend Analysis
* Recent Activities

### Employee Dashboard

* Leave Balance Overview
* Apply Leave
* My Leave History
* Notifications

---

## Future Enhancements

* Email Notifications
* Calendar Integration
* Public Holiday Management
* Department-wise Leave Reports
* Export Reports (PDF/Excel)
* Mobile Application Support

---

## Installation and Setup

### Prerequisites

Install the following software:

* Node.js (v18 or later)
* MongoDB Atlas Account or Local MongoDB
* Git
* VS Code

---

## Clone the Repository

```bash
git clone <repository-url>
cd LeaveManagementSystem
```

---

# Backend Setup

Navigate to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the server folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key
```

Example:

```env
PORT=5000

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/LeaveManagementSystem

JWT_SECRET=mysecretkey123
```

Start the backend server:

```bash
npm run dev
```

Backend will run at:

```txt
http://localhost:5000
```

---

# Frontend Setup

Open a new terminal.

Navigate to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

Frontend will run at:

```txt
http://localhost:5173
```

---

# Default Workflow

1. Start MongoDB Atlas or MongoDB Server.
2. Start Backend:

```bash
cd server
npm run dev
```

3. Start Frontend:

```bash
cd client
npm run dev
```

4. Open:

```txt
http://localhost:5173
```

5. Login as Admin or Employee.

---

# Project Structure

```txt
LeaveManagementSystem
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── layouts
│   │   ├── routes
│   │   └── context
│
├── server
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── models
│   │   ├── services
│   │   ├── middlewares
│   │   └── constants
│
├── package.json
└── README.md
```

---

# Build for Production

Frontend:

```bash
cd client
npm run build
```

Backend:

```bash
cd server
npm start
```

---

# Troubleshooting

### MongoDB Connection Error

Verify:

```env
MONGO_URI
```

is correct in the `.env` file.

---

### JWT Authentication Error

Verify:

```env
JWT_SECRET
```

exists and is not empty.

---

### Port Already In Use

Change:

```env
PORT=5000
```

to another available port.

---

### Frontend API Connection Error

Verify the Axios base URL points to:

```txt
http://localhost:5000/api
```

and ensure the backend server is running.

---

# Demo Credentials

### Admin

```txt
Email: admin@example.com
Password: ********
```

### Employee

```txt
Email: employee@example.com
Password: ********
```

(Replace with actual credentials used during testing.)

