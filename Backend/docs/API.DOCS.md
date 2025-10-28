## User Register

Create a new user account and return a JWT token. The endpoint also sets an HTTP-only cookie named `token` with the same JWT.

**Endpoint**

- Method: POST
- URL: /api/auth/register
- Headers: `Content-Type: application/json`

**Request body** (application/json)

| Field    | Type   | Required | Notes                          |
|----------|--------|----------|--------------------------------|
| name     | string | yes      | Minimum 3 characters           |
| email    | string | yes      | Must be a valid email address  |
| password | string | yes      | Minimum 6 characters           |

Validation rules

- `name` must be at least 3 characters long.
- `email` must be a valid email address.
- `password` must be at least 6 characters long.

These validation rules are enforced by the request validator; if validation fails the API returns a 400 response with an `errors` array describing the problems.

Responses

- 200 OK — Successful registration

```json
{
	"success": true,
	"message": "User registered successfully",
	"user": {
		"_id": "<user id>",
		"name": "Alice",
		"email": "alice@example.com",
		"createdAt": "<timestamp>",
		"updatedAt": "<timestamp>"
	},
	"token": "<jwt token>"
}
```


## User Login

Authenticate an existing user. Returns a JWT token and sets an HTTP-only `token` cookie on success.

**Endpoint**

- Method: POST
- URL: /api/auth/login
- Headers: `Content-Type: application/json`

**Request body** (application/json)

| Field    | Type   | Required | Notes                         |
|----------|--------|----------|-------------------------------|
| email    | string | yes      | Must be a valid email address |
| password | string | yes      | Plain text password           |

Responses

- 200 OK — Successful login

```json
{
	"success": true,
	"message": "User logged in successfully",
	"user": { "_id": "<id>", "name": "Alice", "email": "alice@example.com" },
	"token": "<jwt token>"
}
```

- 400 Bad Request — Invalid credentials

```json
{
	"success": false,
	"message": "Invalid credentials"
}
```

## User Logout

Invalidate the current session cookie. This endpoint clears the `token` cookie.

**Endpoint**

- Method: GET
- URL: /api/auth/logout

Responses

- 200 OK — Logged out

```json
{
	"success": true,
	"message": "User logged out successfully"
}
```

## User Profile

Get the authenticated user's profile. Requires authentication (must send cookie or Authorization header depending on client).

**Endpoint**

- Method: GET
- URL: /api/auth/profile
- Auth: Yes (middleware checks `token` cookie / JWT)

Responses

- 200 OK — Returns user info

```json
{
	"success": true,
	"message": "User profile",
	"user": { "_id": "<id>", "name": "Alice", "email": "alice@example.com", "createdAt": "<ts>", "updatedAt": "<ts>" }
}
```

- 401 Unauthorized — Missing/invalid token (handled by auth middleware)
- 404 Not Found — User not found

## Profile Update

Update the authenticated user's profile (name and/or email).

**Endpoint**

- Method: PUT
- URL: /api/auth/profile/update/
- Auth: Yes (requires `token` cookie / valid JWT)
- Headers: `Content-Type: application/json`

**Request body** (application/json)

| Field | Type   | Required | Notes                                 |
|-------|--------|----------|---------------------------------------|
| name  | string | Yes       | If provided, must be at least 3 chars |
| email | string | Yes       | If provided, must be a valid email    |

Responses

- 200 OK — User updated successfully

```json
{
	"success": true,
	"message": "User updated successfully",
	"user": { "_id": "<id>", "name": "Alice", "email": "alice@example.com" }
}
```

- 400 Bad Request — Validation errors (validator will return `errors` array)
- 401 Unauthorized — Missing/invalid token
- 500 Internal Server Error — Unexpected error

Notes

- The route uses `authValidator.userUpdate` and `authMiddleware` in the codebase; email and name are validated and the updated user (without password) is returned.
- Endpoint path includes a trailing slash in the router (`/profile/update/`)—it's accepted but you may prefer `/profile/update` for consistency.

## Notes API

Simple CRUD endpoints for managing a user's notes. All routes require authentication (the project uses an HTTP-only `token` cookie).

Base URL: /api/notes

1) List notes

- Method: GET
- URL: /api/notes/
- Auth: Yes

Success (200):

```json
{
	"success": true,
	"message": "Notes fetched successfully",
	"notes": [ { "_id": "<id>", "title": "...", "description": "...", "category": ["General"], "createdAt": "<ts>", "updatedAt": "<ts>" } ]
}
```

2) Create note

- Method: POST
- URL: /api/notes/create
- Headers: `Content-Type: application/json`
- Auth: Yes

Request body (application/json):

| Field       | Type     | Required | Notes                          |
|-------------|----------|----------|--------------------------------|
| title       | string   | yes      | Short title (validator may be minimal) |
| description | string   | yes      | Minimum 3 characters           |
| category    | string[] | no       | Optional array of categories; default `General` when missing |

Success (200):

```json
{
	"success": true,
	"message": "Note created successfully",
	"newNote": { "_id": "<id>", "title": "...", "description": "...", "category": ["General"], "user": "<user id>" }
}
```

3) Update note

- Method: PUT
- URL: /api/notes/update/:id
- Auth: Yes
- Params: `id` (note id, mongo ObjectId)
- Request body: `title`, `description`, `category` (same shapes as create)

Success (200):

```json
{
	"success": true,
	"message": "Note updated successfully",
	"updatedNote": { "_id": "<id>", "title": "...", "description": "...", "category": ["..."], "user": "<user id>" }
}
```

Errors: 404 if note not found or user not authorized to update.

4) Delete note

- Method: DELETE
- URL: /api/notes/delete/:id
- Auth: Yes
- Params: `id` (note id)

Success (200):

```json
{
	"success": true,
	"message": "Note deleted successfully"
}
```

Validation notes

- `description` must be at least 3 characters (validator enforces this).
- `id` params are validated as Mongo IDs on update.


Notes

- The `category` field in the model is an array; controller will set a default when missing. The validator requires `description` and validates `category` as an array on update.



