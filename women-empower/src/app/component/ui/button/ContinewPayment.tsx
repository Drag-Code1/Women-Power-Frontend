"use client"
export const ContinewPayment:React.FC=()=>{
    return(
         <button
                  onClick={()=>{
                    const url = new URL(window.location.href);
                    url.searchParams.set('step', 'payment');
                    history.pushState({}, "", url);
                  }}
                  className="w-full bg-[#695946] text-white py-3 rounded-lg font-semibold mt-6 hover:bg-[#695946] transition-colors"
                >
                  CONTINUE
                </button>
    )
}