// API service functions for authentication
const API_BASE_URL = 'http://localhost:5000/v1';

export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  email: string;
  mobileNo: string;
}

export interface UserRegistrationResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: 'male' | 'female';
    mobileNo: string;
  };
}

export interface LoginRequest {
  email: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
  };
}

export interface OtpVerificationRequest {
  email: string;
  otp: number;
}

export interface OtpVerificationResponse {
  success: boolean;
  message: string;
  data: {
    info: {
      user: {
        id: string;
        firstName: string;
        lastName: string;
        gender: 'male' | 'female';
        email: string;
        mobileNo: string;
        joining_date: string;
        role: 'user' | 'admin';
      };
      token: string;
    };
    message: string;
  };
}

// User Registration API
export const registerUser = async (userData: UserRegistrationData): Promise<UserRegistrationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Send OTP for Login API
export const sendLoginOtp = async (email: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending login OTP:', error);
    throw error;
  }
};

// Verify OTP API
export const verifyOtp = async (email: string, otp: number): Promise<OtpVerificationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

// Token management utilities
export const TOKEN_KEY = 'auth_token';
export const USER_KEY = 'auth_user';

export const saveToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
    console.log('✅ Token saved to localStorage:', token.substring(0, 20) + '...');
  }
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('🔍 Token retrieved from localStorage:', token ? token.substring(0, 20) + '...' : 'null');
    return token;
  }
  return null;
};

export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    console.log('🗑️ Token removed from localStorage');
  }
};

export const saveUser = (user: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log('✅ User saved to localStorage:', user.email);
  }
};

export const getUser = (): any | null => {
  if (typeof window !== 'undefined') {
    try {
      const userStr = localStorage.getItem(USER_KEY);
      const user = userStr ? JSON.parse(userStr) : null;
      console.log('🔍 User retrieved from localStorage:', user ? user.email : 'null');
      return user;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  }
  return null;
};

export const removeUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
    console.log('🗑️ User removed from localStorage');
  }
};

export const clearAuth = (): void => {
  removeToken();
  removeUser();
  console.log('🧹 Auth data cleared from localStorage');
};

// Check if token is valid (basic JWT validation)
export const isTokenValid = (token: string): boolean => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    const isValid = payload.exp > currentTime;
    
    console.log('🔍 Token validation:', {
      token: token.substring(0, 20) + '...',
      expiresAt: new Date(payload.exp * 1000),
      currentTime: new Date(),
      isValid
    });
    
    return isValid;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

// Get auth headers for API requests
export const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  console.log('🔑 Getting auth headers with token:', token ? token.substring(0, 20) + '...' : 'null');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Get current auth state from localStorage
export const getAuthState = (): { user: any | null; token: string | null; isAuthenticated: boolean; isLoading: boolean } => {
  const token = getToken();
  const user = getUser();
  const isValid = token ? isTokenValid(token) : false;
  
  console.log('🔍 Auth state check:', {
    hasToken: !!token,
    hasUser: !!user,
    isValid,
    isAuthenticated: !!(token && user && isValid)
  });
  
  return {
    user: isValid ? user : null,
    token: isValid ? token : null,
    isAuthenticated: !!(token && user && isValid),
    isLoading: false,
  };
};

// Get current user profile API
export const getCurrentUser = async (userId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
