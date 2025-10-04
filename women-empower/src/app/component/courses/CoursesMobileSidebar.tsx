"use client"
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import FiltersSidebar from "../product/FiltersSidebar"

import CloseIcon from "@mui/icons-material/Close";
import { useSearchParams } from "next/navigation";
export const CourseMobileSidebarFilter:React.FC=()=>{
const params=useSearchParams();
const url=new URLSearchParams(params.toString());
url.get('course-filter')
return(
    
              <Dialog open={url.get('course-filter')}
              //  onClose={() => setShowFilters(false)} 
               fullWidth maxWidth="sm">
                <DialogTitle className="flex justify-between items-center border-b">
                  <span className="text-lg font-semibold">Filters</span>
                  <IconButton 
                     onClick={() => {url.delete('course-filter');
 history.pushState(null, '', `?${url.toString()}`);
                     }
                    }
                  // onClick={() => setShowFilters(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ padding: 2, maxHeight: "70vh" }}>
                  <FiltersSidebar
                  
                  />
                </DialogContent>
              </Dialog>
)

}