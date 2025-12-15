import { Banner, CreateBannerDTO, UpdateBannerDTO } from "../types/dashboard-banner-tab";
import { API_BASE_URL } from './config';
import { getAuthHeaders } from './authApi';

// ============================================
// SERVER-SIDE API CALLS (for SSR)
// ============================================

export async function fetchBannersServer(): Promise<Banner[]> {
  try {
    // Try the backend API first
    const res = await fetch(`${API_BASE_URL}/banner/`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.warn('Backend banner API not available, returning empty array');
      return [];
    }

    const data = await res.json();
    return data.data || data.banners || [];
  } catch (error) {
    console.warn('Server Error fetching banners:', error);
    return [];
  }
}

// ============================================
// CLIENT-SIDE API CALLS
// ============================================

export async function fetchBannersClient(): Promise<Banner[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/banner/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.warn('Backend banner API not available');
      return [];
    }

    const data = await res.json();
    return data.data || data.banners || [];
  } catch (error) {
    console.warn('Error fetching banners:', error);
    return [];
  }
}

export async function fetchBannersByType(type: string): Promise<Banner[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/banner/?type=${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch banners by type');
    }

    const data = await res.json();
    return data.banners || [];
  } catch (error) {
    console.error('Error fetching banners by type:', error);
    throw error;
  }
}

export async function createBannerApi(payload: CreateBannerDTO): Promise<Banner> {
  try {
    const res = await fetch(`${API_BASE_URL}/banner/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { raw: errorText };
      }

      console.error(`Create banner failed (Status: ${res.status} ${res.statusText})`, {
        error: errorData,
        rawResponse: errorText,
        payload
      });
      throw new Error((errorData && (errorData.message || errorData.error)) || `Failed to create banner: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.banner;
  } catch (error) {
    console.error('Error creating banner:', error);
    throw error;
  }
}

export async function updateBannerApi(id: string, payload: UpdateBannerDTO): Promise<Banner> {
  try {
    const res = await fetch(`${API_BASE_URL}/banner/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to update banner');
    }

    const data = await res.json();
    return data.banner;
  } catch (error) {
    console.error('Error updating banner:', error);
    throw error;
  }
}

export async function deleteBannerApi(id: string): Promise<void> {
  try {
    const res = await fetch(`${API_BASE_URL}/banner/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to delete banner');
    }
  } catch (error) {
    console.error('Error deleting banner:', error);
    throw error;
  }
}

// Replaced broken /v1/upload with R2 upload flow
import { uploadToR2 } from './utils/r2Client';

export async function uploadImageApi(file: File): Promise<string> {
  try {
    const uploaded = await uploadToR2(file);
    // Return the key, which the R2Image component can resolve
    return uploaded.key;
  } catch (error) {
    console.error('Error uploading image to R2:', error);
    throw error;
  }
}
