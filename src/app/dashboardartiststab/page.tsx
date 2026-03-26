'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ArtistManagementClient from '../component/dashboard/dashboardartiststab/ArtistManagementClient';
import { getArtistsPaginated, getCategoriesApi } from '@/app/lib/api';
import { buildR2PublicUrl } from '@/app/lib/utils/dashboardartist-utils';

function ArtistManagementContent() {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page') || '1') || 1;
  const [data, setData] = useState<{
    artists: any[];
    pagination: { currentPage: number; totalPages: number };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [artistsResp, categories] = await Promise.all([
          getArtistsPaginated(page),
          getCategoriesApi(),
        ]);

        const categoryIdToName: Record<string, string> = {};
        categories.forEach((c: { id: string; name: string }) => {
          categoryIdToName[c.id] = c.name;
        });

        const artists = (artistsResp?.data || []).map((a: any) => ({
          id: a.id,
          artist_name: a.artist_Name,
          category: categoryIdToName[a.category_id] || 'Unknown',
          category_id: a.category_id,
          intro: a.introduction,
          joining_date: a.joining_date,
          experience: Number(a.experience),
          image: buildR2PublicUrl(a.artist_profile_pic),
        }));

        setData({
          artists,
          pagination: {
            currentPage: artistsResp.currentPage,
            totalPages: artistsResp.totalPages,
          },
        });
      } catch (error) {
        console.error('Error fetching dashboard artists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (loading || !data) {
    return <div className="p-8">Loading artists...</div>;
  }

  return (
    <ArtistManagementClient
      initialArtists={data.artists}
      pagination={data.pagination}
    />
  );
}

export default function ArtistsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading dashboard...</div>}>
      <ArtistManagementContent />
    </Suspense>
  );
}
