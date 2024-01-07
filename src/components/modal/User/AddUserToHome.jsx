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
import { HiOutlineHome, HiOutlineShoppingCart } from "react-icons/hi";
import Select from "react-select";
import { BankList } from "../../data/BankList";
import axios from "axios";
import { toast } from "react-toastify";
import { Authorization } from "../../../auth/Data";

const AddUserToHome = ({ open, handleOpen, fetchDataMyUser, dataToModal }) => {
  const [sendData, setSendData] = useState({});
  const [message, setMessage] = useState("");
  const home_share_id = localStorage.getItem('home_share_id')

  const handleChange = (e) => {
    setSendData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      home_share_id : home_share_id ,
      username: sendData?.username || "",
      password: sendData?.password || "",
      fname: sendData?.fname || "",
      lname: sendData?.lname || "",
      address: sendData?.address || "",
      tell: sendData?.tell || "",
    };
    // console.log(data);
    try {
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
    }
  };

  const handleUpdate = async () => {
    const data = {
      id: sendData?.id,
      username: sendData?.username || "",
      password: sendData?.password || "",
      fname: sendData?.fname || "",
      lname: sendData?.lname || "",
      address: sendData?.address || "",
      tell: sendData?.tell || "",
    };
    console.log(data);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/users`,
        data,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        toast.success(res.data.message);
        handleOpen();
        setMessage("");
        fetchData();
      } else {
        toast.error("ไม่สามารถดำเนินการได้");
        setMessage("มีผู้ใช้งานนี้ในระบบแล้ว กรุณาลองใหม่อีกครั้ง !");
      }
 
    } catch (error) {
      console.log(error);
      toast.error("ไม่สามารถดำเนินการได้");
    }
  };

  useEffect(() => {
    setMessage("");
    setSendData(
      (prev) => (
        {
          ...prev,
        },
        dataToModal
      )
    );
  }, [dataToModal]);

  return (
    <Dialog open={open} size="sm" handler={handleOpen}>
      <DialogHeader className="bg-gray-200 flex gap-2 rounded-lg text-lg">
        {" "}
        <HiOutlineShoppingCart />
        {dataToModal?.id
          ? "แก้ไขลูกค้า" + " " + dataToModal.code
          : "เพิ่มลูกค้า"}
      </DialogHeader>
      <DialogBody className=" py-5 h-96 overflow-y-scroll md:h-full md:overflow-auto   ">
        {/* {JSON.stringify(sendData)} */}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-flow-row md:grid-cols-2 gap-4   mt-3  ">
            <Input
              color="red"
              label="Username"
              error
              required
              className="w-full"
              name="username"
              onChange={(e) => handleChange(e)}
              value={sendData?.username || ""}
            />
            <Input
              color="red"
              label="password"
              error
              required
              className="w-full"
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              value={sendData?.password || ""}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4  justify-center mt-3">
            <Input
              color="purple"
              label="ชื่อ"
              className="w-full"
              name="fname"
              onChange={(e) => handleChange(e)}
              value={sendData?.fname || ""}
              required
            />
            <Input
              color="purple"
              label="สกุล"
              className="w-full"
              name="lname"
              onChange={(e) => handleChange(e)}
              value={sendData?.lname || ""}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-3">
            <Input
              color="purple"
              label="เบอร์โทร"
              name="tell"
              onChange={(e) => handleChange(e)}
              value={sendData?.tell || ""}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2  justify-center mt-3">
            <Textarea
              color="purple"
              label="ที่อยู่"
              className="w-full"
              name="address"
              onChange={(e) => handleChange(e)}
              value={sendData?.address || ""}
            />
          </div>

          <div className="flex justify-end mt-5">
            <h4 className="text-lg mx-4 text-red-500">{message}</h4>

            <Button
              variant="gradient"
              color="red"
              onClick={handleOpen}
              className="mr-1 text-sm"
              size="sm"
            >
              <span>ยกเลิก</span>
            </Button>
            {dataToModal?.id ? (
              <Button
                variant="gradient"
                color="purple"
                onClick={handleUpdate}
                size="sm"
                className="text-sm"
              >
                <span>อัพเดท</span>
              </Button>
            ) : (
              <Button
                variant="gradient"
                color="purple"
                className="text-sm"
                size="sm"
                type="submit"
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

export default AddUserToHome;


