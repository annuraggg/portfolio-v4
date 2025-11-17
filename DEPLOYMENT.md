# Production Deployment Guide

This guide covers deploying your portfolio to production with all features enabled.

## Table of Contents

- [Vercel Deployment](#vercel-deployment)
- [Cloudflare Pages Deployment](#cloudflare-pages-deployment)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Feature Flags Setup](#feature-flags-setup)
- [Post-Deployment Checklist](#post-deployment-checklist)

## Vercel Deployment

### Prerequisites
- GitHub account with your repository
- Vercel account

### Steps

1. **Connect Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Select the portfolio-v4 repository

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build` (or leave as default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

3. **Add Environment Variables**
   
   Go to Project Settings → Environment Variables and add:

   ```
   NEXT_PUBLIC_CONFIGCAT_SDK_KEY=<your-configcat-sdk-key>
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=<your-emailjs-service-id>
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=<your-emailjs-template-id>
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=<your-emailjs-public-key>
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `your-project.vercel.app`

5. **Add Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS as instructed

### Important Notes for Vercel

- **Database**: The app uses Turso (libSQL) which works seamlessly with Vercel.
- **Environment Variables**: Add `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in your Vercel project settings.
- **Edge Runtime**: API routes use Node.js runtime for Turso compatibility.

### Setting Up Turso for Vercel

1. Create a Turso database (see Database Setup section in README.md)
2. Get your database URL and auth token
3. Add them as environment variables in Vercel:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
4. Run `npm run db:init` locally with these environment variables to initialize the schema

## Cloudflare Pages Deployment

Cloudflare Pages works great with Turso for database storage.

### Prerequisites
- Cloudflare account
- Turso account and database (see Database Setup in README.md)

### Steps

1. **Login to Cloudflare**
   ```bash
   npx wrangler login
   ```

2. **Build the Project**
   ```bash
   npm run build
   ```

3. **Create Pages Project**
   ```bash
   npx wrangler pages project create portfolio-v4
   ```

4. **Deploy**
   ```bash
   npx wrangler pages deploy .next
   ```

5. **Add Environment Variables**
   
   In Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables:
   
   ```
   TURSO_DATABASE_URL=<your-turso-database-url>
   TURSO_AUTH_TOKEN=<your-turso-auth-token>
   NEXT_PUBLIC_CONFIGCAT_SDK_KEY=<your-key>
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=<your-service-id>
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=<your-template-id>
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=<your-public-key>
   ```

### Continuous Deployment with Cloudflare Pages

1. **Connect Git Repository**
   - In Cloudflare Dashboard → Pages
   - Click "Connect to Git"
   - Authorize Cloudflare to access your repository
   - Select the portfolio-v4 repository

2. **Configure Build Settings**
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output directory: `.next`

3. **Add Environment Variables** (as above)

4. **Deploy**
   - Push to your main branch
   - Cloudflare automatically builds and deploys

## Environment Variables

### Required for Full Functionality

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `TURSO_DATABASE_URL` | Turso database URL | [Turso Dashboard](https://turso.tech) or CLI (`turso db show <name> --url`) |
| `TURSO_AUTH_TOKEN` | Turso authentication token | Turso CLI (`turso db tokens create <name>`) |
| `NEXT_PUBLIC_CONFIGCAT_SDK_KEY` | ConfigCat SDK key for feature flags | [ConfigCat Dashboard](https://app.configcat.com) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID | [EmailJS Dashboard](https://dashboard.emailjs.com) |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID | [EmailJS Dashboard](https://dashboard.emailjs.com) |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key | [EmailJS Dashboard](https://dashboard.emailjs.com) |

## Database Setup

### For Production (All Platforms)

Follow the Database Setup section in the [README.md](../README.md#database-setup-turso) for detailed instructions on setting up Turso.

Quick steps:
1. Install Turso CLI: `curl -sSfL https://get.tur.so/install.sh | bash`
2. Create database: `turso db create portfolio-ratings`
3. Get URL: `turso db show portfolio-ratings --url`
4. Create token: `turso db tokens create portfolio-ratings`
5. Initialize schema: `npm run db:init` (with env vars set)

### For Local Development

For local development, the app uses a local SQLite file by default. No additional setup required!

1. Run `npm run db:init` to initialize the schema
2. The database file `local.db` will be created automatically
3. Run `npm run dev` to start development

## Feature Flags Setup

1. **Create ConfigCat Account**
   - Sign up at [ConfigCat](https://app.configcat.com)
   - Create a new product

2. **Get SDK Key**
   - Navigate to SDK Keys in your ConfigCat dashboard
   - Copy the SDK key for your environment

3. **Create Feature Flags**
   
   Create these boolean flags in ConfigCat:
   - `enableProjectRatings` (default: true)
   - `enableContactForm` (default: true)
   - `enableProjects` (default: true)
   - `enableExperience` (default: true)
   - `enableThemeSwitcher` (default: true)
   - `enableMouseFollower` (default: true)
   - `showDevelopmentProjects` (default: false)

4. **Add to Environment Variables**
   ```bash
   NEXT_PUBLIC_CONFIGCAT_SDK_KEY=your_sdk_key_here
   ```

See [lib/config/README.md](../lib/config/README.md) for detailed feature flag documentation.

## Post-Deployment Checklist

After deploying, verify:

- [ ] Site loads correctly
- [ ] All pages are accessible
- [ ] Project detail pages work
- [ ] Rating system works (test on a project)
- [ ] Contact form sends emails
- [ ] Theme switcher works
- [ ] Mobile responsiveness
- [ ] Performance metrics (Lighthouse)
- [ ] SEO metadata is correct
- [ ] Analytics tracking (if configured)
- [ ] Custom domain works (if applicable)
- [ ] SSL certificate is active

## Monitoring and Maintenance

### Analytics

Consider adding:
- Google Analytics
- Vercel Analytics
- Cloudflare Web Analytics
- Plausible Analytics

### Error Tracking

Recommended tools:
- Sentry
- LogRocket
- Rollbar

### Performance Monitoring

- Lighthouse CI
- WebPageTest
- Core Web Vitals monitoring

## Troubleshooting

### Build Fails

1. Check Node.js version (requires 18+)
2. Clear cache: `rm -rf .next node_modules && npm install`
3. Check for TypeScript errors: `npm run type-check` (if script exists)

### Ratings Not Working

1. Verify Turso database credentials are set correctly (`TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`)
2. Check environment variables are set in your deployment platform
3. Ensure database schema is initialized (`npm run db:init`)
4. Verify API routes are deployed
5. Check browser console and server logs for errors

### Feature Flags Not Working

1. Verify ConfigCat SDK key is correct
2. Check feature flags are created in ConfigCat dashboard
3. Check browser console for ConfigCat errors
4. Verify environment variable starts with `NEXT_PUBLIC_`

### Contact Form Not Working

1. Verify EmailJS credentials
2. Check EmailJS template exists
3. Test EmailJS service independently
4. Check browser console for errors

## Security Considerations

- Never commit `.env` files to git
- Use environment variables for all secrets
- Enable CORS protection on API routes
- Implement rate limiting on API endpoints
- Keep dependencies updated
- Use Content Security Policy headers
- Enable HTTPS only

## Performance Optimization

- Enable Next.js Image Optimization
- Use static generation where possible
- Implement caching strategies
- Optimize font loading
- Minimize bundle size
- Use CDN for static assets
- Enable compression

## Support

For issues or questions:
- Check existing GitHub issues
- Create a new issue with detailed information
- Review documentation in `/lib/config/` and `/db/`

---

Good luck with your deployment! 🚀
