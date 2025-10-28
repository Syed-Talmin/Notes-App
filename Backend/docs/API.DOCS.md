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


