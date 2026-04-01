// app/api/artists/route.ts


export interface Artist {
  id: string;
  artist_Name: string;
  artist_profile_pic: string;
  category_id: string;
  category?: string;
  joining_date: string;
  experience: number;
}

export const allArtists: Artist[] = [];

// GET all artists
export async function GET() {
  try {
    return Response.json({
      success: true,
      data: allArtists,
      count: allArtists.length,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Failed to fetch artists",
      },
      { status: 500 }
    );
  }
}

// GET single artist by ID
export async function getArtistById(id: string): Promise<Artist | null> {
  const artist = allArtists.find((a) => a.id === id);
  return artist || null;
}

// GET artists by category
export async function getArtistsByCategory(
  category: string
): Promise<Artist[]> {
  return allArtists.filter((a) => a.category === category);
}

// GET artists by experience range
export async function getArtistsByExperience(
  minExp: number,
  maxExp: number
): Promise<Artist[]> {
  return allArtists.filter(
    (a) => a.experience >= minExp && a.experience <= maxExp
  );
}

// GET unique categories
export async function getCategories(): Promise<string[]> {
  const categories = [
    ...new Set(allArtists.map((a) => a.category).filter(Boolean)),
  ];
  return categories as string[];
}

// Search artists
export async function searchArtists(query: string): Promise<Artist[]> {
  const lowerQuery = query.toLowerCase();
  return allArtists.filter(
    (a) =>
      a.artist_Name.toLowerCase().includes(lowerQuery) ||
      a.category?.toLowerCase().includes(lowerQuery)
  );
}
