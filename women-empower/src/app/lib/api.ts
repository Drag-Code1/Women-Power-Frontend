
export const fetchArtists = async () => {
  const res = await fetch('http://localhost:5000/api/artist', { cache: 'no-store' });
  const data = await res.json();
  return data;
}

// Category APIs (v1)
export const getCategoriesApi = async () => {
  const res = await fetch('http://localhost:5000/v1/category/', { cache: 'no-store' });
  const body = await res.json();
  return body.data;
};

export const createCategory = async (payload: { name: string; image: string }) => {
  const res = await fetch('http://localhost:5000/v1/category/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await res.json();
  return body.data;
};

export const updateCategory = async (id: string, payload: { name: string; image: string }) => {
  const res = await fetch(`http://localhost:5000/v1/category/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await res.json();
  return body.data;
};

export const deleteCategory = async (id: string) => {
  const res = await fetch(`http://localhost:5000/v1/category/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete category');
  }
  // Some APIs return 204 No Content; return true for success
  return true;
};

export const getArtistsApi = async (page: number = 1) => {
  const url = `http://localhost:5000/v1/artist/?page=${encodeURIComponent(page)}`;
  const res = await fetch(url, { cache: 'no-store' });
  const contentType = res.headers.get('content-type') || '';
  let parsed: any = null;
  try {
    parsed = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
  } catch {
    parsed = {};
  }
  if (!res.ok) {
    const msg = parsed?.message || parsed?.error || `Failed to fetch artists (status ${res.status})`;
    const error = new Error(msg);
    // @ts-ignore
    (error as any).details = parsed;
    throw error;
  }
  // Maintain existing return (paginated container object)
  return parsed?.data;
};

// Paginated Artists API
export const getArtistsPaginated = async (
  page: number = 1
): Promise<{ totalArtists: number; totalPages: number; currentPage: number; data: any[] }> => {
  const url = `http://localhost:5000/v1/artist/?page=${encodeURIComponent(page)}`;
  const res = await fetch(url, { cache: 'no-store' });
  const contentType = res.headers.get('content-type') || '';
  let parsed: any = null;
  try {
    parsed = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
  } catch {
    parsed = {};
  }
  if (!res.ok) {
    const msg = parsed?.message || parsed?.error || `Failed to fetch artists (status ${res.status})`;
    const error = new Error(msg);
    // @ts-ignore
    (error as any).details = parsed;
    throw error;
  }
  const data = parsed?.data || {};
  return {
    totalArtists: Number(data.totalArtists) || (Array.isArray(data.data) ? data.data.length : 0),
    totalPages: Number(data.totalPages) || 1,
    currentPage: Number(data.currentPage) || page,
    data: Array.isArray(data.data) ? data.data : Array.isArray(parsed?.data) ? parsed.data : [],
  };
};

export const getCoursesApi = async () => {
  const res = await fetch('http://localhost:5000/v1/course/', { cache: 'no-store' });
  const contentType = res.headers.get('content-type') || '';
  let parsed: any = null;
  try {
    parsed = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
  } catch {
    parsed = {};
  }
  if (!res.ok) {
    const msg = parsed?.message || parsed?.error || `Failed to fetch courses (status ${res.status})`;
    const error = new Error(msg);
    // @ts-ignore
    (error as any).details = parsed;
    throw error;
  }
  return parsed.data;
};

export const deleteCourse = async (id: string) => {
  const res = await fetch(`http://localhost:5000/v1/course/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    let message = `Failed to delete course (status ${res.status})`;
    try {
      const data = await res.json();
      message = data?.message || data?.error || message;
    } catch {}
    throw new Error(message);
  }
  return true;
};

export const createCourse = async (payload: {
  thumbnail: string;
  course_coordinator: string;
  category_id: string;
  title: string;
  description: string;
  lessons: number;
  level: string;
  price: number | string;
  discount: number;
}) => {
  const res = await fetch('http://localhost:5000/v1/course/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const contentType = res.headers.get('content-type') || '';
  let parsed: any = null;
  try {
    parsed = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
  } catch {
    parsed = {};
  }
  if (!res.ok) {
    const msg = parsed?.message || parsed?.error || `Failed to create course (status ${res.status})`;
    const error = new Error(msg);
    // @ts-ignore
    (error as any).details = parsed;
    throw error;
  }
  return parsed.data;
};

export const updateCourse = async (
  id: string,
  payload: {
    thumbnail: string;
    course_coordinator: string;
    category_id: string;
    title: string;
    description: string;
    lessons: number;
    level: string;
    price: number | string;
    discount: number;
  }
) => {
  const res = await fetch(`http://localhost:5000/v1/course/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const contentType = res.headers.get('content-type') || '';
  let parsed: any = null;
  try {
    parsed = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
  } catch {
    parsed = {};
  }
  if (!res.ok) {
    const msg = parsed?.message || parsed?.error || `Failed to update course (status ${res.status})`;
    const error = new Error(msg);
    // @ts-ignore
    (error as any).details = parsed;
    throw error;
  }
  return parsed.data;
};

export const createArtist = async (
  payload: {
    artist_Name: string;
    artist_profile_pic: string;
    category_id: string;
    introduction: string;
    experience: number;
  }
) => {
  const res = await fetch('http://localhost:5000/v1/artist/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const contentType = res.headers.get('content-type') || '';
  let parsed: any = null;
  try {
    if (contentType.includes('application/json')) {
      parsed = await res.json();
    } else {
      const text = await res.text();
      parsed = { message: text };
    }
  } catch {
    parsed = {};
  }
  if (!res.ok) {
    const msg = parsed?.message || parsed?.error || `Failed to create artist (status ${res.status})`;
    const error = new Error(msg);
    // @ts-ignore attach details for logging
    (error as any).details = parsed;
    throw error;
  }
  return parsed.data;
};

export const updateArtist = async (
  id: string,
  payload: {
    artist_Name: string;
    artist_profile_pic: string;
    category_id: string;
    introduction: string;
    experience: number;
  }
) => {
  const res = await fetch(`http://localhost:5000/v1/artist/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await res.json();
  return body.data;
};

export const deleteArtist = async (id: string) => {
  const res = await fetch(`http://localhost:5000/v1/artist/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete artist');
  }
  return true;
};

export const fetchFeaturedEvents = async () => {
  const res = await fetch('http://localhost:5000/api/featured-events', { cache: 'force-cache' });
  const data = await res.json();
  return data;
}

export const fetchEvents = async () => {
  console.log("Fetching events...");
  const res = await fetch('http://localhost:5000/api/events', { cache: 'force-cache' });
  const data = await res.json();
  return data;
}

// Events API (v1)
export const getEventsV1 = async () => {
  const res = await fetch('http://localhost:5000/v1/event/', { cache: 'no-store' });
  const contentType = res.headers.get('content-type') || '';
  let parsed: any = null;
  try {
    parsed = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
  } catch {
    parsed = {};
  }
  if (!res.ok) {
    const msg = parsed?.message || parsed?.error || `Failed to fetch events (status ${res.status})`;
    const error = new Error(msg);
    // @ts-ignore
    (error as any).details = parsed;
    throw error;
  }
  const list = Array.isArray(parsed?.data) ? parsed.data : [];
  // Normalize to dashboard Event type
  return list.map((it: any) => ({
    id: it.id,
    thumbnail: it.e_image || '',
    category: it.category_id || '',
    title: it.title || '',
    description: it.description || '',
    dateTime: it.date_time || '',
    status: (it.status || 'upcoming'),
    keywords: typeof it.keywords === 'string' ? it.keywords.split(',').map((k: string) => k.trim()).filter(Boolean) : Array.isArray(it.keywords) ? it.keywords : [],
    banner: it.banner || undefined,
  }));
};

export const createEventV1 = async (
  payload: {
    e_image: string;
    category_id: string;
    title: string;
    description: string;
    date_time: string;
    status: string;
    keywords: string;
    banner?: string;
  }
) => {
  const res = await fetch('http://localhost:5000/v1/event/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload),
  });
  const contentType = res.headers.get('content-type') || '';
  let parsed: any = null;
  try {
    parsed = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
  } catch {
    parsed = {};
  }
  if (!res.ok) {
    const msg = parsed?.message || parsed?.error || `Failed to create event (status ${res.status})`;
    const error = new Error(msg);
    // @ts-ignore
    (error as any).details = parsed;
    throw error;
  }
  return parsed?.data ?? parsed;
};

export const updateEventV1 = async (
  id: string,
  payload: {
    e_image: string;
    category_id: string;
    title: string;
    description: string;
    date_time: string;
    status: string;
    keywords: string;
    banner?: string;
  }
) => {
  const res = await fetch(`http://localhost:5000/v1/event/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload),
  });
  const contentType = res.headers.get('content-type') || '';
  let parsed: any = null;
  try {
    parsed = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
  } catch {
    parsed = {};
  }
  if (!res.ok) {
    const msg = parsed?.message || parsed?.error || `Failed to update event (status ${res.status})`;
    const error = new Error(msg);
    // @ts-ignore
    (error as any).details = parsed;
    throw error;
  }
  return parsed?.data ?? parsed;
};

export const deleteEventV1 = async (id: string) => {
  const res = await fetch(`http://localhost:5000/v1/event/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    let parsed: any = {};
    try {
      const contentType = res.headers.get('content-type') || '';
      parsed = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
    } catch {}
    const msg = parsed?.message || parsed?.error || `Failed to delete event (status ${res.status})`;
    throw new Error(msg);
  }
  return true;
};

export const fetchCartItems = async () => {
  
  try {
    const response = await fetch('http://localhost:5000/api/cart');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    } 
    const data = await response.json();
    return data; 
  }
  catch (error) {
    console.error('Error fetching cart items:', error);
    return []; 
  }
};

export const fetchWishListItems = async () => {
  
  try {
    const response = await fetch('http://localhost:5000/api/wishlist');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    } 
    const data = await response.json();
    return data; 
  }
  catch (error) {
    console.error('Error fetching cart items:', error);
    return []; 
  }
};

// Dashboard counts API
export const getDashboardCounts = async (): Promise<{
  productCount: number;
  artistCount: number;
  courseCount: number;
  eventCount: number;
}> => {
  const res = await fetch('http://localhost:5000/v1/dashboard/', { cache: 'no-store' });
  const contentType = res.headers.get('content-type') || '';
  let parsed: any = null;
  try {
    parsed = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
  } catch {
    parsed = {};
  }
  if (!res.ok) {
    const msg = parsed?.message || parsed?.error || `Failed to fetch dashboard counts (status ${res.status})`;
    const error = new Error(msg);
    // @ts-ignore
    (error as any).details = parsed;
    throw error;
  }
  const data = parsed?.data || {};
  return {
    productCount: Number(data.productCount) || 0,
    artistCount: Number(data.artistCount) || 0,
    courseCount: Number(data.courseCount) || 0,
    eventCount: Number(data.eventCount) || 0,
  };
};

export const clearWishlist = async () => {
  
  try {
    const response = await fetch('http://localhost:5000/api/wishlist');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    } 
    const data = await response.json();
    return data; 
  }
  catch (error) {
    console.error('Error fetching cart items:', error);
    return []; 
  }
};