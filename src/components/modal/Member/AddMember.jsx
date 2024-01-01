import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";
import { Authorization } from "../../../auth/Data";

const AddMember = ({ handleOpen, open, fetchData, dataToModal }) => {
  const [sendData, setSendData] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setSendData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: sendData.username || "",
      password: sendData.password || "",
      fname: sendData.fname || "",
      lname: sendData.lname || "",
      address: sendData.address || "",
      tell: sendData.tell || "",
      home_share_id: localStorage.getItem("home_share_id") || "",
    };
    console.log(data);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/member/home`,
        data,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        fetchData();
        toast.success("บันทึกสำเร็จ");
        handleOpen();
        setSendData({});
        setMessage("");
      } else {
        toast.error("ไม่สามารถลงทะเบียนได้");
        setMessage("มีผู้ใช้งานนี้ในระบบแล้ว กรุณาลองใหม่อีกครั้ง !");
      }
    } catch (error) {
      console.log(error);
      toast.error("บันทึกไม่สำเร็จ");
    }
  };

  const handleUpdate = async () => {
    const data = {
      id: sendData.id || "",
      username: sendData.username || "",
      password: sendData.password || "",
      fname: sendData.fname || "",
      lname: sendData.lname || "",
      tell: sendData.tell || "",
      address: sendData.address || "",
    };

    console.log(data);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/member/home`,
        data,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        toast.success("บันทึกสำเร็จ");
        handleOpen();
        setMessage("");
        fetchData();
      } else {
        toast.error("ไม่สามารถดำเนินการได้");
        setMessage("มีผู้ใช้งานนี้ในระบบแล้ว กรุณาลองใหม่อีกครั้ง !");
      }

   
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSendData((prev) => ({
      ...prev,
      id: dataToModal?.id || "",
      username: dataToModal?.username || "",
      password: dataToModal?.password || "",
      fname: dataToModal?.fname || "",
      lname: dataToModal?.lname || "",
      tell: dataToModal?.tell || "",
      // line: dataToModal?.line || "",
      address: dataToModal?.address || "",
    }));
  }, [dataToModal]);

  return (
    <Dialog open={open} size="sm" handler={handleOpen}>
      <DialogHeader className="bg-gray-200 rounded-lg flex gap-4 text-lg">
        <HiOutlineUserGroup size={24} color="black" /> สร้างพนักงานใหม่.
      </DialogHeader>
      <DialogBody>
        {/* {JSON.stringify(sendData)} */}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              label="ชื่อ"
              color="purple"
              name="fname"
              onChange={(e) => handleChange(e)}
              value={sendData?.fname || ""}
              required
              autoComplete="off"
            />
            <Input
              label="สกุล"
              color="purple"
              name="lname"
              onChange={(e) => handleChange(e)}
              value={sendData?.lname || ""}
              required
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="bg-yellow-100   w-full rounded-lg">
              <Input
                label="Username"
                color="red"
                name="username"
                onChange={(e) => handleChange(e)}
                value={sendData?.username || ""}
                required
                autoComplete="off"
              />
            </div>
            <div className="bg-yellow-100  w-full rounded-lg">
              <Input
                label="password"
                type="password"
                color="red"
                name="password"
                onChange={(e) => handleChange(e)}
                value={sendData?.password || ""}
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Input
              label="เบอร์โทรศัพท์"
              color="purple"
              name="tell"
              onChange={(e) => handleChange(e)}
              value={sendData?.tell || ""}
            />
          </div>

          <div className="mt-4">
            <Textarea
              label="ที่อยู่"
              name="address"
              onChange={(e) => handleChange(e)}
              value={sendData?.address || ""}
            />
          </div>

          <div className="flex justify-end mt-2">
            <h4 className="text-lg mx-4 text-red-500">{message}</h4>

            <Button
              variant="filled"
              color="red"
              onClick={handleOpen}
              className="mr-1  text-sm"
              size="sm"
            >
              <span>ยกเลิก</span>
            </Button>
            {sendData?.id ? (
              <Button
                variant="filled"
                onClick={handleUpdate}
                size="sm"
                color="purple"
                className=" text-sm"
              >
                <span>อัพเดท</span>
              </Button>
            ) : (
              <Button
                variant="filled"
                type="submit"
                size="sm"
                color="purple"
                className=" text-sm"
              >
                <span>บันทึก</span>
              </Button>
            )}
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default AddMember;
