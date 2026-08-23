const fallbackUrl = "https://tireddesimom.com";

export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackUrl);
