# Feature Flags Configuration

This document describes all the feature flags used in the portfolio application. These flags are managed through ConfigCat and allow you to enable/disable features dynamically without deploying code changes.

## ConfigCat Setup

1. Log in to your ConfigCat account at https://app.configcat.com
2. Navigate to your project settings
3. Add the following feature flags with their respective keys

## Feature Flags

### 1. Project Ratings
**Key:** `enableProjectRatings`  
**Type:** Boolean  
**Default Value:** `false`  
**Description:** Controls whether the project rating system is visible on project detail pages. When enabled, users can rate projects and see average ratings.

**Usage:**
- Component: `app/projects/[id]/Rating.tsx`
- Shows/hides the rating interface on project pages
- Affects rating submission, display, and statistics

---

### 2. Contact Form
**Key:** `enableContactForm`  
**Type:** Boolean  
**Default Value:** `true`  
**Description:** Controls the visibility of the contact form on the contact page.

**Usage:**
- Component: `app/contact/ContactForm.tsx`
- Shows/hides the email contact form
- When disabled, users won't be able to submit contact messages

---

### 3. Projects Showcase
**Key:** `enableProjects`  
**Type:** Boolean  
**Default Value:** `true`  
**Description:** Controls whether the projects page and project listings are visible.

**Usage:**
- Component: `app/projects/page.tsx`
- Shows/hides the entire projects section
- When disabled, shows a message that projects are unavailable

---

### 4. Experience Section
**Key:** `enableExperience`  
**Type:** Boolean  
**Default Value:** `true`  
**Description:** Controls the visibility of the experience and credentials section.

**Usage:**
- Component: `app/experience/page.tsx`
- Shows/hides work experience and credentials
- When disabled, shows a message that experience section is unavailable

---

### 5. Theme Switcher
**Key:** `enableThemeSwitcher`  
**Type:** Boolean  
**Default Value:** `true`  
**Description:** Controls whether the dark/light theme toggle button is visible.

**Usage:**
- Component: `components/ui/animated-theme-toggler.tsx`
- Shows/hides the theme switcher button
- When disabled, users are locked to their system theme or default theme

---

### 6. Mouse Follower
**Key:** `enableMouseFollower`  
**Type:** Boolean  
**Default Value:** `true`  
**Description:** Controls the animated mouse follower dot effect.

**Usage:**
- Component: `components/MouseFollower.tsx`
- Shows/hides the blue dot that follows the mouse cursor
- Useful to disable for performance reasons or accessibility

---

### 7. Development Projects
**Key:** `showDevelopmentProjects`  
**Type:** Boolean  
**Default Value:** `false`  
**Description:** Controls whether projects marked as "in development" are shown.

**Usage:**
- Used to toggle visibility of work-in-progress projects
- Helps in staging environments or for preview purposes

---

## Implementation Notes

### Adding a New Feature Flag

1. **Define the flag key in the code:**
   ```typescript
   // lib/config/feature-flags.ts
   export const FEATURE_FLAGS = {
     YOUR_NEW_FLAG: 'yourNewFlagKey',
     // ... other flags
   } as const;
   ```

2. **Use the flag in your component:**
   ```typescript
   import { useFeatureFlag } from 'configcat-react';

   const YourComponent = () => {
     const { value: isEnabled, loading } = useFeatureFlag(
       'yourNewFlagKey',
       false // default value
     );

     if (loading) return <LoadingState />;
     if (!isEnabled) return null;

     return <YourFeature />;
   };
   ```

3. **Add the flag to ConfigCat:**
   - Log in to ConfigCat dashboard
   - Create a new feature flag with the same key
   - Set the default value and targeting rules

### Best Practices

- Always provide a sensible default value
- Handle the loading state appropriately
- Consider the user experience when a feature is disabled
- Test both enabled and disabled states
- Document any dependencies between feature flags

### Environment-Specific Values

You can configure different values for different environments in ConfigCat:
- **Development:** More permissive, show experimental features
- **Staging:** Mirror production or test specific scenarios
- **Production:** Conservative, only show stable features

### SDK Configuration

The ConfigCat SDK is initialized in `app/layout.tsx` using the `NEXT_PUBLIC_CONFIGCAT_SDK_KEY` environment variable.

```typescript
const CONFIGCAT_SDK_KEY = process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY;
```

Make sure this environment variable is set in your deployment environment.
