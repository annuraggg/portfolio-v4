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

## 🗄️ Database Setup (Optional)

The project uses Cloudflare D1 for storing project ratings. For local development, an in-memory mock database is used automatically.

To set up the production database:

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Follow the detailed setup guide in [db/README.md](./db/README.md)

## 🎚️ Feature Flags Setup (Optional)

The project uses ConfigCat for feature flag management. All features work without ConfigCat, but you won't be able to toggle them dynamically.

To set up feature flags:

1. Create a free account at [ConfigCat](https://app.configcat.com)
2. Follow the setup guide in [lib/config/README.md](./lib/config/README.md)

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
│   ├── config/           # Feature flags (ConfigCat)
│   └── db/               # Database utilities
├── data/                  # Static data (projects, skills, etc.)
├── db/                    # Database migrations and docs
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
