import { useState } from "react";
import AddAvatar from "../img/add-avatar.png";
import { auth, storage, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const nickname = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${nickname + date}`);

      await uploadBytesResumable(storageRef, avatar).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          //console.log(downloadURL);

          try {
            await updateProfile(res.user,{
              displayName: nickname,
              photoURL: downloadURL
            })

            //console.log(res.user)

            await setDoc(doc(db,"users",res.user.uid),{
              uid: res.user.uid,
              nickname,
              email,
              photoURL: downloadURL
            })

            await setDoc(doc(db,"chats",res.user.uid),{})

            navigate('/');

          } catch (error) {
            toast.error(error.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
            setLoading(false)
          }
        });
      });

      setLoading(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      setLoading(false);
    }
  };
  return (
    <div className="bg-slate-800 h-screen flex justify-center items-center">
      <div className="bg-gray-200 rounded-md py-10 px-12 md:w-1/4 w-full">
        <h1 className="text-3xl font-semibold text-gray-800">Live Chat App</h1>
        <h2 className="text-lg text-gray-700 mt-2">Kaydol</h2>
          {loading && <span className="p-3 text-center bg-indigo-400 w-full block text-white text-sm font-semibold rounded-md mt-3">Üyelik oluşturuluyor lütfen bekleyiniz...</span>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input type="text" placeholder="Kullanıcı Adı" required className="bg-slate-300 placeholder:text-slate-800 text-slate-800 outline-slate-300 outline-1 p-3 rounded-md mt-5" />
          <input type="email" placeholder="E-Posta" required className="bg-slate-300 placeholder:text-slate-800 text-slate-800 outline-slate-300 outline-1 p-3 rounded-md mt-4" />
          <input type="password" placeholder="Şifre" required className="bg-slate-300 placeholder:text-slate-800 text-slate-800 outline-slate-300 outline-1 p-3 rounded-md mt-4" />
          <input type="file" required style={{ display: "none" }} id="file" />
          <label htmlFor="file" className="mt-4 flex flex-row justify-start items-center content-center">
            <span>Avatar Ekle</span>
            <img src={AddAvatar} alt="" className="w-1/5 ml-4 cursor-pointer" />
          </label>
          <button disabled={loading} className="rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-3 text-base	text-white mt-4 transition-colors ease-in-out">Üye Ol</button>
        </form>
        {!loading && <p className="text-sm mt-5">Daha önce bir hesap oluşturdunuz mu? <Link to="/login" className="text-blue-600 hover:text-blue-800">Hemen giriş yapın.</Link></p>}
      </div>
    </div>
  );
}
