# Database Setup Guide

This project uses Cloudflare D1 for storing project ratings. Follow these steps to set up the database.

## Prerequisites

- Cloudflare account
- Wrangler CLI installed (`npm install -g wrangler`)

## Setup Steps

### 1. Login to Cloudflare

```bash
wrangler login
```

### 2. Create D1 Database

```bash
wrangler d1 create portfolio-ratings
```

This will output your database ID. Copy it and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "portfolio-ratings"
database_id = "YOUR_DATABASE_ID_HERE"
```

### 3. Run Migrations

```bash
wrangler d1 execute portfolio-ratings --file=./db/migrations/001_create_ratings.sql
```

### 4. Verify Database

```bash
wrangler d1 execute portfolio-ratings --command="SELECT name FROM sqlite_master WHERE type='table';"
```

You should see the `ratings` table listed.

## Local Development

For local development, the application uses an in-memory mock database. No additional setup is required.

## Production Deployment

When deploying to Cloudflare Pages:

1. Set up the D1 binding in your Pages project settings
2. Add the following environment variables:
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
   - `CLOUDFLARE_DATABASE_ID`: Your D1 database ID
   - `CLOUDFLARE_API_TOKEN`: API token with D1 edit permissions

## Database Schema

The database contains a single table `ratings`:

- `id`: Auto-incrementing primary key
- `project_id`: String identifier for the project
- `rating`: Integer between 1-5
- `user_identifier`: Unique identifier for the user
- `created_at`: Timestamp of when the rating was created

Users can only rate each project once (enforced by unique constraint on project_id + user_identifier).

## Querying the Database

### View all ratings for a project

```bash
wrangler d1 execute portfolio-ratings --command="SELECT * FROM ratings WHERE project_id='scriptopia-campus';"
```

### Get rating statistics

```bash
wrangler d1 execute portfolio-ratings --command="SELECT * FROM project_ratings_stats;"
```

### Clear all ratings (use with caution)

```bash
wrangler d1 execute portfolio-ratings --command="DELETE FROM ratings;"
```
