import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";
import { FcEditImage, FcEmptyTrash, FcPlus } from "react-icons/fc";

import {
  HiOutlineHome,
  HiOutlinePencilAlt,
  HiOutlineUserAdd,
  HiOutlineUsers,
  HiTrash,
} from "react-icons/hi";
import Select from "react-select";
import { toast } from "react-toastify";
import classNames from "classnames";
import axios from "axios";
import { Authorization } from "../../../auth/Data.js";

const TABLE_HEAD = ["ลำดับ", "รหัส", "ชื่อลูกแชร์", "เลือก"];
const TABLE_HEAD_2 = ["ชื่อลูกแชร์", "วงแชร์", "สถานะ", "เลือก"];

const selectStatus = [
  { value: "0", label: "รอตรวจสอบ" },
  { value: "1", label: "อนุญาติ" },
  { value: "2", label: "ปฏิเสธ" },
];

const AddUserToHome = ({ handleOpen, open }) => {
  const [data, setData] = useState({});
  const [dataUser, setDataUser] = useState([]);
  const [dataMyWongShare, setDataMyWingShare] = useState([]);
  const [dataMyUser, setDataMyUser] = useState([]);
  const [searchUser, setSearchuser] = useState("");
  const [sendDataUser, setSendDataUser] = useState({});
  const [sendDataWongShare, setSendDataWongShare] = useState({});
  const [updateStatusUser, setUpdateStatusUser] = useState({});
  const [message, setMessage] = useState({});
  const home_share_id = localStorage.getItem("home_share_id");

  const fetchDataUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/users?search=${searchUser}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      setDataUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeUser = (item) => {
    setSendDataUser((prev) => ({
      ...prev,
      id: item.id,
      fname: item.fname,
      user_id: item.id,
    }));
  };

  const fetchDataWongShare = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/wong_share/home/${home_share_id}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      const setNewData = res.data.map((item, index) => ({
        value: item.id,
        label: item.name,
      }));
      setDataMyWingShare(setNewData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async () => {
    try {
      const data = {
        user_id: sendDataUser.user_id || "",
        home_share_id: home_share_id,
        wong_share_id: sendDataUser.wong_share_id || "",
        status: 1,
      };

      console.log(data);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/home_share/users`,
        data,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );

      console.log(res.data);
      if (res.status === 200) {
        fetchDataMyUser();
        toast.success(res.data.message);
        setSendDataUser({})
        
      } else {
        toast.error("บันทึกไม่สำเร็จ");
      }

    } catch (error) {
      toast.error("บันทึกไม่สำเร็จ");
      // console.log(error);
      // toast.error("บันทึกไม่สำเร็จ");
      // setMessage((prev) => ({
      //   ...prev,
      //   message_1: "ผู้ใช้งานนี้ถูกเพิ่มเข้าวงแชร์นี้ไปแล้ว !",
      // }));
    }
  };

  const fetchDataMyUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/home_share/users/${home_share_id}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      setDataMyUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectMyUser = (item) => {
    setUpdateStatusUser((prev) => ({
      ...prev,
      id: item.id,
      user_fname: item.user_fname,
      user_lname: item.user_lname,
      wong_share_name: item.wong_share_name,
    }));
  };

  const handleUpdateMyUser = async () => {
    const data = {
      id: updateStatusUser.id,
      status: updateStatusUser.status,
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/home_share/users`,
        data,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      if (res.status === 200) {
        fetchDataMyUser();
        setUpdateStatusUser({});
        toast.success(res.data.message);
      } else {
        toast.error("ทำรายการไม่สำเร็จ");
      }
    } catch (error) {
      console.log(error);
      toast.error("ทำรายการไม่สำเร็จ");
    }
  };

  useEffect(() => {
    fetchDataUser();
    fetchDataWongShare();
    fetchDataMyUser();
    setMessage({});
  }, [searchUser, sendDataWongShare.share_v_id]);
  return (
    <div>
      <Dialog open={open} size="xl" handler={handleOpen}>
        <DialogHeader className="bg-gray-200 rounded-lg flex gap-2 text-lg">
          {" "}
          <HiOutlineUsers />
          เพิ่มลูกแชร์เข้าบ้านตัวเอง
        </DialogHeader>
        <DialogBody className="overflow-y-scroll h-[500px] md:h-full">
          <div className="flex flex-col md:flex-row gap-4">
            <Card className="w-full md:w-1/2 ring-2 ring-gray-300/20">
              <CardBody>
                <div className="flex flex-col md:flex-row justify-between">
                  <h2 className="text-black font-bold flex items-center gap-2">
                    <HiOutlineUserAdd size={20} />
                    ลูกแชร์
                  </h2>
                  <div>
                    <Input
                      color="purple"
                      label="ค้นหา รหัส หรือ ชื่อลูกแชร์"
                      onChange={(e) => setSearchuser(e.target.value)}
                    />
                  </div>
                </div>

                <Card className=" w-full overflow-y-scroll h-64 mt-5">
                  <table className="w-full min-w-max table-auto text-center">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold leading-none opacity-90"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dataUser.map((item, index) => (
                        <tr
                          key={item.id}
                          className="even:bg-blue-gray-50/50 hover:bg-gray-200"
                        >
                          <td className="p-2">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {index + 1}
                            </Typography>
                          </td>
                          <td className="p-2">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.code}
                            </Typography>
                          </td>
                          <td className="p-2">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.fname} {item.lname}
                            </Typography>
                          </td>
                          <td className="p-2 flex justify-center">
                            <FcPlus
                              className="cursor-pointer"
                              onClick={() => handleChangeUser(item)}
                              size={26}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>

                <div className="flex flex-col  md:flex-row gap-4 mt-5 items-center">
                  <div className="w-full ">
                    <div>
                      <b className="font-bold text-black">ลูกแชร์ : </b>{" "}
                      <span>{sendDataUser?.fname}</span>
                    </div>
                    <div>
                      <b className="font-bold text-black">วงแชร์ : </b>{" "}
                      <span>{sendDataUser?.wong_share_name}</span>
                    </div>
                  </div>

                  <Select
                    className="w-full"
                    options={dataMyWongShare}
                    placeholder="เลือกวงแชร์"
                    isDisabled={!sendDataUser.fname}
                    onChange={(e) =>
                      setSendDataUser((prev) => ({
                        ...prev,
                        wong_share_id: e.value,
                        wong_share_name: e.label,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-end mt-5">
                  <h4 className="text-sm font-semibold mx-4 text-red-500">
                    {message?.message_1 || ""}
                  </h4>

                  <Button
                    color="purple"
                    size="sm"
                    className="text-sm"
                    onClick={handleAddUser}
                    disabled={
                      !sendDataUser.fname || !sendDataUser.wong_share_name
                    }
                  >
                    บันทึก
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card className="w-full md:w-1/2 ring-2 ring-gray-300/20 ">
              <CardBody>
                <div className="flex flex-col md:flex-row justify-between items-center mt-2">
                  <h2 className="text-black font-bold flex items-center gap-2 w-full">
                    {" "}
                    <HiOutlineHome size={24} />
                    ลูกแชร์ในบ้าน
                  </h2>
{/* 
                  <Select
                    className="w-full"
                    options={dataMyWongShare}
                    placeholder="เลือกวงแชร์"
                    onChange={(e) =>
                      setSendDataWongShare((prev) => ({
                        ...prev,
                        share_v_id: e.value,
                      }))
                    }
                  />
                  <Button
                    className="m-2 text-sm"
                    size="sm"
                    onClick={() =>
                      setSendDataWongShare((prev) => ({
                        ...prev,
                        share_v_id: "",
                      }))
                    }
                  >
                    ทั้งหมด
                  </Button> */}
                </div>

                <Card>
                  <CardBody className=" overflow-y-scroll h-64 mt-2 ">
                    <table className="w-full min-w-max table-auto text-center mt1">
                      <thead>
                        <tr>
                          {TABLE_HEAD_2.map((head) => (
                            <th
                              key={head}
                              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold leading-none opacity-90"
                              >
                                {head}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dataMyUser.map((item, index) => (
                          <tr
                            key={index}
                            className="even:bg-blue-gray-50/50 hover:bg-gray-200"
                          >
                            {/* <td className="p-2">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {item.code}
                              </Typography>
                            </td> */}

                            <td className="p-2">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {item?.user_fname} {item?.user_lname}
                              </Typography>
                            </td>

                            <td className="p-2">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {item.wong_share_name}
                              </Typography>
                            </td>

                            <td className="p-2">
                              {item.status === 0 && (
                                <p className="bg-yellow-300 bg-opacity-50 text-orange-700 rounded-lg ">
                                  รอตรวจสอบ
                                </p>
                              )}
                              {item.status === 1 && (
                                <p className="bg-green-300 bg-opacity-50 text-green-700 rounded-lg">
                                  อนุมัติ
                                </p>
                              )}
                              {item.status === 2 && (
                                <p className="bg-red-300 bg-opacity-50 text-red-700 rounded-lg">
                                  ปฏิเสธ
                                </p>
                              )}
                            </td>
                            <td className="p-2 ">
                              <div className="flex cursor-pointer justify-center gap-2">
                                <HiOutlinePencilAlt
                                  className="cursor-pointer"
                                  color="black"
                                  size={20}
                                  onClick={(e) => handleSelectMyUser(item)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardBody>
                </Card>

                <div className="flex flex-col md:flex-row gap-4 mt-5 items-center">
                  <div className="w-full">
                    <div>
                      <b className="font-bold text-black">ชื่อลูกแชร์ : </b>{" "}
                      <span>
                        {updateStatusUser?.user_fname}{" "}
                        {updateStatusUser?.user_lname}
                      </span>
                    </div>
                    <div>
                      <b className="font-bold text-black">วงแชร์ : </b>{" "}
                      <span>{updateStatusUser?.wong_share_name}</span>
                    </div>
                  </div>
                  <Select
                    className="w-full"
                    options={selectStatus}
                    placeholder="เลือกสถานะใหม่"
                    isDisabled={!updateStatusUser?.user_fname}
                    onChange={(e) =>
                      setUpdateStatusUser((prev) => ({
                        ...prev,
                        status: e.value,
                      }))
                    }
                  />
                </div>
                <div className="flex justify-end mt-5">
                  {/* <h4 className="text-lg mx-4 text-red-500">{message}</h4> */}

                  <Button
                    color="purple"
                    size="sm"
                    className="text-sm"
                    onClick={handleUpdateMyUser}
                    disabled={
                      !updateStatusUser.user_fname || !updateStatusUser.status
                    }
                  >
                    อัพเดท
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default AddUserToHome;
