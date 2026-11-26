# todos-backend

Express + MySQL (no ORM) todos API for a Railway demo.

## Endpoints
- `GET /api/todos` — list todos
- `POST /api/todos` — add a todo (`{ "title": "..." }`)
- `DELETE /api/todos/:id` — remove a todo
- `GET /docs` — Swagger UI

## Run locally
```bash
npm install
MYSQL_URL=mysql://user:pass@host:3306/db npm start
```

## Database
`db/schema.sql` creates the table, `db/seed.sql` inserts mock data.
