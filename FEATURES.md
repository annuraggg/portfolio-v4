# Features Guide

This document provides an overview of all features in the portfolio application.

## Core Features

### 1. Project Showcase

Display your projects with detailed information including:
- Project title, date, and timeline
- Role and technologies used
- Summary and detailed description
- Problem and solution statements
- Key highlights and achievements
- Live demo and GitHub links
- Screenshots gallery

**Location**: `/projects` and `/projects/[id]`

### 2. Project Ratings ⭐

**Status**: Production-ready  
**Controlled by**: `enableProjectRatings` feature flag

An interactive rating system that allows visitors to rate your projects:

#### Features:
- **5-star rating system** using DaisyUI components
- **Average rating display** with total number of ratings
- **One rating per user** - prevents duplicate ratings from the same visitor
- **Persistent storage** - uses Cloudflare D1 in production, in-memory for development
- **Real-time updates** - stats update immediately after rating
- **Visual feedback** - hover effects and disabled states

#### How it works:
1. User clicks on a star (1-5) to rate the project
2. Rating is submitted to the API
3. User identifier is stored in localStorage
4. Average and total count are calculated and displayed
5. User sees confirmation toast message

#### Data Storage:
- **Production**: Cloudflare D1 database
- **Development**: In-memory mock database
- **User Tracking**: Browser localStorage (anonymous)

#### API Endpoints:
- `POST /api/ratings/[projectId]` - Submit a rating
- `GET /api/ratings/[projectId]` - Get rating statistics
- `GET /api/ratings/[projectId]/check` - Check if user has rated

### 3. Feature Flags 🎚️

**Provider**: ConfigCat  
**SDK**: configcat-js

Dynamic feature toggling without code deployments:

#### Available Flags:

| Flag Name | Default | Description |
|-----------|---------|-------------|
| `enableProjectRatings` | Enabled | Show/hide project rating system |
| `enableContactForm` | Enabled | Show/hide contact form |
| `enableProjects` | Enabled | Show/hide projects section |
| `enableExperience` | Enabled | Show/hide experience section |
| `enableThemeSwitcher` | Enabled | Enable/disable theme toggle |
| `enableMouseFollower` | Enabled | Enable/disable mouse follower effect |
| `showDevelopmentProjects` | Disabled | Show projects marked as in development |

#### Usage:
```typescript
import { useFeatureFlags } from '@/lib/config/configcat-provider';
import { FEATURE_FLAGS } from '@/lib/config/feature-flags';

function MyComponent() {
  const { isFeatureEnabled } = useFeatureFlags();
  
  if (!isFeatureEnabled(FEATURE_FLAGS.ENABLE_PROJECT_RATINGS)) {
    return null;
  }
  
  return <RatingComponent />;
}
```

#### Benefits:
- Toggle features on/off instantly
- Gradual feature rollouts
- A/B testing capabilities
- Emergency kill switch
- No deployment required

### 4. Theme Switcher 🌓

**Status**: Built-in  
**Controlled by**: `enableThemeSwitcher` feature flag

Switch between light and dark themes:
- System preference detection
- Persistent theme selection
- Smooth transitions
- No flash of unstyled content (FOUC)

### 5. Contact Form 📧

**Status**: Integrated with EmailJS  
**Controlled by**: `enableContactForm` feature flag

Allow visitors to send you messages:
- Form validation
- Email notification via EmailJS
- Toast notifications for success/error
- Spam prevention

### 6. Experience Timeline

**Status**: Active  
**Controlled by**: `enableExperience` feature flag

Display your work experience and education:
- Timeline visualization
- Company/institution details
- Role and responsibilities
- Duration and dates

### 7. Skills Showcase

**Status**: Active

Interactive 3D icon cloud displaying your technical skills:
- Categorized by proficiency
- Interactive hover states
- Visual skill levels
- Technology stack display

### 8. Responsive Design 📱

**Status**: Built-in

Fully responsive layout that works on:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

### 9. Smooth Animations ✨

**Status**: Active  
**Library**: Framer Motion

Engaging user experience with:
- Page transitions
- Scroll animations
- Hover effects
- Loading states

### 10. Mouse Follower Effect 🖱️

**Status**: Active  
**Controlled by**: `enableMouseFollower` feature flag

Interactive cursor effect that follows mouse movement:
- Smooth animations
- Hover state changes
- Can be disabled via feature flag

## Performance Features

### Static Generation

Most pages are statically generated at build time for optimal performance:
- Home page
- Projects listing
- Contact page
- Experience page

### Image Optimization

Next.js automatic image optimization:
- Lazy loading
- Responsive images
- WebP format support
- Blur placeholder

### Code Splitting

Automatic code splitting for optimal bundle size:
- Route-based splitting
- Component lazy loading
- Dynamic imports

## SEO Features

- Meta tags configuration
- OpenGraph support
- Sitemap generation
- Robots.txt
- Semantic HTML

## Development Features

### Hot Module Replacement

Fast refresh during development with Turbopack:
- Instant feedback
- State preservation
- Error overlay

### TypeScript

Full TypeScript support:
- Type safety
- IntelliSense
- Better refactoring
- Compile-time error checking

### ESLint

Code quality enforcement:
- Next.js recommended rules
- React hooks rules
- TypeScript rules
- Custom rules

## Security Features

### Environment Variables

Sensitive data protection:
- `.env` files excluded from git
- TypeScript type definitions
- Client/server variable separation
- Example file provided

### API Route Protection

- Input validation
- Error handling
- Rate limiting ready
- CORS configuration ready

### Database Security

- Prepared statements (prevents SQL injection)
- Unique constraints
- Data validation
- User anonymization

## Upcoming Features

Features that could be added in the future:

- [ ] Analytics integration (Google Analytics, Plausible)
- [ ] Blog section with MDX support
- [ ] Project filtering and search
- [ ] Newsletter subscription
- [ ] Testimonials section
- [ ] Download resume functionality
- [ ] Multi-language support
- [ ] Accessibility improvements (WCAG 2.1 AA)
- [ ] PWA support
- [ ] Reading time estimates
- [ ] View counter
- [ ] Social sharing buttons

## Feature Flag Configuration

To configure feature flags in ConfigCat:

1. Log in to [ConfigCat Dashboard](https://app.configcat.com)
2. Navigate to your product
3. Create the feature flags listed above
4. Set default values
5. (Optional) Configure targeting rules
6. Copy your SDK key to `.env.local`

See [lib/config/README.md](lib/config/README.md) for detailed setup instructions.

## Database Configuration

To set up the ratings database:

1. Create a Cloudflare account
2. Install Wrangler CLI
3. Create a D1 database
4. Run migrations
5. Add D1 binding to your deployment

See [db/README.md](db/README.md) for detailed setup instructions.

## Contributing

To add a new feature:

1. Create the feature implementation
2. Add a corresponding feature flag (if toggleable)
3. Update this documentation
4. Add tests if applicable
5. Update the README.md
6. Submit a pull request

---

For questions or issues, please open an issue on GitHub.
