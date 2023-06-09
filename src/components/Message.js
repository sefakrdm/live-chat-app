import { useContext, useRef, useEffect } from "react";
import moment from "moment";
import "moment/locale/tr";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

export default function Message({ message }) {
  const { loginUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message.text]);

  return (
    <div
      ref={ref}
      className={
        message.sendId === loginUser.uid
          ? "flex justify-end mb-10"
          : "flex justify-start mb-10"
      }
    >
      <div
        className={
          message.sendId === loginUser.uid
            ? "flex flex-col items-end"
            : "flex flex-col items-start"
        }
      >
        <div className="flex items-center mb-2">
          <img
            src={
              message.sendId === loginUser.uid
                ? loginUser.photoURL
                : data.user.photoURL
            }
            alt=""
            className="rounded-full w-11 h-11 object-cover"
          />
          <div className="flex flex-col mx-3">
            <span className="font-normal">
              {message.sendId === loginUser.uid
                ? loginUser.displayName
                : data.user.userName}
            </span>
            <span className="font-light text-gray-300 text-xs">
              {moment(new Date(message.date.toDate())).format("LT")}
            </span>
          </div>
        </div>
        <div className={`p-4 font-normal max-w-md text-sm ${message.sendId === loginUser.uid
              ? "bg-blue-700 rounded-ee-md rounded-es-md rounded-tl-md"
              : "bg-slate-600 rounded-se-md rounded-ee-md rounded-es-md"}
          `}
        >
            {message.image && <img src={message.image} alt="" />}
            {message.text}
        </div>
      </div>
    </div>
  );
}
