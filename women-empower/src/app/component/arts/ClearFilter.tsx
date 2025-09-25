import react from 'react';
export const ClearFilter:React.FC=()=>{
    return(
        <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    // onClick={clearFilters}
                    className="bg-[#61503c] text-white px-6 py-2 rounded-md hover:bg-[#695946] transition-all duration-200 transform hover:scale-105"
                  >
                    Clear all filters
                  </button>
                </div>
    )
}