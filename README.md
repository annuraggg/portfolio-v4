# Portfolio v4

A modern, production-ready portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features include project showcases, rating system, and feature flag management.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS v4
- **Project Ratings**: Interactive star ratings powered by Cloudflare D1 database
- **Feature Flags**: ConfigCat integration for feature toggling without deployments
- **Responsive Design**: DaisyUI components with custom theming
- **Smooth Animations**: Framer Motion for engaging user experience
- **Dark Mode**: Built-in theme switching support
- **Type-Safe**: Full TypeScript coverage
- **Production-Ready**: Optimized build configuration and best practices

## 📋 Prerequisites

- Node.js 18+ and npm
- (Optional) Cloudflare account for D1 database
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

# Cloudflare D1 Database (optional for local dev)
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=your_database_id
CLOUDFLARE_API_TOKEN=your_api_token

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

## 🗄️ Database Setup (D1)

The project uses Cloudflare D1 for storing project ratings. The application uses a single D1 database instance for both development and production.

### Prerequisites

- Cloudflare account
- Wrangler CLI installed: `npm install -g wrangler`

### Setup Steps

1. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

2. **Create D1 Database**
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

3. **Run Database Migration**
   
   Create a file `migrations.sql` with the following content:
   
   ```sql
   -- Create ratings table for storing project ratings
   CREATE TABLE IF NOT EXISTS ratings (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     project_id TEXT NOT NULL,
     rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
     user_identifier TEXT NOT NULL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     UNIQUE(project_id, user_identifier)
   );

   -- Create index for faster lookups
   CREATE INDEX IF NOT EXISTS idx_project_id ON ratings(project_id);
   CREATE INDEX IF NOT EXISTS idx_user_identifier ON ratings(project_id, user_identifier);

   -- Create aggregated view for ratings statistics
   CREATE VIEW IF NOT EXISTS project_ratings_stats AS
   SELECT 
     project_id,
     COUNT(*) as total_ratings,
     AVG(rating) as average_rating
   FROM ratings
   GROUP BY project_id;
   ```
   
   Then run:
   ```bash
   wrangler d1 execute portfolio-ratings --file=./migrations.sql
   ```

4. **Verify Database**
   ```bash
   wrangler d1 execute portfolio-ratings --command="SELECT name FROM sqlite_master WHERE type='table';"
   ```
   
   You should see the `ratings` table listed.

### Local Development

For local development with Wrangler:

```bash
npx wrangler dev
```

This will start the Next.js dev server with D1 database bindings available.

### Production Deployment

When deploying to Cloudflare Pages:

1. Set up the D1 binding in your Pages project settings
2. Bind the database with the name `DB` (matching your wrangler.toml)
3. The application will automatically use the D1 database

### Database Operations

#### View all ratings for a project
```bash
wrangler d1 execute portfolio-ratings --command="SELECT * FROM ratings WHERE project_id='your-project-id';"
```

#### Get rating statistics
```bash
wrangler d1 execute portfolio-ratings --command="SELECT * FROM project_ratings_stats;"
```

#### Clear all ratings (use with caution)
```bash
wrangler d1 execute portfolio-ratings --command="DELETE FROM ratings;"
```

### Database Schema

**Table: `ratings`**
- `id`: Auto-incrementing primary key
- `project_id`: String identifier for the project
- `rating`: Integer between 1-5
- `user_identifier`: Unique identifier for the user
- `created_at`: Timestamp of when the rating was created

**View: `project_ratings_stats`**
- `project_id`: Project identifier
- `total_ratings`: Count of all ratings for the project
- `average_rating`: Average rating score

Users can only rate each project once (enforced by unique constraint on `project_id` + `user_identifier`).

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
│   └── db/               # Database utilities (D1 client)
├── data/                  # Static data (projects, skills, etc.)
└── public/                # Static assets
```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding a New Project

Edit `data/projects.ts` and add your project to the array:

```typescript
{
  id: "my-project",
  title: "My Project",
  date: "2024",
  role: "Full Stack Developer",
  timeline: "Jan 2024 - Present",
  summary: "Brief description...",
  description: "Detailed description...",
  highlights: [...],
  technologies: [...],
  links: {
    github: ["https://github.com/..."],
    demo: "https://..."
  }
}
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

2. Deploy to Cloudflare Pages with D1 binding:
```bash
wrangler pages deploy out
```

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
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Framer Motion](https://www.framer.com/motion/)
