# Smart Campus Operation Hub

Smart Campus Operation Hub is a full-stack platform designed to centralize and streamline daily university operations. It provides a single system for managing campus resources, bookings, maintenance workflows, user access, and operational visibility.

Developed as a final-year project at SLIIT, the platform addresses common campus administration issues such as fragmented communication, manual tracking, delayed issue resolution, and inefficient resource utilization.

## What Problem We Solved

University operations are often distributed across spreadsheets, emails, and informal communication channels. This creates delays, duplication, and poor accountability.

This project introduces a unified solution that enables:

- **Structured issue reporting and resolution** with full lifecycle tracking
- **Centralized resource booking** with visibility into availability and approvals
- **Role-based operational control** for admins, managers, technicians, and users
- **Actionable analytics** for SLA compliance and utilization trends
- **Integrated notifications** to keep stakeholders informed in real time

## What We Implemented

### 1. Ticket Management Module

A complete incident and request-handling workflow for campus maintenance and support.

- End-to-end ticket lifecycle management
- Priority-based SLA deadlines
- Technician assignment and ownership controls
- Comments, attachments, and resolution notes
- SLA countdown and breach visibility

### 2. Resource Booking Module

A booking system for classrooms, labs, and equipment.

- Calendar-based booking flow
- Booking conflict prevention
- Approval workflow for restricted resources
- Booking history and user-level tracking
- QR code generation for check-in use cases

### 3. Resource Catalog & Availability Module

A centralized inventory for campus facilities and assets.

- Categorized resource management
- Availability tracking
- Search and filtering capabilities
- Resource metadata and media support
- Recommendation-oriented “Smart Finder” support

### 4. Notifications Module

In-app notifications to reduce communication delays.

- Event-based notifications for ticket and booking changes
- Unread indicators and notification panel
- User-level notification preference control

### 5. Authentication & Access Control Module

Secure user onboarding and access governance.

- Google OAuth2-based sign-in
- JWT-based session handling
- Pending-account approval flow
- Role-based authorization model

### 6. Analytics & Reporting Module

Operational dashboards for decision support.

- Ticket volume and priority distribution
- SLA compliance tracking
- Booking utilization metrics
- Export-oriented reporting support

## Technology Stack

### Frontend

- **React 19**
- **Vite 8**
- **React Router 7**
- **Tailwind CSS 4**
- **Axios**
- **Recharts**
- **Lucide React**
- **qrcode.react**
- **date-fns**
- **Swiper**

### Backend

- **Java 21**
- **Spring Boot**
- **Spring Security**
- **Spring Data JPA (Hibernate)**
- **PostgreSQL**
- **JJWT**
- **Spring OAuth2 Client**
- **Maven**

### Deployment & Infrastructure

- **NeonDB** (PostgreSQL hosting)
- **Vercel** (frontend deployment)
- **Railway** (backend deployment)
- **Docker** (containerization)

## High-Level Architecture

- **Frontend (React SPA)** communicates with the backend via REST APIs
- **Backend (Spring Boot)** handles business logic, security, and persistence
- **PostgreSQL** stores operational data
- **Google OAuth2** manages identity verification
- **JWT** secures authenticated API access

## Project Structure

```text
smart-campus-operation-hub/
├── frontend/                    # React + Vite application
│   └── src/
│       ├── api/                 # API integration layer
│       ├── components/          # Reusable UI components
│       ├── context/             # Global state providers
│       ├── hooks/               # Custom hooks
│       ├── pages/               # Feature pages
│       └── utils/               # Utility functions
│
├── backend/                     # Spring Boot application
│   └── src/main/java/.../
│       ├── controller/          # REST controllers
│       ├── service/             # Business logic
│       ├── repository/          # Data access layer
│       ├── model/               # JPA entities
│       ├── dto/                 # Request/response models
│       ├── security/            # JWT and OAuth2 security
│       ├── config/              # Application configuration
│       ├── enums/               # Domain enums
│       ├── scheduler/           # Scheduled jobs
│       └── exception/           # Error handling
│
├── docs/                        # Project documentation
├── Dockerfile                   # Backend container definition
├── vercel.json                  # Frontend deployment config
└── railway.toml                 # Backend deployment config
```

## Getting Started

### Prerequisites

- Node.js 20+
- Java 21 JDK
- Maven 3.9+
- PostgreSQL database
- Google Cloud OAuth2 credentials

### 1) Clone the Repository

```bash
git clone https://github.com/your-username/smart-campus-operation-hub.git
cd smart-campus-operation-hub
```

### 2) Configure and Run the Backend

```bash
cd backend
cp .env.example .env
mvn spring-boot:run
```

Backend runs at: `http://localhost:8080`

### 3) Configure and Run the Frontend

```bash
cd ../frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

### 4) First Admin Approval

After first Google sign-in, approve your account directly in the database:

```sql
UPDATE users
SET status = 'APPROVED', role = 'ADMIN'
WHERE email = 'your@email.com';
```

## API Overview

All endpoints are exposed under `/api/v1`.

Core domains include:

- `/auth`
- `/users`
- `/tickets`
- `/bookings`
- `/resources`
- `/notifications`
- `/analytics`

A Postman collection is available in `/docs/postman/`.

## Roles and Permissions

- **ADMIN**: Full platform control
- **MANAGER**: Operational oversight and approvals
- **TECHNICIAN**: Assigned ticket execution
- **USER**: Ticket submission and booking actions

## Known Limitations

- File uploads are currently stored on local server storage and are not persistent across certain production redeployments.
- AI-assisted ticket triage is rule-based and not model-driven.
- Real-time notification push is partially implemented end-to-end.
- Automated test coverage is currently limited.

## Contribution Guidelines

1. Branch from `main` using clear naming conventions (`feature/...`, `fix/...`).
2. Keep pull requests scoped to a single concern.
3. Validate frontend and backend changes locally before submitting.
4. Merge through reviewed pull requests only.

## License

This is a university project submitted in partial fulfillment of the BSc (Hons) in Information Technology at SLIIT.

All rights reserved.
