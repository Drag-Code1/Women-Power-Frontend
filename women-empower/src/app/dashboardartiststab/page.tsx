// app/artists/page.tsx
import ArtistManagementClient from '../component/dashboard/dashboardartiststab/ArtistManagementClient';
import { getArtistsApi, getCategoriesApi } from '@/app/lib/api';

export default async function ArtistsPage() {
  const [artistsRaw, categories] = await Promise.all([
    getArtistsApi(),
    getCategoriesApi(),
  ]);

  const categoryIdToName: Record<string, string> = {};
  categories.forEach((c: { id: string; name: string }) => {
    categoryIdToName[c.id] = c.name;
  });

  const artists = (artistsRaw || []).map((a: any) => ({
    id: a.id,
    artist_name: a.artist_Name,
    category: categoryIdToName[a.category_id] || 'Unknown',
    category_id: a.category_id,
    intro: a.introduction,
    joining_date: a.joining_date,
    experience: Number(a.experience),
    image: a.artist_profile_pic,
  }));

  return <ArtistManagementClient initialArtists={artists} />;
}