
"use client"
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import Filters from "../product/Filters"

import CloseIcon from "@mui/icons-material/Close";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ArtistFiltersSidebar from "../product/ArtistFiltersSidebar";
export  const ArtistMobileViewFilter: React.FC = () => {

      const searchParams = useSearchParams();
              const search = searchParams.get('mobile-sidebar')
    
            useEffect(() => {
                console.log(search);
            }, [searchParams]);
         
    return (
   <Dialog
            open={search=='true'?true:false}
                onClose={()=>{}}
            fullWidth
            maxWidth="sm"
            PaperProps={{
              style: {
                maxHeight: "90vh", // mobile safety limit
                height: "auto", // jitna content utna hi
              },
            }}
          >
            <DialogTitle className="flex justify-between items-center border-b">
              <span className="text-lg font-semibold">Filters</span>
              <IconButton onClick={() =>{  const url = new URL(window.location.href);
url.searchParams.set('mobile-sidebar', 'false');
history.pushState(null, "", url.toString());
}}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent
              dividers
              sx={{
                padding: 2,
                maxHeight: "70vh", // scroll agar zyada content ho
              }}
            >
              <ArtistFiltersSidebar
                // categories={categories}
                // selectedCategories={selectedCategories}
                // toggleCategory={toggleCategory}
                // experienceRanges={experienceRanges}
                // selectedExperience={selectedExperience}
                // toggleExperience={toggleExperience}
                // allArtists={allArtists}
                // clearFilters={clearFilters}
              />
            </DialogContent>
          </Dialog>
    )
}