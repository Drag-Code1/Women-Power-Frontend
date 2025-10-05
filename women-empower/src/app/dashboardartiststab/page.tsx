// app/artists/page.tsx
import { getArtists } from '@/app/data/dashboardartiststabdata';
import ArtistManagementClient from '../component/dashboard/dashboardartiststab/ArtistManagementClient';


export default async function ArtistsPage() {
  // Server-side data fetching
  const artists = await getArtists();

  return <ArtistManagementClient initialArtists={artists} />;
}