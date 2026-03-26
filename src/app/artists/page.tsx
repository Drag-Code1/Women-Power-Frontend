// app/page.tsx

import ArtistDirectoryWrapper from "@/app/component/artist/ArtistDirectoryWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artist Directory",
  description: "Browse and filter through our amazing collection of artists",
};

// Export as static

export default function Page() {
  return <ArtistDirectoryWrapper />;
}
