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

const TABLE_HEAD = ["ลำดับ", "รหัส", "ชื่อลูกแชร์", "เลือก"];
const TABLE_HEAD_2 = ["รหัส", "ชื่อลูกแชร์", "วงแชร์", "สถานะ", "เลือก"];

const selectStatus = [
  { value: "0", label: "รออนุญาติ" },
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

  const fetchDataUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/u-search?name=${searchUser}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(res.data);
      setDataUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeUser = (item) => {
    setSendDataUser((prev) => ({
      ...prev,
      id: item.id,
      f_name: item.f_name,
    }));
  };

  const fetchDataWongShare = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/sharehouse/w-details`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(res.data);
      const setNewData = res.data.map((item, index) => ({
        value: item.id,
        label: item.p_share_name,
      }));
      setDataMyWingShare(setNewData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async () => {
    try {
      const data = {
        share_id: Number(localStorage.getItem("share_w_id")) || "",
        user_id: sendDataUser.id || "",
        share_v_id: sendDataUser.share_v_id || "",
        is_apporvee: 1,
      };

      console.log(data);

      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/sharehouse/addsharehouse`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(res.data);
      fetchDataMyUser();
      toast.success("บันทึกสำเร็จ");
    } catch (error) {
      console.log(error);
      toast.error("บันทึกไม่สำเร็จ");
      setMessage((prev) => ({
        ...prev,
        message_1: "ผู้ใช้งานนี้ถูกเพิ่มเข้าวงแชร์นี้ไปแล้ว !",
      }));
    }
  };

  const fetchDataMyUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/sharehouse/user-details?search_term=${
          sendDataWongShare?.share_v_id || ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      setDataMyUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectMyUser = (item) => {
    console.log(item);
    setUpdateStatusUser((prev) => ({
      ...prev,
      id: item.id,
      username: item.username,
    }));
  };

  const handleUpdateMyUser = async () => {
    const data = {
      id: updateStatusUser.id,
      is_apporvee: updateStatusUser.is_apporvee,
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/sharehouse/edit`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(res.data);
      fetchDataMyUser();
      setUpdateStatusUser({});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataUser();
    fetchDataWongShare();
    fetchDataMyUser();
    setMessage({})
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
                              {item.f_name}
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

                <div className="flex flex-col md:flex-row gap-4 mt-5 items-center">
                  <div className="w-full">
                    <b className="font-bold text-black">ลูกแชร์ : </b>
                    <span>{sendDataUser.f_name}</span>
                  </div>
                  <Select
                    className="w-full"
                    options={dataMyWongShare}
                    placeholder="เลือกวงแชร์"
                    onChange={(e) =>
                      setSendDataUser((prev) => ({
                        ...prev,
                        share_v_id: e.value,
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
                    // disabled={
                    //   sendDataUser?.id === undefined && sendDataUser?.share_v_id === undefined

                    // }
                  >
                    บันทึก
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card className="w-full md:w-1/2 ring-2 ring-gray-300/20 ">
              <CardBody>
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <h2 className="text-black font-bold flex items-center gap-2 w-full">
                    {" "}
                    <HiOutlineHome size={24} />
                    ลูกแชร์ในบ้าน
                  </h2>

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
                  </Button>
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
                                {item.username}
                              </Typography>
                            </td>

                            <td className="p-2">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {item.p_share_name}
                              </Typography>
                            </td>

                            <td className="p-2">
                              {item.is_apporvee === 0 && (
                                <p className="bg-yellow-300 bg-opacity-50 text-orange-700 rounded-lg ">
                                  รออนุมัติ
                                </p>
                              )}
                              {item.is_apporvee === 1 && (
                                <p className="bg-green-300 bg-opacity-50 text-green-700 rounded-lg">
                                  อนุมัติ
                                </p>
                              )}
                              {item.is_apporvee === 2 && (
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
                    <b className="font-bold text-black">ชื่อลูกแชร์ : </b>{" "}
                    <span>{updateStatusUser?.username}</span>
                  </div>
                  <Select
                    className="w-full"
                    options={selectStatus}
                    placeholder="เลือกสถานะใหม่"
                    onChange={(e) =>
                      setUpdateStatusUser((prev) => ({
                        ...prev,
                        is_apporvee: e.value,
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
