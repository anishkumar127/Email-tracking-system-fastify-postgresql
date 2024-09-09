
# Email Tracking API Documentation

## Overview

The Email Tracking API allows users to manage and track the status of emails in the system, including reading emails, tracking the duration they were viewed, creating tickets, and retrieving tickets for specific users.

## Endpoints

### 1. READ EMAIL

**Description:** Marks an email as read for a specific user.

- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/v1/read`

**Request Body:**

```json
{
  "emailId": "anishbishnoi127@gmail.com",
  "userId": "123"
}
```

**Response:**

- No response body specified.

---

### 2. PING EVERY SECONDS TRACK SEEN DURATION

**Description:** Tracks the duration an email is being viewed by pinging the server periodically.

- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/v1/ping`

**Request Body:**

```json
{
  "emailId": "anishbishnoi127@gmail.com",
  "userId": "123"
}
```

**Response:**

- No response body specified.

---

### 3. CREATE TICKETS

**Description:** Creates a new ticket for an email event, such as sending or reading.

- **Method:** `POST`
- **URL:** `http://localhost:3000/api/v1/create`

**Prerequest Script:**

This script sets the current timestamp in the environment variable `currentTimestamp` before the request is sent.

```javascript
pm.environment.set("currentTimestamp", Date.now());
```

**Request Body:**

```json
{
  "emailId": "anishbishnoi127@gmail.com",
  "userId": "123",
  "sendDate": {{currentTimestamp}}
}
```

**Response:**

- No response body specified.

---

### 4. GET TICKETS

**Description:** Retrieves tickets for a specific user based on the email ID and user ID.

- **Method:** `GET`
- **URL:** `http://localhost:3000/api/v1/user?emailId=anishbishnoi127@gmail.com&userId=123`

**Query Parameters:**

- `emailId`: `anishbishnoi127@gmail.com`
- `userId`: `123`

**Response:**

- No response body specified.



