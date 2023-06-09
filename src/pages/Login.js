import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Başarıyla giriş yapıldı", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
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
    }
  }

  return (
    <div className="bg-slate-800 h-screen flex justify-center items-center">
      <div className="bg-gray-200 rounded-md py-10 px-12 md:w-1/4 w-full">
        <h1 className="text-3xl font-semibold text-gray-800">Live Chat App</h1>
        <h2 className="text-lg text-gray-700 mt-2">Giriş Yap</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input type="email" className="bg-slate-300 placeholder:text-slate-800 text-slate-800 outline-slate-300 outline-1 p-3 rounded-md mt-5" placeholder="E-Posta" required />
          <input type="password" className="bg-slate-300 placeholder:text-slate-800 text-slate-800 outline-slate-300 outline-1 p-3 rounded-md mt-4" placeholder="Şifre" required />
          <button className="rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-3 text-base	text-white mt-4 transition-colors ease-in-out">Giriş Yap</button>
        </form>
        <p className="text-sm mt-5">Henüz hesabınız yok mu? <Link to="/register" className="text-blue-600 hover:text-blue-800">Hemen kaydol.</Link></p>
      </div>
    </div>
  );
}
