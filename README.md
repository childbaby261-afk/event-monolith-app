# Community Event Management System 

Team Members
- Davies Manchishi - 2410093
- Tateda Mungandaire - 2420986
- Amos Kabashi - 2420961
- Link to Demo video:https://youtu.be/Xq-B-eAzZPI

Final Project Report
Course: Software Design Assignment
Project Title: Community Event System (Monolith Architecture)
Developers: Davies, Tatenda and Amos
Submission Date: October 25, 2025

1. Introduction
The Community Event System is a monolithic web application designed to manage event creation, user authentication, role-based access, and real-time RSVP updates. The project was developed using Elysia.js, Prisma ORM, and a PostgreSQL database hosted on Neon. It implements modern software design principles such as modularity, separation of concerns, and scalability while ensuring practical functionality and deployment readiness.
The system allows users to:
    • Register and log in securely.
    • Create, update, delete, and approve events (based on role).
    • RSVP to events and receive live updates through websockets.
    • View API documentation via Swagger.
    • Access the app live on Render.

2. Tools and Technologies
Category	Tool/Technology	Purpose
Backend Framework	Elysia.js	API development, routing, and websocket handling
ORM	Prisma	Database modeling and queries
Database	Neon (PostgreSQL)	Cloud-hosted database
Authentication	JWT + bcrypt	Secure user authentication
API Documentation	@elysiajs/swagger	Automatic API documentation
Deployment	Render	Hosting the final app
Testing	Insomnia	Endpoint and realtime testing

3. System Architecture
The system follows a monolith structure with the following modules:
    • Controllers: Business logic (auth, events, RSVP)
    • Routes: Endpoints for HTTP requests
    • Middleware: Authentication and role-based access control
    • Utils: Helper functions (JWT, error handling)
    • Prisma: Database schema and client
    • Index: Main server configuration and route initialization
This design ensures clean separation of concerns, easy debugging, and maintainability.

4. Challenges Faced
a) Database Downtime
Initially, the project used an AWS-hosted database, which went down unexpectedly. We migrated to Neon (PostgreSQL) and updated the DATABASE_URL to restore service. Prisma migrations had to be reconfigured and synchronized using npx prisma migrate reset.
b) Node.js Compatibility
During development, we encountered multiple errors due to Node version incompatibility. The Prisma and Elysia versions required Node.js 20+, while the local environment was running Node 18. We upgraded to Node 20 using n and adjusted TypeScript configurations.
c) TypeScript ESM vs CommonJS Errors
Type import/export syntax caused module resolution conflicts. This was resolved by setting "type": "module" in package.json and adjusting tsconfig.json to "module": "ESNext" with "moduleResolution": "node".
d) Prisma Drift Errors
After multiple schema updates, Prisma reported “drift detected” issues. We reset the migration history using:
npx prisma migrate reset
npx prisma migrate dev --name update-schema
This ensured full synchronization with the Neon database.
e) Deployment Configuration
During deployment to Render, environment variables were missing at first (e.g., DATABASE_URL, JWT_SECRET). After adding them in Render’s dashboard, the system deployed successfully and API endpoints worked perfectly in production.

5. Testing
All API endpoints were tested with Insomnia, verifying:
    • Authentication (Signup/Login)
    • Event CRUD operations
    • Role-based authorization
    • RSVP operations
    • Realtime updates (via WebSockets)
    • Swagger API documentation accessibility at /swagger
All tests passed successfully on both local and deployed environments.

6. Results and Achievements
 -Successful backend deployment on Render
 -Full database integration with Neon
 -Secure authentication and JWT system
 -Role-based control (Admin, Organizer, Attendee)
 -Realtime RSVP and event updates
 -Fully documented API with Swagger
 -Comprehensive local and cloud testing

7. Lessons Learned
    • Maintaining version compatibility between Node, TypeScript, and Prisma is crucial.
    • Modular folder structure simplifies debugging and enhances scalability.
    • Cloud databases like Neon improve flexibility but require careful environment management.
    • AI-assisted development (via ChatGPT) greatly accelerates debugging and implementation.
    • Continuous testing with Insomnia ensures stable deployments.

8. Conclusion
The Community Event System successfully demonstrates the integration of authentication, event management, and realtime functionality within a clean monolithic architecture. Despite several technical hurdles, the team overcame challenges through persistence, documentation reference, and strategic tool usage. The final system is live, tested, and production-ready.

