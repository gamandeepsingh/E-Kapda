import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/MyContext";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(formData);
  }

  async function submithandle(e) {
    try {
      e.preventDefault();
      setLoading(true);
      if (
        formData.email === "" ||
        formData.password === "" ||
        formData.name === ""
      ) {
        toast.error("Please fill all the fields");
        setLoading(false);
        return;
      }
        const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user ={
            name: formData.name,
            uid: response.user.uid,
            email: response.user.email,
            time: Timestamp.now(),
        }
        const userRef = collection(fireDB, "users");
        await addDoc(userRef, user);
        setFormData({
            name: "",
            email: "",
            password: "",
        });
        toast.success("SignUp successfully");
    } catch (error) {
      toast.error("error occured while login");
      throw error;
    }
  }

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-pink-600 text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <form action="">
          <div>
            <input
              type="text"
              name="name"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
