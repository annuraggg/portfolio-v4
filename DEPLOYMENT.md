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

- **D1 Database**: Vercel doesn't support Cloudflare D1 directly. The app will use the in-memory mock database for ratings.
- **Alternative**: Use Vercel's PostgreSQL or another database adapter for production ratings storage.
- **Edge Functions**: Consider using Vercel Edge Functions for optimal performance.

## Cloudflare Pages Deployment

Cloudflare Pages provides native D1 database support, making it ideal for this project.

### Prerequisites
- Cloudflare account
- Wrangler CLI installed (`npm install -g wrangler`)

### Steps

1. **Login to Wrangler**
   ```bash
   wrangler login
   ```

2. **Create D1 Database**
   ```bash
   wrangler d1 create portfolio-ratings
   ```
   
   Copy the database ID from the output.

3. **Update wrangler.toml**
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "portfolio-ratings"
   database_id = "your-database-id-here"
   ```

4. **Run Database Migrations**
   ```bash
   wrangler d1 execute portfolio-ratings --file=./db/migrations/001_create_ratings.sql
   ```

5. **Build the Project**
   ```bash
   npm run build
   ```

6. **Create Pages Project**
   ```bash
   wrangler pages project create portfolio-v4
   ```

7. **Deploy**
   ```bash
   wrangler pages deploy .next
   ```

8. **Add D1 Binding**
   
   In Cloudflare Dashboard:
   - Go to Pages → Your Project → Settings → Functions
   - Add D1 database binding:
     - Variable name: `DB`
     - D1 database: Select your `portfolio-ratings` database

9. **Add Environment Variables**
   
   In Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables:
   
   ```
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

3. **Add D1 Binding and Environment Variables** (as above)

4. **Deploy**
   - Push to your main branch
   - Cloudflare automatically builds and deploys

## Environment Variables

### Required for Full Functionality

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_CONFIGCAT_SDK_KEY` | ConfigCat SDK key for feature flags | [ConfigCat Dashboard](https://app.configcat.com) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID | [EmailJS Dashboard](https://dashboard.emailjs.com) |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID | [EmailJS Dashboard](https://dashboard.emailjs.com) |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key | [EmailJS Dashboard](https://dashboard.emailjs.com) |

### Optional (Cloudflare Pages Only)

| Variable | Description |
|----------|-------------|
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| `CLOUDFLARE_DATABASE_ID` | D1 database ID |
| `CLOUDFLARE_API_TOKEN` | API token with D1 permissions |

## Database Setup

### For Cloudflare Pages (Production)

1. Create the database:
   ```bash
   wrangler d1 create portfolio-ratings
   ```

2. Run migrations:
   ```bash
   wrangler d1 execute portfolio-ratings --file=./db/migrations/001_create_ratings.sql
   ```

3. Verify:
   ```bash
   wrangler d1 execute portfolio-ratings --command="SELECT name FROM sqlite_master WHERE type='table';"
   ```

See [db/README.md](../db/README.md) for detailed database documentation.

### For Vercel or Other Platforms

The app includes a mock in-memory database for development and platforms that don't support D1. To use a real database:

1. Choose a database (PostgreSQL, MySQL, etc.)
2. Create a new adapter in `lib/db/`
3. Update API routes in `app/api/ratings/` to use your adapter

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

1. Verify D1 database is properly bound (Cloudflare Pages)
2. Check environment variables are set
3. Verify API routes are deployed
4. Check browser console for errors

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
