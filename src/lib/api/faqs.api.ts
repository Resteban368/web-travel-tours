import { API_ENDPOINTS, REVALIDATE_SECONDS } from '@/config/api.config';
import type { Faq } from '@/lib/types/faq.types';

class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export const faqsApi = {
  getAll: async (): Promise<Faq[]> => {
    const res = await fetch(API_ENDPOINTS.faqs, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) throw new ApiError('Error al obtener FAQs', res.status);
    const data: Faq[] = await res.json();
    return data;
  },
};
