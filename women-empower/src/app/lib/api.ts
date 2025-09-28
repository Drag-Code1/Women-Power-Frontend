
export const fetchArtists = async () => {
  const res = await fetch('http://localhost:5000/api/artist', { cache: 'no-store' });
  const data = await res.json();
  return data;
}
