# Admin Panel Documentation

This admin panel allows you to manage all content on your portfolio website.

## Initial Setup

### 1. Initialize the Database

First, make sure your database schema is initialized by running the database initialization script (if not already done).

### 2. Create Admin User

To create an admin user, run:

```bash
npm run create-admin
```

You'll be prompted to enter:
- Username
- Password (minimum 8 characters)

The password will be securely hashed using bcrypt before being stored in the database.

## Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Enter your username and password
3. You'll be redirected to the admin dashboard

## Features

### Dashboard (`/admin`)
- Overview of all management sections
- Quick access to different management pages

### Projects Management (`/admin/projects`)
- **View** all projects in a table format
- **Add** new projects with full details:
  - Basic info (title, date, role, timeline)
  - Cover image (upload or URL)
  - Summary and description
  - Problem and solution
  - Highlights (multiple)
  - Technologies (comma-separated)
  - Screenshots (upload or URLs)
  - Links (GitHub repos and demo)
  - Development status flag
  - Group/category
- **Edit** existing projects
- **Delete** projects

### Skills Management (`/admin/skills`)
- **View** all skills
- **Add** new skills with name and progress level
- **Edit** existing skills
- **Delete** skills

### Experience Management (`/admin/experience`)
- **View** all work experience entries
- **Add** new experience with:
  - Company/Organization
  - Role/Position
  - Date/Period
  - Description
- **Edit** existing experience
- **Delete** experience entries

### Credentials Management (`/admin/credentials`)
- **View** all credentials/certifications
- **Add** new credentials with:
  - Title
  - Organization
  - Date
  - Certificate link
- **Edit** existing credentials
- **Delete** credentials

### Messages (`/admin/messages`)
- **View** all contact form submissions
- See message details (name, email, subject, message, date)
- **Delete** messages

### Feature Flags (`/admin/feature-flags`)
- View all available feature flags
- Information on how to manage flags via ConfigCat dashboard
- Available flags:
  - Project Ratings
  - Contact Form
  - Projects Section
  - Experience Section
  - Theme Switcher
  - Mouse Follower
  - Development Projects

## File Uploads

The admin panel supports image uploads for:
- Project cover images
- Project screenshots

**Upload specifications:**
- Accepted formats: PNG, JPG, GIF, WEBP
- Maximum file size: 5MB
- Files are stored in `/public/uploads/`

You can either upload files directly or provide external URLs.

## Security Features

- **Authentication**: JWT-based session management
- **Password Security**: Bcrypt hashing (never stored in plain text)
- **Session Expiry**: 24-hour session duration
- **Protected Routes**: Middleware ensures only authenticated users can access admin pages
- **Protected APIs**: All admin API endpoints require authentication

## API Routes

All admin API routes are prefixed with `/api/admin/` and require authentication:

- **Auth**
  - `POST /api/admin/auth/login` - Login
  - `POST /api/admin/auth/logout` - Logout
  - `GET /api/admin/auth/session` - Check session

- **Projects**
  - `GET /api/admin/projects` - Get all projects
  - `POST /api/admin/projects` - Create project
  - `PUT /api/admin/projects` - Update project
  - `DELETE /api/admin/projects` - Delete project

- **Skills**
  - `GET /api/admin/skills` - Get all skills
  - `POST /api/admin/skills` - Create skill
  - `PUT /api/admin/skills` - Update skill
  - `DELETE /api/admin/skills` - Delete skill

- **Experience**
  - `GET /api/admin/experience` - Get all experience
  - `POST /api/admin/experience` - Create experience
  - `PUT /api/admin/experience` - Update experience
  - `DELETE /api/admin/experience` - Delete experience

- **Credentials**
  - `GET /api/admin/credentials` - Get all credentials
  - `POST /api/admin/credentials` - Create credential
  - `PUT /api/admin/credentials` - Update credential
  - `DELETE /api/admin/credentials` - Delete credential

- **Messages**
  - `GET /api/admin/messages` - Get all messages
  - `DELETE /api/admin/messages` - Delete message

- **Upload**
  - `POST /api/admin/upload` - Upload image file

## Environment Variables

Make sure these environment variables are set:

```env
# Turso Database
TURSO_DATABASE_URL=your_database_url
TURSO_AUTH_TOKEN=your_auth_token

# JWT Secret (for admin sessions)
JWT_SECRET=your_secret_key_here

# ConfigCat (for feature flags)
NEXT_PUBLIC_CONFIGCAT_SDK_KEY=your_configcat_key
```

## Troubleshooting

### Can't log in
- Make sure you've created an admin user using `npm run create-admin`
- Verify your credentials
- Check that the database is properly initialized

### Session expires quickly
- Sessions last 24 hours by default
- You can modify the duration in `lib/auth/session.ts`

### Upload fails
- Check file size (must be under 5MB)
- Verify file type (only images allowed)
- Ensure `/public/uploads/` directory exists and is writable

## Best Practices

1. **Regular Backups**: Back up your database regularly
2. **Strong Passwords**: Use strong, unique passwords for admin accounts
3. **Keep Updated**: Keep dependencies updated for security
4. **Monitor Messages**: Regularly check and respond to contact form messages
5. **Image Optimization**: Optimize images before uploading for better performance
