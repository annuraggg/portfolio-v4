# Cloudflare D1 to Turso Migration Summary

This document summarizes the migration from Cloudflare D1 to Turso (libSQL) database.

## Overview

The portfolio project has been successfully migrated from Cloudflare D1 to Turso for improved flexibility and compatibility with various deployment platforms, especially Vercel.

## What Changed

### 1. Database Client
- **Before**: Cloudflare D1 with edge runtime bindings
- **After**: Turso/libSQL with standard SQL queries

### 2. Dependencies
**Removed:**
- `@cloudflare/next-on-pages`
- `@cloudflare/workers-types`
- `wrangler` (from devDependencies)

**Added:**
- `@libsql/client` - Turso database client
- `tsx` - TypeScript execution for scripts

### 3. Environment Variables
**Before:**
```bash
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_DATABASE_ID
CLOUDFLARE_API_TOKEN
DATABASE_URL
```

**After:**
```bash
TURSO_DATABASE_URL
TURSO_AUTH_TOKEN
```

### 4. API Routes
All API routes changed from:
- **Runtime**: `edge` → `nodejs`
- **Database Access**: `getD1Database()` → Turso client functions

### 5. Configuration Files

#### next.config.ts
Added:
```typescript
serverExternalPackages: ['@libsql/client']
```

#### package.json
- Updated build script (removed `--turbopack` due to compatibility)
- Added `db:init` script for schema initialization

#### wrangler.toml
- Removed D1 database binding
- Added note about Turso usage

## New Features

### Database Initialization Script
```bash
npm run db:init
```
Automatically initializes the database schema for both local and remote databases.

### Local Development
- No external database required
- Automatic local SQLite file (`local.db`)
- Seamless transition to production Turso database

## Migration Benefits

1. **Platform Flexibility**: Works on Vercel, Cloudflare Pages, and other Node.js platforms
2. **Local Development**: Full offline development capability
3. **Simpler Setup**: Standard SQL queries, no special bindings
4. **Better TypeScript Support**: Type-safe queries with @libsql/client
5. **Cost Effective**: Turso free tier is generous for personal projects

## How to Use

### Local Development
1. Clone the repository
2. Run `npm install`
3. Run `npm run db:init` to create local database
4. Run `npm run dev` to start development server

### Production Deployment

#### Option 1: Vercel
1. Create Turso database
2. Add `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` to Vercel environment variables
3. Deploy as usual

#### Option 2: Cloudflare Pages
1. Create Turso database
2. Add environment variables in Cloudflare Pages settings
3. Deploy via Git integration or wrangler

## Database Schema

The schema remains unchanged:

```sql
CREATE TABLE ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  user_identifier TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, user_identifier)
);

CREATE INDEX idx_project_id ON ratings(project_id);
CREATE INDEX idx_user_identifier ON ratings(project_id, user_identifier);
```

## API Compatibility

All API endpoints remain the same:
- `POST /api/ratings/[projectId]` - Submit/update rating
- `GET /api/ratings/[projectId]` - Get rating statistics
- `GET /api/ratings/[projectId]/check` - Check if user has rated

## Testing

All database operations have been tested:
- ✅ Schema initialization
- ✅ Insert operations
- ✅ Query operations
- ✅ UPSERT (insert or update)
- ✅ Aggregation queries
- ✅ Build process
- ✅ Linting

## Rollback

If needed to rollback to D1:
1. Restore `lib/db/d1-client.ts` from git history
2. Update API routes to use `getD1Database()`
3. Restore Cloudflare dependencies in package.json
4. Update environment variables
5. Restore wrangler.toml D1 bindings

## Support

For issues or questions:
- See README.md for setup instructions
- See DEPLOYMENT.md for deployment guides
- Check [Turso documentation](https://docs.turso.tech/)

---

Migration completed: November 17, 2025
