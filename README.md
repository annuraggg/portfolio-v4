# Portfolio v4

A modern, production-ready portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features include project showcases, rating system, and feature flag management.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS v4
- **Turso Database**: All portfolio data (projects, experience, credentials, skills) stored in Turso (libSQL)
- **Project Ratings**: Interactive star ratings with database integration
- **RESTful APIs**: Production-ready API routes for all data types
- **Feature Flags**: ConfigCat integration for feature toggling without deployments
- **Responsive Design**: DaisyUI components with custom theming
- **Smooth Animations**: Framer Motion for engaging user experience
- **Dark Mode**: Built-in theme switching support
- **Type-Safe**: Full TypeScript coverage
- **Production-Ready**: Optimized build configuration and best practices

## 📋 Prerequisites

- Node.js 18+ and npm
- (Optional) Turso account for production database (free tier available)
- (Optional) ConfigCat account for feature flags

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/annuraggg/portfolio-v4.git
cd portfolio-v4
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```bash
# ConfigCat Feature Flags (optional)
NEXT_PUBLIC_CONFIGCAT_SDK_KEY=your_sdk_key_here

# Turso Database (optional for local dev, uses local.db by default)
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your_auth_token_here

# Email Service
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 🗄️ Database Setup (Turso)

The project uses Turso (libSQL) for storing all portfolio data including projects, experience, credentials, skills, and ratings. For local development, it uses a local SQLite file by default. For production, you can use a remote Turso database.

### Local Development

By default, the application uses a local SQLite database file (`local.db`) for development. No additional setup is required!

1. **Initialize the database schema**
   ```bash
   npm run db:init
   ```

2. **Migrate data from TypeScript files to database**
   ```bash
   npm run migrate
   ```
   
   This will populate the database with:
   - Projects (8 projects)
   - Experience entries (5 entries)
   - Credentials (5 certifications)
   - Skills (29 skills)

3. **Run the development server**
   ```bash
   npm run dev
   ```

The database will be automatically created in the project root as `local.db`.

### Production Setup (Turso Cloud)

For production deployments, use Turso's cloud database service:

#### Prerequisites

- Turso CLI installed: `curl -sSfL https://get.tur.so/install.sh | bash`

#### Setup Steps

1. **Sign up and login to Turso**
   ```bash
   turso auth signup
   # or if you already have an account
   turso auth login
   ```

2. **Create a database**
   ```bash
   turso db create portfolio-db
   ```

3. **Get the database URL**
   ```bash
   turso db show portfolio-db --url
   ```

4. **Create an authentication token**
   ```bash
   turso db tokens create portfolio-db
   ```

5. **Add to your environment variables**
   
   In your deployment platform (Vercel, Cloudflare Pages, etc.), add:
   ```
   TURSO_DATABASE_URL=libsql://[your-database-url].turso.io
   TURSO_AUTH_TOKEN=your_auth_token_here
   ```

6. **Initialize and migrate the production database**
   
   With the environment variables set:
   ```bash
   npm run migrate
   ```

### Database Schema

The database uses the following schema:

**Table: `projects`**
- All project information including title, description, technologies, links, etc.
- Stores highlights and technologies as JSON arrays
- Foreign key relationship with ratings table

**Table: `ratings`**
- `id`: Auto-incrementing primary key
- `project_id`: Foreign key to projects table
- `rating`: Integer between 1-5
- `user_identifier`: Unique identifier for the user
- `created_at`: Timestamp of when the rating was created

**Table: `experience`**
- Work experience and achievements
- Includes title, date, description, and role

**Table: `credentials`**
- Certifications and credentials
- Includes title, date, link, and organization

**Table: `skills`**
- Technical skills with optional proficiency tracking
- Includes title and optional progress link

**Indexes:**
- `idx_project_id` on `ratings(project_id)`
- `idx_user_identifier` on `ratings(project_id, user_identifier)`
- Date indexes on all timestamped tables

For detailed schema information, see [TURSO_MIGRATION.md](./TURSO_MIGRATION.md).

### Database Operations

With Turso CLI, you can interact with your database:

#### View all projects
```bash
turso db shell portfolio-db "SELECT id, title FROM projects;"
```

#### View all ratings for a project
```bash
turso db shell portfolio-db "SELECT * FROM ratings WHERE project_id='your-project-id';"
```

