# Portfolio Admin Panel - Quick Start Guide

## 🎉 What's Been Implemented

A complete admin panel for your portfolio with:
- ✅ Secure authentication (JWT + bcrypt)
- ✅ Full CRUD for Projects, Skills, Experience, Credentials
- ✅ Contact form message management
- ✅ File upload for images
- ✅ Feature flags information
- ✅ Clean, responsive UI
- ✅ **0 security vulnerabilities** (CodeQL verified)

## 🚀 Quick Setup (3 Steps)

### Step 1: Set Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

**Required variables:**
- `TURSO_DATABASE_URL` - Your Turso database URL
- `TURSO_AUTH_TOKEN` - Your Turso auth token
- `JWT_SECRET` - Random secret key for admin sessions (generate a secure random string)
- `NEXT_PUBLIC_CONFIGCAT_SDK_KEY` - Your ConfigCat SDK key

### Step 2: Initialize Database

This creates all necessary tables:

```bash
npm run db:init
```

### Step 3: Create Admin User

This creates your first admin account:

```bash
npm run create-admin
```

You'll be prompted for:
- Username (e.g., "admin")
- Password (minimum 8 characters)

## 🎨 Access the Admin Panel

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/admin/login`

3. Log in with the credentials you created

4. You're in! 🎊

## 📱 Admin Panel Features

### Dashboard (`/admin`)
Central hub with quick access to all management sections

### Projects (`/admin/projects`)
- View all projects in a table
- Add new projects with full details
- Upload cover images and screenshots
- Edit and delete projects
- Auto-generated IDs

### Skills (`/admin/skills`)
- Manage your skill set
- Add skill levels/progress
- Quick add/edit/delete

### Experience (`/admin/experience`)
- Add work history
- Company, role, period, description
- Full CRUD operations

### Credentials (`/admin/credentials`)
- Certifications and awards
- Link to certificates
- Organization and date tracking

### Messages (`/admin/messages`)
- View contact form submissions
- Read full message details
- Delete processed messages

### Feature Flags (`/admin/feature-flags`)
- View all available flags
- ConfigCat integration info
- Quick access to dashboard

## 🔒 Security Features

- **Password Security**: Bcrypt hashing with 10 salt rounds
- **Session Management**: JWT tokens in HTTP-only cookies
- **Route Protection**: Middleware on all admin routes
- **API Security**: Authentication required on all endpoints
- **Input Validation**: Client and server-side validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Prevention**: HTTP-only cookies
- **File Upload Security**: Type and size validation (5MB max, images only)

## 📁 File Uploads

Upload images for:
- Project cover images
- Project screenshots

Files are stored in:
- `/public/uploads/covers/` - Cover images
- `/public/uploads/screenshots/` - Screenshots
- `/public/uploads/general/` - Other images

Or use external URLs - both methods work!

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:init      # Initialize database schema
npm run create-admin # Create admin user
```

## 📚 Full Documentation

- **ADMIN_README.md** - Complete admin panel documentation
- **IMPLEMENTATION_SUMMARY.md** - Technical implementation details
- **.env.example** - Environment variables template

## 🆘 Troubleshooting

**Can't log in?**
- Make sure you created an admin user with `npm run create-admin`
- Check your credentials
- Verify database is initialized

**Session expires quickly?**
- Default session is 24 hours
- Modify in `lib/auth/session.ts` if needed

**Upload fails?**
- Check file size (max 5MB)
- Verify file type (images only)
- Ensure `/public/uploads/` exists

**Build errors?**
- Run `npm install` to ensure all dependencies are installed
- Check environment variables are set
- Run `npm run lint` to check for code issues

## 🎯 Next Steps

1. **Customize**: Adjust the UI colors/styling to match your brand
2. **Add Content**: Start adding your projects, skills, and experience
3. **Configure**: Set up your ConfigCat feature flags
4. **Deploy**: Deploy to Vercel or your preferred platform
5. **Backup**: Set up regular database backups

## 💡 Tips

- Use the file upload feature for better performance than external URLs
- Regularly check the Messages section for new inquiries
- Keep your JWT_SECRET secure and never commit it to version control
- Use strong passwords for admin accounts
- Optimize images before uploading (compress to reduce file size)

## 🔗 Important URLs

- Admin Login: `/admin/login`
- Dashboard: `/admin`
- Projects: `/admin/projects`
- Skills: `/admin/skills`
- Experience: `/admin/experience`
- Credentials: `/admin/credentials`
- Messages: `/admin/messages`
- Feature Flags: `/admin/feature-flags`

---

## 🏗️ Architecture Overview

```
/app/admin/                    # Admin panel pages
  ├── login/                   # Login page
  ├── projects/                # Projects management
  ├── skills/                  # Skills management
  ├── experience/              # Experience management
  ├── credentials/             # Credentials management
  ├── messages/                # Contact messages
  └── feature-flags/           # Feature flags info

/app/api/admin/                # Admin API routes
  ├── auth/                    # Authentication endpoints
  ├── projects/                # Projects CRUD
  ├── skills/                  # Skills CRUD
  ├── experience/              # Experience CRUD
  ├── credentials/             # Credentials CRUD
  ├── messages/                # Messages management
  └── upload/                  # File upload

/lib/auth/                     # Authentication utilities
  ├── session.ts               # JWT session management
  └── helpers.ts               # Auth helpers

/lib/db/                       # Database utilities
  ├── turso-client.ts          # Database client & schema
  ├── admin.ts                 # Admin queries
  ├── contact.ts               # Contact messages queries
  ├── projects.ts              # Projects CRUD
  ├── skills.ts                # Skills CRUD
  ├── experience.ts            # Experience CRUD
  └── credentials.ts           # Credentials CRUD

/components/admin/             # Admin-specific components
  └── FileUpload.tsx           # File upload component

/scripts/                      # Utility scripts
  ├── init-db.ts               # Database initialization
  └── create-admin.ts          # Admin user creation

middleware.ts                  # Route protection middleware
```

---

**Need help?** Check the documentation files or refer to the implementation summary for detailed technical information.

**Ready to go?** Follow the Quick Setup steps above and you'll be managing your portfolio in minutes! 🚀
