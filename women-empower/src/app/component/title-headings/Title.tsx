interface childrenProp {

children:React.ReactNode
}

export const TitleContainer:React.FC <childrenProp>=({children})=>{


return <h2 className="text-black text-2xl sm:text-2xl">{children}</h2>

}