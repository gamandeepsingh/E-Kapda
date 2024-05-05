import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/data/MyContext";
import { toast } from "react-toastify";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection} from "firebase/firestore";
import Loader from "../../components/loadingBar/Loader";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const context = useContext(myContext);
  const { loading, setLoading } = context;


  async function submithandle(e) {
    try {
      setLoading(true);
      e.preventDefault();

      const user = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login Successfully');
      localStorage.setItem('user', JSON.stringify(user.user));

      navigate('/');
      setLoading(false);
    } catch (error) {
      toast.error('Sigin Failed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  }

  return (
    <div className=" flex justify-center items-center h-screen">
    {loading && <Loader/>}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-pink-600 text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <form action="">
          <div>
            <input
              type="email"
              name="email"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className=" flex justify-center mb-3">
            <button
              type="submit"
              className=" bg-pink-600 w-full text-black font-bold  px-2 py-2 rounded-lg"
              onClick={submithandle}
            >
              Login
            </button>
          </div>
        </form>
        <div>
          <h2 className="text-white">
            Don't have an account{" "}
            <Link className=" text-pink-600 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
