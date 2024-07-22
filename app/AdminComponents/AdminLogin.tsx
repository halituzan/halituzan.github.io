import Network from "@/app/Utils/Network";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const loginHandler = async () => {
    try {
      await Network.postData("login", login);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-200 '>
      <div className='w-96 bg-white rounded-md flex flex-col p-10'>
        <input
          type='email'
          placeholder='Eposta'
          className='border mb-2 rounded-lg p-2'
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />
        <input
          type='text'
          placeholder='*******'
          className='border mb-2 rounded-lg p-2'
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
        <button
          className='border mb-2 rounded-lg py-2 bg-slate-500 text-white'
          onClick={loginHandler}
        >
          Giriş
        </button>
      </div>
    </div>
  );
};

export default Login;
Login.displayName = "admin";
