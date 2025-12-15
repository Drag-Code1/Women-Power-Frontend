// types/banner.ts
export type BannerType = 'banner';

export interface Banner {
  id: string;
  type: BannerType;
  img_url: string;
  createdAt: string;
}

export interface BannerTypeConfig {
  label: string;
  description: string;
  maxCount: number;
  recommended: string;
}

export interface CreateBannerDTO {
  type: string;
  page_name: string;
  img_url: string;
}

export interface UpdateBannerDTO {
  img_url: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const BANNER_TYPE_CONFIG: Record<BannerType, BannerTypeConfig> = {
  banner: {
    label: 'Home Banner',
    description: 'Main banner at the top of homepage',
    maxCount: Infinity,
    recommended: '1200x400px'
  }
};