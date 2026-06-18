import { API_ENDPOINTS, REVALIDATE_SECONDS } from '@/config/api.config';
import type { NcImage } from '@/lib/types/nextcloud.types';

export const nextcloudApi = {
  getFolderImages: async (path: string): Promise<NcImage[]> => {
    const url = `${API_ENDPOINTS.ncFolderImages}?path=${encodeURIComponent(path)}`;
    try {
      const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
      if (!res.ok) return [];
      const data: unknown = await res.json();
      if (Array.isArray(data)) return data as NcImage[];
      if (data && typeof data === 'object' && 'images' in data && Array.isArray((data as { images: unknown }).images)) {
        return (data as { images: NcImage[] }).images;
      }
      return [];
    } catch {
      return [];
    }
  },
};
