"use client"
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import Filters from "../product/Filters"

import CloseIcon from "@mui/icons-material/Close";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export const MobileViewFilter:React.FC=()=>{
    //   const showMobileSidebar = searchParams['mobile-sidebar'] === 'true';
        const searchParams = useSearchParams();
          const search = searchParams.get('mobile-sidebar')

        useEffect(() => {
            console.log(search);
        }, [searchParams]);
     
    return    <Dialog
                open={search=='true'?true:false}
                onClose={()=>{}}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                  style: {
                    height: "auto",
                    maxHeight: "90vh",
                  },
                }}
              >
                <DialogTitle className="flex justify-between items-center">
                  Filters
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
                    maxHeight: "70vh",
                  }}
                >
                  <Filters
                   
                  />
                </DialogContent>
              </Dialog>}