import { Input } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [sendData, setSendData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSendData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendDataToAPI = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/register`,
        sendData
      );
      console.log(res.data);
      setSendData({});

      if (res.data.result ="เพิ่มข้อมูลสำเร็จ") {
        toast.success("สมัครสมาชิกสำเร็จ");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("สมัครสมาชิกไม่สำเร็จ !");

      }
    } catch (error) {
      console.log(error);
      toast.error("สมัครสมาชิกไม่สำเร็จ !");
    }
  };
  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <ToastContainer theme="colored" autoClose={2000} />
        {/* {JSON.stringify(sendData)} */}

        {/* Container */}
        <div className="p-5 m-0 bg-gray-300 flex rounded-2xl shadow-lg max-w-5xl border border-gray-300 py-16">
          {/* form */}

          <div className="sm:w-1/2 px-10 flex flex-col justify-center   ">
            <h2 className="font-bold text-2xl text-purple-800">สมัครสมาชิก</h2>

            <form className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-2 justify-center items-center mt-4 ">
                {/* <div className="">
                  <input
                    className="p-2 mt-2 rounded-xl border w-full  focus:ring-gray-200 "
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={(e) => handleChange(e)}
                  />
                </div> */}

                <div className="bg-white rounded-lg">
                  <Input
                    name="username"
                    label="username"
                    color="purple"
                    type="text"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/* <div className="relative ">
                  <input
                    className="p-2 w-full mt-2  rounded-xl border "
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                  />
                  <AiOutlineEye
                    className="absolute top-1/2 right-3  -translate-y-35   "
                    size={20}
                  />
                </div> */}

                <div className="bg-white rounded-lg">
                  <Input
                    name="password"
                    label="password"
                    color="purple"
                    type="password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-2 justify-center items-center ">
                {/* <div className="">
                  <input
                    className="p-2 mt-2 rounded-xl border w-full  focus:ring-gray-200 "
                    type="text"
                    name="fname"
                    placeholder="ชื่อ"
                    onChange={(e) => handleChange(e)}
                  />
                </div> */}

                <div className="bg-white rounded-lg">
                  <Input
                    name="fname"
                    label="ชื่อ"
                    color="purple"
                    type="text"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/* <div className="relative ">
                  <input
                    className="p-2 w-full mt-2  rounded-xl border "
                    type="text"
                    name="lnane"
                    placeholder="สกุล"
                    onChange={(e) => handleChange(e)}
                  />
                </div> */}
                <div className="bg-white rounded-lg">
                  <Input
                    name="lnane"
                    label="สกุล"
                    color="purple"
                    type="text"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              {/* <input
                className="p-2 w-full mt-2  rounded-xl border "
                type="text"
                name="tell"
                placeholder="เบอร์โทรศัพท์"
                onChange={(e) => handleChange(e)}
              /> */}

              <div className="bg-white rounded-lg">
                <Input
                  name="tell"
                  label="เบอร์โทรศัพท์"
                  color="purple"
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              {/* <input
                className="p-2 mt-2  rounded-xl border focus:ring-gray-200"
                type="text"
                name="address"
                placeholder="ที่อยู่"
                onChange={(e) => handleChange(e)}
              /> */}

              <div className="bg-white rounded-lg">
                <Input
                  name="address"
                  label="ที่อยู่"
                  color="purple"
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <button
                onClick={sendDataToAPI}
                className=" bg-purple-700 text-white rounded-xl mt-2 py-2 hover:scale-105 duration-300"
              >
                สมัครสมาชิก
              </button>
            </form>

            <div className="mt-5 grid grid-cols-3 items-center">
              <hr className="border-gray-400" />
              <p className="text-center text-gray-600">หรือ</p>
              <hr className="border-gray-400" />
            </div>

            <Link to="/login">
              <button className=" w-full  text-purple-700 border border-purple-700 font-bold rounded-xl py-2 hover:scale-105 duration-300 mt-5">
                เข้าสู่ระบบ
              </button>
            </Link>
          </div>

          {/* image */}
          <div className="w-1/2 hidden sm:block md:flex justify-center px-5  ">
            <img
              src="https://images.unsplash.com/photo-1489356395365-8ea69611f75a?auto=format&fit=crop&q=80&w=1631&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="rounded-2xl object-cover w-auto    "
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
