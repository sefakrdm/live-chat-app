import { useState, useContext } from "react";
import { db, storage } from "../firebase/config";
import {
  doc,
  updateDoc,
  Timestamp,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

import { MdAttachFile, MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function Input() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { loginUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handlePost = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    const imageFile = e.target[1].value;

    if (imageFile) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "messages", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              sendId: loginUser.uid,
              date: Timestamp.now(),
              image: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "messages", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          sendId: loginUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "chats", loginUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "chats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  return (
    <form
      onSubmit={handlePost}
      className="fixed bottom-0 right-0 w-3/4 py-4 px-6 bg-slate-950 flex flex-row justify-between"
    >
      <input
        type="text"
        placeholder="Mesaj Yaz"
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="bg-transparent w-3/4 outline-none"
      />
      <div className="flex flex-row items-center justify-end w-1/4">
        <MdAttachFile size={24} />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <MdOutlineAddPhotoAlternate size={28} className="mx-3" />
        </label>
        <button type="submit" className="bg-slate-700 py-2 px-3 rounded-md">
          Gönder
        </button>
      </div>
    </form>
  );
}