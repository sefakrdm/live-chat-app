import { useEffect, useState, useContext } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

export default function Chats() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState("");
  const { loginUser } = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "chats", loginUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    loginUser.uid && getChats();
  }, [loginUser.uid])

  const handleSelect = (userInfo, id) => {
    dispatch({type:"CHANGE_USER",payload:userInfo})
    handleActiveClass(id);
  }

  const handleActiveClass = (id) => {
    setActiveChat(id)
  }

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat) => (
        <div className={`flex flex-row my-3 px-2 py-3 ${activeChat === chat[0] ? "bg-slate-500/50":""}`} onClick={()=>handleSelect(chat[1].userInfo,chat[0])} key={chat[0]}>
          <img src={chat[1].userInfo.photoURL} alt="" className="rounded-full w-12 h-12 object-cover"/>
          <div className="flex flex-col ml-3">
            <span>{chat[1].userInfo.userName}</span>
            <span className="text-sm text-slate-300 truncate max-w-xs">{chat[1].lastMessage?.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
