# Solidstay Admin Server

## Local Setup

- Install dependencies: `npm ci`
- Copy `.env` from `.env.example` and fill in your production values (MongoDB Atlas, Supabase, etc.).
- For local development, create `.env.development` and set your local overrides (e.g., local MongoDB, dev Supabase bucket).
- Start in dev: `npm run dev`
- Health check: open `http://localhost:8080/api/health`

## MongoDB Connection

- Connection string format (Atlas):
  `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<db_name>?retryWrites=true&w=majority`
- This server reads `DB_URI` from the active env file (`.env` for prod, `.env.development` for dev) and connects via Mongoose.

## Notes

- In local development, only `DB_URI` is required, but all keys used in production should be present (with local/test values as needed).
- Storage: The upload route now uses Supabase Storage.
  - Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_BUCKET` in your env file.
  - If your bucket is private, set `SUPABASE_SIGNED_URL_EXP` (seconds) to return signed URLs.
