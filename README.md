# Cloud Metric DevOps Event API

## Overview

This project is a production-style REST API built to demonstrate backend
and DevOps fundamentals in a realistic service environment. The
application acts as a lightweight event ingestion service that accepts
structured events, validates them, stores them in PostgreSQL, and
exposes endpoints for retrieval.

The goal of this project is to showcase clean service architecture,
reproducible infrastructure, and automated validation through continuous
integration.

------------------------------------------------------------------------

## Why This Project Exists

Modern distributed systems rely heavily on event-driven communication,
monitoring, and audit logging. This service represents a simplified
version of infrastructure commonly used to:

-   Collect operational telemetry
-   Store application or user activity logs
-   Provide audit history for compliance and debugging
-   Support analytics and monitoring pipelines

The project intentionally focuses on reliability, observability, and
maintainability rather than feature complexity.

------------------------------------------------------------------------

## Tech Stack

### Backend

-   Node.js
-   TypeScript
-   Express

### Database

-   PostgreSQL
-   pg (Node Postgres client)

### Validation

-   Zod

### DevOps & Infrastructure

-   Docker / Docker Compose
-   GitHub Actions CI

### Testing

-   Jest
-   Supertest

------------------------------------------------------------------------

## Architecture Highlights

### Separation of Concerns

-   `app.ts` builds the Express application
-   `server.ts` handles runtime startup and environment configuration

This allows the application to be easily tested without binding to a
network port.

------------------------------------------------------------------------

### Environment Configuration

Application configuration is centralized and validated at startup using
Zod. This ensures misconfigured environments fail fast instead of
producing runtime errors.

------------------------------------------------------------------------

### Request Pipeline Design

The service uses Express middleware to implement:

-   JSON request parsing
-   Request logging
-   Centralized error handling
-   Input validation

------------------------------------------------------------------------

### Database Layer

A PostgreSQL connection pool is used to efficiently handle concurrent
requests. Schema creation is handled through a migration script.

------------------------------------------------------------------------

### DevOps Integration

The repository includes a GitHub Actions workflow that:

-   Provisions a PostgreSQL service container
-   Runs database migrations
-   Executes automated tests

This ensures every commit is validated in a clean environment.

------------------------------------------------------------------------

## API Endpoints

### Health Check

    GET /health

Returns service uptime and status information.

------------------------------------------------------------------------

### Create Event

    POST /events

#### Request Body

``` json
{
  "type": "event_name",
  "payload": {}
}
```

#### Response

``` json
{
  "id": 1,
  "type": "event_name",
  "payload": {},
  "created_at": "timestamp"
}
```

------------------------------------------------------------------------

### List Events

    GET /events

Optional query parameter:

    ?limit=50

------------------------------------------------------------------------

## Running Locally

### Prerequisites

-   Node.js
-   Docker Desktop

------------------------------------------------------------------------

### 1. Install Dependencies

    npm install

------------------------------------------------------------------------

### 2. Configure Environment

Create a `.env` file:

    PORT=3000
    NODE_ENV=development
    DATABASE_URL=postgres://postgres:postgres@localhost:5433/cloud_metric_devops

------------------------------------------------------------------------

### 3. Start PostgreSQL

    docker compose up -d

------------------------------------------------------------------------

### 4. Run Migrations

    npm run migrate

------------------------------------------------------------------------

### 5. Start the Server

    npm run dev

------------------------------------------------------------------------

## Running Tests

    npm test

------------------------------------------------------------------------

## Continuous Integration

GitHub Actions automatically runs:

-   Dependency installation
-   Database provisioning
-   Schema migration
-   Test execution

on every push and pull request.

------------------------------------------------------------------------

## Key Design Decisions

### Fail-Fast Configuration

Environment variables are validated during startup to prevent silent
configuration errors.

### Parameterized Queries

All database queries use parameter binding to prevent SQL injection.

### Structured Error Handling

Validation errors return HTTP 400 responses, while unexpected failures
return HTTP 500 responses.

### Containerized Infrastructure

Docker ensures consistent database environments across development and
CI.

------------------------------------------------------------------------

## Future Improvements

Potential enhancements include:

-   Cursor-based pagination
-   Event filtering and search
-   Authentication and authorization
-   Structured JSON logging with correlation IDs
-   Metrics and monitoring integration
-   Deployment pipeline with infrastructure provisioning

------------------------------------------------------------------------

## Author

**Tigh Patrick Gallagher**\
Bachelor of Computing -- Queen's University\
Software Development & DevOps Focus