#### Get rating statistics
```bash
turso db shell portfolio-db "SELECT project_id, COUNT(*) as total_ratings, AVG(rating) as average_rating FROM ratings GROUP BY project_id;"
```

#### Clear all ratings (use with caution)
```bash
turso db shell portfolio-db "DELETE FROM ratings;"
```

## 🎚️ Feature Flags Setup (Optional)

The project uses ConfigCat for feature flag management. All features work without ConfigCat, but you won't be able to toggle them dynamically.

To set up feature flags:

1. Create a free account at [ConfigCat](https://app.configcat.com)
2. See [FEATURE_FLAGS.md](./FEATURE_FLAGS.md) for the complete list of flags and setup instructions

Available feature flags:
- `enableProjectRatings` - Project rating system
- `enableContactForm` - Contact form
- `enableProjects` - Projects section
- `enableExperience` - Experience section
- `enableThemeSwitcher` - Theme toggle
- `enableMouseFollower` - Mouse follower animation
- `showDevelopmentProjects` - Show in-development projects

## 📁 Project Structure

```
portfolio-v4/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── projects/      # Projects API endpoints
│   │   ├── experience/    # Experience API endpoint
│   │   ├── credentials/   # Credentials API endpoint
│   │   ├── skills/        # Skills API endpoint
│   │   └── ratings/       # Rating endpoints
│   ├── projects/          # Project pages
│   ├── home/              # Home page components
│   ├── experience/        # Experience section
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── ratings/          # Rating components
│   └── ui/               # UI components
├── lib/                   # Utilities and configurations
│   ├── config/           # Feature flags configuration
│   └── db/               # Database utilities and queries
│       ├── turso-client.ts   # Turso client and schema
│       ├── projects.ts       # Project queries
│       ├── experience.ts     # Experience queries
│       ├── credentials.ts    # Credentials queries
│       └── skills.ts         # Skills queries
├── scripts/               # Utility scripts
│   ├── init-db.ts        # Database schema initialization
│   └── migrate-to-turso.ts  # Data migration script
├── data/                  # Legacy data files (for reference)
└── public/                # Static assets
```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:init` - Initialize database schema
- `npm run migrate` - Migrate data from TypeScript files to Turso database

### Adding a New Project

Projects are now stored in the Turso database. To add a new project:

#### Option 1: Direct Database Insert (Recommended for Production)

Use the Turso CLI or your database admin interface to insert directly:

```sql
INSERT INTO projects (
  id, title, date, role, timeline, summary, description,
  highlights, technologies, links, development, group_name
) VALUES (
  'my-project',
  'My Project',
  '2024',
  'Full Stack Developer',
  'Jan 2024 - Present',
  'Brief description...',
  'Detailed description...',
  '[{"title":"Feature 1","desc":"Description"}]',  -- JSON array
  '["React","Node.js","MongoDB"]',                  -- JSON array
  '{"github":["https://github.com/..."],"demo":"https://..."}',  -- JSON object
  0,                                                 -- Boolean: 0 or 1
  'Project Group'                                    -- Optional
);
```

#### Option 2: Update Data Files and Re-migrate (Development)

1. Edit `data/projects.ts` and add your project to the array
2. Re-run the migration script:
   ```bash
   npm run migrate
   ```

**Note:** The migration script uses `INSERT OR REPLACE`, so it will update existing projects with the same ID.

### API Usage

You can also add projects via the API routes (you may need to create POST endpoints):

```typescript
// Example for future enhancement
const response = await fetch('/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(projectData)
});
```

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/annuraggg/portfolio-v4)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy!

### Cloudflare Pages

1. Build the project:
```bash
npm run build
```

2. Deploy to Cloudflare Pages:
```bash
npx wrangler pages deploy .next
```

3. Add environment variables in Cloudflare Pages dashboard:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - Other required env vars

## 🔧 Configuration

### Tailwind CSS

Tailwind configuration is in `app/globals.css` using Tailwind v4's new configuration format.

### DaisyUI Themes

DaisyUI is configured in `app/globals.css`:

```css
@plugin "daisyui";
```

Customize themes in the CSS file or use DaisyUI's theme system.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Anurag Sawant - [@annuraggg](https://github.com/annuraggg)

Project Link: [https://github.com/annuraggg/portfolio-v4](https://github.com/annuraggg/portfolio-v4)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [ConfigCat](https://configcat.com/)
- [Turso](https://turso.tech/)
- [Framer Motion](https://www.framer.com/motion/)
