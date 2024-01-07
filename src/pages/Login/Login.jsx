import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContent } from "../../auth/AuthWrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Input } from "@material-tailwind/react";

const Login = () => {
  const [dataLogin, setDataLogin] = useState({});
  const navigate = useNavigate();
  // const {updateValue} = useContext(AuthContent)

  const handleChange = (e) => {
    setDataLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // let localstatus = "";
    // let localType = "";
    // let check = 0;

    // if (dataLogin.username) {
    //   if (dataLogin.username === "000") {
    //     localstatus = "เจ้าของระบบ";
    //     localType = "main-admin";
    //     check = 1;
    //   } else if (dataLogin.username === "111") {
    //     localstatus = "ผู้ดูแลระบบ";
    //     localType = "admin";
    //     check = 1;
    //   } else if (dataLogin.username === "222") {
    //     localstatus = "ลูกค้า";
    //     localType = "user";
    //     check = 1;
    //   } else if (dataLogin.username === "333") {
    //     localstatus = "บ้านแชร์ A-001";
    //     localType = "home";
    //     check = 1;
    //   } else if (dataLogin.username === "444") {
    //     localstatus = "พนักงานในบ้านแชร์ A-001";
    //     localType = "member";
    //     check = 1;
    //   } else {
    //     toast.error("รหัสผ่านไม่ถูกต้อง 1 !");
    //     check = 0;
    //   }
    //   {
    //     check === 1 && (
    //       localStorage.setItem("Token", "1234")
    //       // updateValue("1234555")
    //     )
    //   }
    //   localStorage.setItem("status", localstatus);
    //   localStorage.setItem("Type", localType);
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 1000);
    // } else {
    //   toast.error("รหัสผ่านไม่ถูกต้อง  2!");
    // }

    // SERVER

    try {
      const data = {
        tell : dataLogin.tell,
        password : dataLogin.password
      }
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/login`,
        data
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        const token = res.data.token;
        const decoded = jwtDecode(token);

        // console.log(decoded);

        localStorage.setItem('id' , decoded?.id || "" )
        localStorage.setItem("app_share_token", token);
        localStorage.setItem("name", decoded.name);
        localStorage.setItem('home_share_id' , decoded?.home_share_id || "" )

        let typePage = "";
        let statusPage = "";

        if (decoded.role === 0) {
          typePage = "main-admin";
          statusPage = "เจ้าของระบบ";
        } else if (decoded.role === 1) {
          typePage = "admin";
          statusPage = "ผู้ดูแลระบบ";
        } else if (decoded.role === 2) {
          typePage = "user";
          statusPage = "ลูกค้า";
        } else if (decoded.role === 3) {
          typePage = "home";
          statusPage = decoded?.home_share_name || ""
        } else if (decoded.role === 4) {
          typePage = "member";
          statusPage = decoded?.home_share_name || ""
        }

        localStorage.setItem("Type", typePage);
        localStorage.setItem("status", statusPage);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(res.data.message);
      }

     
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const fetchDataHome = async (share_w_id, level) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/homesh/home-search?name=${share_w_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(share_w_id);
      console.log(res.data[0].sh_name);
      level === "3" &&
        (localStorage.setItem("status", res.data[0]?.sh_name || ""),
        localStorage.setItem("share_w_id", share_w_id || ""));
      level === "4" &&
        (localStorage.setItem(
          "status",
          `พนักงาน : ${res.data[0]?.sh_name || ""}`
        ),
        localStorage.setItem("share_w_id", share_w_id || ""));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center p-4  ">
        <ToastContainer theme="colored" autoClose={2000} />

        {/* Container */}
        <div className="p-5 m-0 bg-gray-300 flex rounded-2xl shadow-lg max-w-5xl border border-gray-300 py-16">
          {/* form */}
          <div className="sm:w-1/2 px-10 flex flex-col justify-center   ">
            <h2 className="font-bold text-2xl text-purple-800 flex justify-center md:justify-start">
              เข้าสู่ระบบ
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-5">
              <div className="bg-white rounded-lg">
                <Input
                  name="tell"
                  label="เบอร์โทรศัพท์"
                  color="purple"
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="relative">
                <div className="bg-white rounded-lg">
                  <Input
                    name="password"
                    label="password"
                    color="purple"
                    type="password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/* <AiOutlineEye
                  className="absolute top-1/2 right-3 -translate-y-1/2  "
                  size={20}
                /> */}
              </div>
              <button
                type="submit"
                className=" bg-purple-700 text-white rounded-xl py-2 hover:scale-105 duration-300"
              >
                เข้าสู่ระบบ
              </button>
            </form>

            <div className="mt-5 grid grid-cols-3 items-center">
              <hr className="border-gray-400" />
              <p className="text-center text-gray-600">หรือ</p>
              <hr className="border-gray-400" />
            </div>

            <Link to="/register">
              <button className=" w-full  text-purple-700 border border-purple-700 font-bold rounded-xl py-2 hover:scale-105 duration-300 mt-5">
                สมัครสมาชิก
              </button>
            </Link>

            <ul className="mt-4 b">
              <li>- MAIN ADMIN : 000 / 000</li>
              <li>- ADMIN : 111 / 111</li>
              <li>- ลูกค้า : 222 / 222</li>
              <li>- บ้านแชร์ A-001 : 333 / 333</li>
              <li>- พนักงานในบ้านแชร์ A-001 : 444 / 444</li>
            </ul>
          </div>

          {/* image */}
          <div className="w-1/2 hidden sm:block md:flex justify-center px-5  ">
            <img
              src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&q=80&w=1431&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="rounded-2xl object-cover w-auto    "
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
