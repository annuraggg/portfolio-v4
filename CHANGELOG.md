# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Project rating system with DaisyUI star ratings
- Cloudflare D1 database integration for ratings storage
- Mock in-memory database for local development
- ConfigCat feature flag management system
- 7 configurable feature flags for dynamic feature toggling
- API routes for rating operations (`/api/ratings/[projectId]`)
- Rating statistics display (average rating + total count)
- User rating tracking to prevent duplicate ratings
- Comprehensive deployment guide (`DEPLOYMENT.md`)
- Features documentation (`FEATURES.md`)
- Database setup guide (in `README.md`)
- Feature flags documentation (`FEATURE_FLAGS.md`)
- Feature flags setup guide (`lib/config/README.md`)
- Environment variable examples (`.env.example`)
- TypeScript type definitions for environment variables
- Database migration SQL in README
- Wrangler configuration for Cloudflare deployment
- Toast notifications using Sonner
- Updated README with complete setup instructions

### Changed
- Fixed Google Fonts integration for production builds
- Updated `.gitignore` to include `.env.example` and exclude Cloudflare files
- Improved project detail page layout with rating section
- Enhanced ConfigCat provider with better error handling
- Modified layout to include ConfigCat provider and toast notifications

### Fixed
- Google Fonts network request issues in restricted environments
- Build errors related to font loading
- ESLint warnings in ConfigCat provider
- ESLint errors in rating API routes
- TypeScript errors in ConfigCat API usage

### Security
- Added input validation for rating submissions
- Implemented user identifier tracking for rating fraud prevention
- Prepared statements in database queries to prevent SQL injection
- Environment variable separation for client/server
- Secure storage of user identifiers in localStorage (anonymous)

## [0.1.0] - 2025-11-16

### Initial Release
- Next.js 15 portfolio application
- Project showcase with detailed pages
- Experience timeline
- Skills showcase with 3D icon cloud
- Contact form with EmailJS integration
- Theme switcher (light/dark mode)
- Mouse follower effect
- Responsive design
- Smooth animations with Framer Motion
- DaisyUI + Tailwind CSS styling
- TypeScript support
- ESLint configuration

---

## Categories

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes and security improvements
