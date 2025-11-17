# Turso Database Migration Guide

This document describes the migration from JSON/TypeScript-based data storage to Turso database for the portfolio application.

## Overview

The portfolio application has been migrated from static TypeScript data files to a dynamic Turso (libSQL) database. This migration includes:

- **Projects**: Complete project portfolio with details, technologies, and screenshots
- **Experience**: Work experience and achievements
- **Credentials**: Certifications and credentials
- **Skills**: Technical skills with proficiency tracking
- **Ratings**: Project ratings (already implemented, now with foreign key to projects)

## Database Schema

### Projects Table
```sql
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  cover TEXT,
  role TEXT NOT NULL,
  timeline TEXT NOT NULL,
  waiter TEXT,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  problem TEXT,
  solution TEXT,
  highlights TEXT NOT NULL,      -- JSON array
  technologies TEXT NOT NULL,     -- JSON array
  screenshots TEXT,               -- JSON array (optional)
  links TEXT,                     -- JSON object (optional)
  development INTEGER DEFAULT 0,  -- Boolean (0/1)
  group_name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Ratings Table
```sql
CREATE TABLE ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  user_identifier TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, user_identifier),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
)
```

### Experience Table
```sql
CREATE TABLE experience (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Credentials Table
```sql
CREATE TABLE credentials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  link TEXT NOT NULL,
  organization TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Skills Table
```sql
CREATE TABLE skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL UNIQUE,
  progress TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Migration Steps

### 1. Initialize Database Schema

```bash
npm run db:init
```

This creates all necessary tables and indexes.

### 2. Migrate Data

```bash
npm run migrate
```

This script:
- Reads data from TypeScript files in `/data` directory
- Transforms and inserts data into Turso database
- Provides detailed logging of migration progress
- Handles errors gracefully

**Output:**
- 8 projects migrated
- 5 experience entries migrated
- 5 credentials migrated
- 29 skills migrated

## API Routes

The application now uses RESTful API routes for data access:

### Projects
- `GET /api/projects` - List all projects
  - Query param: `?includeRatings=true` - Include rating statistics
- `GET /api/projects/[id]` - Get single project
  - Query param: `?includeRating=true` - Include rating statistics

### Experience
- `GET /api/experience` - List all experience entries

### Credentials
- `GET /api/credentials` - List all credentials

### Skills
- `GET /api/skills` - List all skills

### Ratings (existing)
- `GET /api/ratings/[projectId]/stats` - Get rating statistics
- `POST /api/ratings/[projectId]` - Submit a rating
- `GET /api/ratings/[projectId]/check` - Check if user has rated

## Database Query Layer

Type-safe query functions are available in `lib/db/`:

### Projects (`lib/db/projects.ts`)
```typescript
getAllProjects(): Promise<Project[]>
getProjectById(id: string): Promise<Project | null>
getProjectsWithRatings(): Promise<(Project & { avgRating?, totalRatings? })[]>
getProjectWithRating(id: string): Promise<(Project & { avgRating?, totalRatings? }) | null>
```

### Experience (`lib/db/experience.ts`)
```typescript
getAllExperience(): Promise<Experience[]>
```

### Credentials (`lib/db/credentials.ts`)
```typescript
getAllCredentials(): Promise<Credential[]>
```

### Skills (`lib/db/skills.ts`)
```typescript
getAllSkills(): Promise<Skill[]>
```

## Environment Configuration

Required environment variables:

```env
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-auth-token
```

For local development, the database will automatically use a local SQLite file (`local.db`) if `TURSO_DATABASE_URL` is not set.

## Frontend Updates

All frontend components have been updated to fetch data from API routes:

### Changed Components:
- `app/projects/page.tsx` - Uses `fetch('/api/projects')`
- `app/projects/[id]/page.tsx` - Uses `getProjectById()` server-side
- `app/experience/page.tsx` - Uses `fetch('/api/credentials')`
- `app/experience/Experience.tsx` - Uses `fetch('/api/experience')`
- `app/home/Skills.tsx` - Uses `getAllSkills()` server-side

### Data Flow:
1. **Server Components**: Directly call database query functions
2. **Client Components**: Fetch from API routes using `fetch()`
3. **Loading States**: Proper loading and error handling
4. **Type Safety**: TypeScript interfaces ensure type safety

## Benefits

### Performance
- ✅ Database indexing for faster queries
- ✅ Efficient joins for projects with ratings
- ✅ Caching opportunities at API layer

### Scalability
- ✅ Support for dynamic data updates
- ✅ No rebuild required for data changes
- ✅ Better suited for production use

### Maintainability
- ✅ Centralized data management
- ✅ Type-safe database queries
- ✅ Clear separation of concerns
- ✅ RESTful API design

### Data Integrity
- ✅ Foreign key constraints (ratings → projects)
- ✅ Unique constraints
- ✅ Data validation at database level

## Legacy Data Files

The original data files remain in the `/data` directory for reference:
- `data/projects.ts`
- `data/experience.ts`
- `data/credentials.ts`
- `data/skills.ts`

These files are no longer used by the application but are kept for:
- Historical reference
- Easy rollback if needed
- Migration script source data

## Rollback Plan

If rollback is needed:
1. Revert component changes to use direct imports
2. Remove API routes (optional)
3. Database can remain as-is or be removed

## Future Enhancements

Potential improvements:
- [ ] Add admin interface for data management
- [ ] Implement data pagination for large datasets
- [ ] Add full-text search capabilities
- [ ] Implement data caching strategies
- [ ] Add audit logs for data changes
- [ ] Create backup/restore scripts
