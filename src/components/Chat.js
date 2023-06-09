import { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../contexts/ChatContext";

export default function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <>
      <div className="flex flex-row items-center bg-slate-800 fixed top-0 right-0 w-3/4 ml-80 p-3">
        {data.user.photoURL && (
          <img
            src={data.user.photoURL}
            alt=""
            className="rounded-full w-12 h-12 object-cover"
          />
        )}
        <div className="flex flex-col ml-3">
          <span>{data.user?.userName}</span>
          <span className="text-xs text-gray-400">Son görülme</span>
        </div>
      </div>
      <div className="flex flex-row items-center bg-gray-900 pb-1 pt-10 px-6 my-16 w-full h-full messageBox">
        <Messages />
        <Input />
      </div>
    </>
  );
}
