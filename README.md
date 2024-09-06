---

# API Documentation

## Overview

This documentation describes the API endpoints available for interacting with the email tracking system. The endpoints allow you to create users, mark emails as read or pinged, and retrieve user information.

## Endpoints

### 1. PUT /api/v1/read

Marks an email as read.

-   **URL:** `http://localhost:3000/api/v1/read`
-   **Method:** `PUT`
-   **Request Body (JSON):**
    ```json
    {
        "emailId": "anishbishnoi127@gmail.com",
        "userId": "123"
    }
    ```

### 2. PUT /api/v1/ping

Records a ping event for an email.

-   **URL:** `http://localhost:3000/api/v1/ping`
-   **Method:** `PUT`
-   **Request Body (JSON):**
    ```json
    {
        "emailId": "anishbishnoi127@gmail.com",
        "userId": "123"
    }
    ```

### 3. POST /api/v1/create

Creates a new user in the system.

-   **URL:** `http://localhost:3000/api/v1/create`
-   **Method:** `POST`
-   **Request Body (JSON):**
    ```json
    {
        "emailId": "anishbishnw3oiw13274@gmail.com",
        "userId": "132w3w43"
    }
    ```

### 4. GET /api/v1/user

Retrieves information about a user based on their email and user ID.

-   **URL:** `http://localhost:3000/api/v1/user`
-   **Method:** `GET`
-   **Query Parameters:**
    -   `emailId`: Email of the user (e.g., `anishbishnoi127@gmail.com`)
    -   `userId`: ID of the user (e.g., `123`)
-   **Example URL:** `http://localhost:3000/api/v1/user?emailId=anishbishnoi127@gmail.com&userId=123`
