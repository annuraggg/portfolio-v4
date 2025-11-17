declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CONFIGCAT_SDK_KEY?: string;
      TURSO_DATABASE_URL?: string;
      TURSO_AUTH_TOKEN?: string;
      NEXT_PUBLIC_EMAILJS_SERVICE_ID?: string;
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?: string;
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?: string;
    }
  }
}

export {};
