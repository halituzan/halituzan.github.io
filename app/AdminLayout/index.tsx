import React, { useEffect, useState } from "react";
import AdminLogin from "../AdminComponents/AdminLogin";
import Sidebar from "./Sidebar";
import Network from "../Utils/Network";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  setUserInfo,
  UserInfoState,
} from "@/lib/features/info/infoSlice";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const [adminLogin, setAdminLogin] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.user?.user);

  const checkUser = async () => {
    try {
      const data = await Network.getData("/me");
      dispatch(setUserInfo(data));
      console.log(data);
    } catch (error) {
      dispatch(
        setUserInfo({
          status: false,
          data: {},
        })
      );
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      {user.login ? (
        <div className='layou flex items-start bg-slate-100'>
          <Sidebar />
          <div className='flex-1 p-4 h-screen'>
            <div className='w-full h-full bg-white rounded-lg p-4'>
              {children}
            </div>
          </div>
        </div>
      ) : (
        <AdminLogin />
      )}
    </div>
  );
};

export default AdminLayout;
