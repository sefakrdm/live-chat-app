import Chat from "../components/Chat"
import Sidebar from "../components/Sidebar"

export default function Home() {
  return (
    <div className="text-white bg-gray-900 h-screen">
        <div className="flex flex-row">
            <Sidebar />
            <Chat />
        </div>
    </div>
  )
}
