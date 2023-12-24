import { Popover, Transition, Menu } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Header = ({ openSidebar, setOpenSideBar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: `ออกจากระบบ`,
      text: "คุณต้องการที่จะออกจากระบบ จริงหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear(), (window.location.href = "/login");
      }
    });
  };
  return (
    <div className=" bg-white  h-16  flex justify-between items-center border-b-2 border-gray-200 shadow-sm fixed w-full md:w-10/12 z-10  ">
      <div className="mx-4 text-black">
        {`${localStorage.getItem("name")}  (${localStorage.getItem("status")})`}
      </div>

      <div className="flex items-center gap-2 mr-2">
        <div onClick={() => setOpenSideBar(!openSidebar)}>
          {openSidebar ? (
            <HiOutlineX
              color="black"
              size={25}
              className="cursor-pointer md:hidden "
            />
          ) : (
            <HiOutlineMenu
              color="black"
              size={25}
              className="cursor-pointer md:hidden "
            />
          )}
        </div>

        <Menu as="div" className="relative ">
          <div>
            <Menu.Button className="ml-2 inline-flex rounded-full focus:ring-2 focus:ring-neutral-400 ">
              <span className="sr-only">Oprn user menu</span>
              <div
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage:
                    'url("https://img.freepik.com/free-photo/people-technology-concept-smiling-asian-girl-using-smartphone-texting-mobile-phone-standing-against-white-background_1258-89474.jpg?w=740&t=st=1699023939~exp=1699024539~hmac=b35c4ea6ba09d1deb11cf8323f2da4363deeee3f8b3ee61cf77030c20973633f")',
                }}
                onClick={() =>
                  setOpenSideBar(
                    openSidebar ? setOpenSideBar(false) : setOpenSideBar(true)
                  )
                }
              >
                <span className="sr-only">Hi Jackson</span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5  ">
              <Menu.Item className="">
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-200",
                      "text-gray-800 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                    )}
                    onClick={() => navigate("/profile")}
                  >
                    ข้อมูลส่วนตัว
                  </div>
                )}
              </Menu.Item>
              <Menu.Item className="">
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-200",
                      "text-gray-800 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                    )}
                    onClick={() => navigate("/setting")}
                  >
                    ตั้งค่า
                  </div>
                )}
              </Menu.Item>
              <Menu.Item className="">
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-red-500 text-white",
                      "text-gray-800 focus:bg-red-500 cursor-pointer rounded-sm px-4  py-2"
                    )}
                    onClick={handleLogout}
                  >
                    ออกจากระบบ
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
