"use client"
import { useSearchParams } from "next/navigation"
import { use } from "react"

interface ProductMainImageProps{
    productImages:string[]
    title:string
}

export const ProductMainImage:React.FC<ProductMainImageProps>=({productImages,title})=>{
const searchParams=useSearchParams();
const currentImage=searchParams.get("cur-im-in");
// alert(currentImage);

    return(

  <img
                  src={productImages[currentImage ? parseInt(currentImage) : 0]}
                  alt={title}
                  className="w-full h-full object-cover"
                />

    )
}