import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

export default function Sidebar() {
  return (
    <div className="bg-slate-700 flex-auto w-1/4 fixed h-full top-0 left-0 border-r-2 border-black">
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}