9. References
    • Elysia.js Documentation
    • Prisma Documentation
    • Neon PostgreSQL
    • Render Deployment Guide
    • JWT & Bcrypt Libraries
    • Insomnia API Testing

Final Note:
This project solidified our understanding of software design principles, modern backend development, and cloud deployment pipelines. The challenges faced became powerful learning experiences that strengthened our development workflow.

Project Overview
A full-stack event management application built as part of BSE2210 Software Design assignment.

Monolith Event Management Application
Overview
This project is a simplified monolith web application built using Elysia.js (Node.js/Bun) and Prisma to manage community events. It demonstrates core software design principles, including authentication, role-based access control, and realtime communication via WebSockets. This application directly implements the design principles (e.g., modularity, separation of concerns) and data models developed in the previous Software Design assignment into a single, cohesive monolith structure. 
﻿
Technology Stack
Backend Framework: Elysia.js (for high-performance routing and WebSockets)
Database: PostgreSQL (via Neon, as configured in `render.yaml`)
ORM: Prisma (for type-safe database interactions)
Authentication: JSON Web Tokens (JWT) and `bcryptjs` for secure password hashing.
Realtime: Native WebSockets (`ws`) integration via Elysia.js.
Deployment: Render (using `render.yaml` for infrastructure-as-code).
﻿
Key Features
User Authentication: Secure Signup (`/signup`) and Login (`/login`).
Role-Based Access Control (RBAC): Users are assigned one of three roles: 
ADMIN: Can approve events (`/events/:id/approve`).
ORGANIZER: Can create, edit, and delete their own events (`/events`).
ATTENDEE: Can RSVP to approved events (`/events/:id/rsvp`).
Event Management: CRUD operations for events. Events require ADMIN approval before being visible to all users.
Realtime Updates: Live event status updates broadcast to all connected users via WebSockets (e.g., new RSVP, event approved).
Mock Email Service: Uses a mock service to log welcome emails to the console for development testing.
API Documentation: Integrated Swagger UI for easy API exploration at `/swagger`.
﻿
Setup and Run Locally
Prerequisites
Node.js or Bun (Bun is recommended for Elysia.js).
PostgreSQL Database (Local or cloud service like Neon).
﻿
Installation Steps
Clone the repository:
﻿
 
﻿git clone [Your Repository URL]cd community-event-app
Install dependencies:
﻿
 
﻿npm install
Configure Environment:
﻿
 
Create a `.env` file in the root directory.
Add your local database connection string and a secret key:
﻿DATABASE_URL="[Your Local Postgres URL or Neon Dev URL]"JWT_SECRET="a_strong_local_secret"
Database Migration:
﻿
 
﻿npx prisma generatenpx prisma db push
Start the server:
﻿
 
﻿npx tsx src/index.ts# Server will start on http://localhost:3002
﻿
API Testing with Insomnia
The API was thoroughly tested using Insomnia to ensure all roles and authorization checks function correctly before frontend integration.
Quick Test Guide (Example: Creating an Event)
Request Type: `POST`
URL: `http://localhost:3002/signup` (Create an `ORGANIZER` user)
Response: Get the JWT Token.
New Request: 
Method: `POST`
URL: `http://localhost:3002/events`
Header: `Authorization: Bearer [Paste JWT Token Here]`
Body (JSON): 
﻿{  "title": "Tech Workshop",  "description": "Learning about Elysia.js",  "date": "2026-01-01T10:00:00Z",  "location": "Online"}
Expected Result: HTTP Status 201 Created.
Deployment Note

While we encountered database configuration challenges with Render deployment, the application is fully functional locally with all features working:

 Local Demo Video Breakdown:
 0:00-0:30 Localhost Swagger documentation (`http://localhost:3002/swagger`)
 0:30-1:00 User registration & login system
 1:00-1:30 Event creation & management with role-based access
 1:30-2:00 RSVP system & real-time WebSocket features
 2:00-2:30 Design patterns implementation (Observer, Factory, Singleton)
 2:30-3:00 GitHub repository walkthrough & conclusion

Local Development Status:
Backend fully operational on localhost:3002  
All API endpoints functional 
Authentication & authorization working
Real-time features active  
Database operations successful  
Design patterns properly implemented

The complete system meets all assignment requirements and is ready for evaluation and now running live on render.


