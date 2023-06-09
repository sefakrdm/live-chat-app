import { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../contexts/ChatContext";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "messages", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className="w-full">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
}
