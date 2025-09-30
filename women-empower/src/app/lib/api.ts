
export const fetchArtists = async () => {
  const res = await fetch('http://localhost:5000/api/artist', { cache: 'no-store' });
  const data = await res.json();
  return data;
}

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

