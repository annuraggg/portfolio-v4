/**
 * Feature flags configuration
 * These flags control various features in the application
 */

export const FEATURE_FLAGS = {
  // Project ratings feature
  ENABLE_PROJECT_RATINGS: 'enableProjectRatings',
  
  // Contact form feature
  ENABLE_CONTACT_FORM: 'enableContactForm',
  
  // Projects showcase
  ENABLE_PROJECTS: 'enableProjects',
  
  // Experience section
  ENABLE_EXPERIENCE: 'enableExperience',
  
  // Theme switcher
  ENABLE_THEME_SWITCHER: 'enableThemeSwitcher',
  
  // Mouse follower animation
  ENABLE_MOUSE_FOLLOWER: 'enableMouseFollower',
  
  // Development mode projects
  SHOW_DEVELOPMENT_PROJECTS: 'showDevelopmentProjects',
} as const;

export type FeatureFlag = typeof FEATURE_FLAGS[keyof typeof FEATURE_FLAGS];
