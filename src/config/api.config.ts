export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://api-travel.agenteviajes.com';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://api-travel-web.rvbxuq.easypanel.host';

export const API_ENDPOINTS = {
  tours:           `${API_BASE_URL}/v1/integracion/tours`,
  faqs:            `${API_BASE_URL}/v1/integracion/faqs`,
  ncFolderImages:  `${API_BASE_URL}/v1/nextcloud/nc-folder-images`,
} as const;

export const REVALIDATE_SECONDS = 3600;
