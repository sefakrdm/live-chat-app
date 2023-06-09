import { useState, useContext } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

export default function Search() {
  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { loginUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async (value) => {
    setSearchUser(value)
    console.log(searchUser)
    if(value.length > 0) {
      const qr = query(
        collection(db, "users"),
        where("nickname", ">=", searchUser),
        where("nickname", "<=", searchUser+ '\uf8ff')
      );
  
      try {
        const querySnapshop = await getDocs(qr);
  
        querySnapshop.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (error) {
        setError(error);
      }
    } else {
      setSearchUser("")
      setUser(null)
    }
  };

  // const handleKey = (e) => {
  //   e.code === "Enter" && handleSearch();
  // };

  const handleSelect = async () => {
    const collectID =
      loginUser.uid > user.uid
        ? loginUser.uid + user.uid
        : user.uid + loginUser.uid;

    try {
      const res = await getDoc(doc(db, "messages", collectID));

      if (!res.exists()) {
        await setDoc(doc(db, "messages", collectID), { messages: [] });

        await updateDoc(doc(db, "chats", loginUser.uid), {
          [collectID + ".userInfo"]: {
            uid: user.uid,
            userName: user.nickname,
            photoURL: user.photoURL,
          },
          [collectID + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "chats", user.uid), {
          [collectID + ".userInfo"]: {
            uid: loginUser.uid,
            userName: loginUser.displayName,
            photoURL: loginUser.photoURL,
          },
          [collectID + ".date"]: serverTimestamp()
        });
      }

      dispatch({type:"CHANGE_USER",payload:user})
    } catch (error) {}

    setUser(null);
    setSearchUser("");
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="w-full">
        <input
          type="text"
          placeholder="Kullanıcı Ara"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchUser}
          className="w-full p-2 bg-slate-900 text-white outline-none"
        />
      </div>
      {error && <span>Kullanıcı bulunamadı.</span>}
      {user && (
        <div className="flex flex-row my-4 border-b pb-4 items-center" onClick={handleSelect}>
          <img src={user.photoURL} alt="" className="rounded-full w-12 h-12 object-cover mr-2"/>
          <div className="ml-1">
            <span>{user.nickname}</span>
          </div>
        </div>
      )}
    </div>
  );
}
