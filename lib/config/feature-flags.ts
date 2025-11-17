/**
 * Feature flags configuration
 * These flags control various features in the application
 */

export const FEATURE_FLAGS = {
  ENABLE_PROJECT_RATINGS: "enableprojectratings",
  ENABLE_CONTACT_FORM: "enablecontactform",
  ENABLE_PROJECTS: "enableprojects",
  ENABLE_EXPERIENCE: "enableexperience",
  ENABLE_THEME_SWITCHER: "enablethemeswitcher",
  ENABLE_MOUSE_FOLLOWER: "enablemousefollower",
  SHOW_DEVELOPMENT_PROJECTS: "showdevelopmentprojects",
} as const;

export type FeatureFlag = (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS];
