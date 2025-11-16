# Feature Flags with ConfigCat

This project uses ConfigCat for feature flag management, allowing you to toggle features on/off without deploying code.

## Setup

### 1. Create a ConfigCat Account

1. Go to [https://app.configcat.com](https://app.configcat.com)
2. Sign up for a free account
3. Create a new product (e.g., "Portfolio")

### 2. Get Your SDK Key

1. In ConfigCat dashboard, go to your product
2. Navigate to "SDK Keys" 
3. Copy the "SDK Key" for your environment
4. Add it to your `.env.local` file:

```bash
NEXT_PUBLIC_CONFIGCAT_SDK_KEY=your_sdk_key_here
```

### 3. Create Feature Flags

Create the following feature flags in ConfigCat dashboard:

| Flag Name | Type | Default Value | Description |
|-----------|------|---------------|-------------|
| `enableProjectRatings` | Boolean | `true` | Enable/disable the project rating feature |
| `enableContactForm` | Boolean | `true` | Show/hide the contact form |
| `enableProjects` | Boolean | `true` | Show/hide the projects section |
| `enableExperience` | Boolean | `true` | Show/hide the experience section |
| `enableThemeSwitcher` | Boolean | `true` | Enable/disable theme switching |
| `enableMouseFollower` | Boolean | `true` | Enable/disable mouse follower animation |
| `showDevelopmentProjects` | Boolean | `false` | Show projects marked as in development |

### 4. Configure Targeting Rules (Optional)

You can create targeting rules in ConfigCat to:
- Enable features for specific users
- Rollout features gradually (percentage-based rollout)
- Enable features based on custom attributes
- A/B test different features

## Usage in Code

### Check if a feature is enabled

```typescript
import { useFeatureFlags } from '@/lib/config/configcat-provider';
import { FEATURE_FLAGS } from '@/lib/config/feature-flags';

function MyComponent() {
  const { isFeatureEnabled, isLoading } = useFeatureFlags();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!isFeatureEnabled(FEATURE_FLAGS.ENABLE_PROJECT_RATINGS)) {
    return null; // Feature is disabled
  }
  
  return <RatingComponent />;
}
```

### Available Feature Flags

All feature flags are defined in `lib/config/feature-flags.ts`:

```typescript
export const FEATURE_FLAGS = {
  ENABLE_PROJECT_RATINGS: 'enableProjectRatings',
  ENABLE_CONTACT_FORM: 'enableContactForm',
  ENABLE_PROJECTS: 'enableProjects',
  ENABLE_EXPERIENCE: 'enableExperience',
  ENABLE_THEME_SWITCHER: 'enableThemeSwitcher',
  ENABLE_MOUSE_FOLLOWER: 'enableMouseFollower',
  SHOW_DEVELOPMENT_PROJECTS: 'showDevelopmentProjects',
};
```

## How It Works

1. **Provider**: The `ConfigCatProvider` wraps the entire application in `app/layout.tsx`
2. **Client**: Initializes the ConfigCat SDK with auto-polling (checks for updates every 60 seconds)
3. **Hook**: Use the `useFeatureFlags()` hook to access feature flags in any component
4. **Fallback**: If no SDK key is provided, all flags default to `false`

## Benefits

- **No Deployment Required**: Toggle features on/off instantly
- **Gradual Rollouts**: Release features to a percentage of users
- **Kill Switch**: Quickly disable problematic features
- **A/B Testing**: Test different features with different user segments
- **User Targeting**: Enable features for specific users or groups
- **Audit Log**: Track who changed what and when

## Local Development

For local development without a ConfigCat account:
- All feature flags will default to `false`
- You'll see a warning in the console: "ConfigCat SDK key not found"
- To enable features, add a valid SDK key to `.env.local`

## Production Deployment

Add the `NEXT_PUBLIC_CONFIGCAT_SDK_KEY` environment variable to your deployment platform:

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Build & Deploy → Environment
- **Cloudflare Pages**: Settings → Environment Variables

## Monitoring

ConfigCat provides:
- Real-time feature flag usage statistics
- Audit log of all changes
- Integration with analytics tools
- Webhook notifications for flag changes
