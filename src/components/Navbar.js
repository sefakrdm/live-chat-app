import { useContext, useState } from 'react'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../contexts/AuthContext'

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const {loginUser} = useContext(AuthContext)

  return (
    <div className="flex flew-row justify-between items-center p-3">
      <h1 className="text-2xl font-semibold text-blue-100">Live Chat App</h1>
      <div className="flex flex-row items-center">
        <img onClick={() => setDropdown(!dropdown)} src={loginUser.photoURL} alt='' className="rounded-full w-12 h-12 object-cover mr-2 cursor-pointer"/>
        <div className={`absolute top-16 left-28 rounded-md drop-shadow-xl bg-gray-800 p-4 flex flex-col w-96 ${dropdown ? "block":"hidden"}`}>
          <div className="flex flex-row items-center content-center">
            <img src={loginUser.photoURL} alt='' className="rounded-full w-32 h-32 object-cover mr-2 cursor-pointer"/>
            <span className='text-2xl ml-2'>{loginUser.displayName}</span>
          </div>
          <button onClick={()=>{signOut(auth)}} className='py-1 px-3 bg-red-600/50 hover:bg-red-600/75 transition-colors ease-in-out rounded-md mt-4'>Çıkış</button>
        </div>
      </div>
    </div>
  )
}
