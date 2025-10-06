import { Logout } from "@mui/icons-material"
import React from "react"

export const LogOut:React.FC=()=>{

    return( <button
                    //   onClick={() => }
                      className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                    >
                      <Logout className="w-4 h-4" />
                      <span>Logout</span>
                    </button>)
}