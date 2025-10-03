"use client"
import { useSearchParams } from "next/navigation"

interface ProductThumbnailProps{
image:string,
index:number

}
export const ProductThumbnailImage:React.FC<ProductThumbnailProps>=({image,index})=>{
const searchPArams=useSearchParams();
console.log(searchPArams)
// searchPArams.set("cur-im-in")
const url=new URLSearchParams(searchPArams.toString());
url.set("cur-im-in",index.toString())
    return(


         <button
                    // key={index}
                    onClick={() => {url.set("cur-im-in",index.toString());

history.pushState({}, "", `?${url.toString()}`);
                    }

                    }
                    className={`aspect-square rounded-lg overflow-hidden border transition-all duration-200 ${
                    Number( searchPArams.get('cur-im-in'))==index
                        ? "border-[#695946] border-2 ring-2 ring-[#695946]/20" 
                        : "border-gray-200 hover:border-[#695946]"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
    )
}