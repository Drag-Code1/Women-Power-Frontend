// Token Debugger - Run this in browser console to check token status

export const checkTokenInBrowser = (): { token: string | null; user: string | null } => {
  console.log('🔍 === BROWSER TOKEN CHECK ===');
  
  // Check localStorage directly
  const token = localStorage.getItem('auth_token');
  const user = localStorage.getItem('auth_user');
  
  console.log('🎫 Raw token from localStorage:', token);
  console.log('👤 Raw user from localStorage:', user);
  
  if (token) {
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));
        
        console.log('📋 Token header:', header);
        console.log('📋 Token payload:', payload);
        console.log('⏰ Token expires at:', new Date(payload.exp * 1000));
        console.log('⏰ Current time:', new Date());
        console.log('⏰ Token expired:', payload.exp < Math.floor(Date.now() / 1000));
        console.log('👤 User ID from token:', payload.id);
        console.log('🔐 User role from token:', payload.role);
      }
    } catch (error) {
      console.log('❌ Error parsing token:', error);
    }
  }
  
  if (user) {
    try {
      const userObj = JSON.parse(user);
      console.log('👤 Parsed user object:', userObj);
    } catch (error) {
      console.log('❌ Error parsing user:', error);
    }
  }
  
  console.log('🔍 === END BROWSER TOKEN CHECK ===');
  
  return { token, user };
};

// Make it available globally for console access
declare global {
  interface Window {
    checkTokenInBrowser: () => { token: string | null; user: string | null };
  }
}

if (typeof window !== 'undefined') {
  (window as Window).checkTokenInBrowser = checkTokenInBrowser;
  console.log('💡 Run checkTokenInBrowser() in console to debug token');
}
