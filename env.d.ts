declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CONFIGCAT_SDK_KEY?: string;
      CLOUDFLARE_ACCOUNT_ID?: string;
      CLOUDFLARE_DATABASE_ID?: string;
      CLOUDFLARE_API_TOKEN?: string;
      DATABASE_URL?: string;
      NEXT_PUBLIC_EMAILJS_SERVICE_ID?: string;
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?: string;
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?: string;
    }
  }
}

export {};
