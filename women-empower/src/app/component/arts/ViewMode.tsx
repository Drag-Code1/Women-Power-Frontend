"use client"
import { Grid, List } from '@mui/material';
import React, { useState } from 'react';
export const ViewMode:React.FC=()=>{

  const [viewMode, setViewMode] = useState("grid");
    return  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
}