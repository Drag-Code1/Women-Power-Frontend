import React from 'react'
import ArtistProfile from '../component/product/ArtistProfile'
import ArtistWork from '../component/product/ArtistWork';
import ArtistReviews from '../component/product/ArtistReviews';


function page() {
  return (
    <div>
      <ArtistProfile />
      <ArtistWork />
    <ArtistReviews />
    </div>
  )
}

export default page;
