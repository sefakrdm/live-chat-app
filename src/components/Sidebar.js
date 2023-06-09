import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew } from 'react-icons/md'
import { ChatContext } from '../contexts/ChatContext'

export default function Sidebar() {
  const [sidebar,setSidebar] = useState(true);
  const {data} = useContext(ChatContext)

  useEffect(() => {
    setSidebar(false)
  },[data.chatId])

  return (
    <>
      {sidebar ? <MdOutlineArrowForwardIos size={45} className="fixed z-20 block md:hidden top-3 right-3 bg-blue-500 rounded-md p-2" onClick={()=>setSidebar(!sidebar)}/>:<MdOutlineArrowBackIosNew size={45} className="fixed z-20 block md:hidden top-3 right-3 bg-blue-500 rounded-md p-2" onClick={()=>setSidebar(!sidebar)}/>}
      <div className={`bg-slate-700 flex-auto md:w-1/4 w-full fixed h-full top-0 left-0 border-r-2 border-black z-10 ${sidebar?'block':'hidden'}`}>
        <Navbar />
        <Search />
        <Chats />
      </div>
    </>
  )
}
