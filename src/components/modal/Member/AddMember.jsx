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
      f_name: sendData.f_name || "",
      l_nane: sendData.l_nane || "",
      address: sendData.address || "",
      tel: sendData.tel || "",
      line: sendData.line || "",
      share_w_id : localStorage.getItem('share_w_id') || ""
    };
    console.log(data);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/register-m`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(res.data);
      if (res.data.result == "เพิ่มข้อมูลสำเร็จ") {
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

  
  const handleUpdate = async ()=>{
    const data = {
      id : sendData.id || "" ,
      username : sendData.username || "",
      password : sendData.password || "",
      f_name : sendData.f_name || "",
      l_nane : sendData.l_nane || "",
      tel : sendData.tel || "",
      line : sendData.line || "",
      address : sendData.address || ""
  
    }

    console.log(data);
    try {
      const res = await axios.put(`${import.meta.env.VITE_APP_API}/edit`,data , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        }
      })
      console.log(res.data);
      if(res.data.error){
        toast.error('ไม่สามารถดำเนินการได้')
        setMessage('มีผู้ใช้งานนี้ในระบบแล้ว กรุณาลองใหม่อีกครั้ง !')
       
      }else {
        toast.success('บันทึกสำเร็จ')
        handleOpen()
        setMessage('')
        fetchData()

      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setSendData((prev) => ({
      ...prev,
      id: dataToModal?.user_id || "",
      username: dataToModal?.username || "",
      password: dataToModal?.password || "",
      f_name: dataToModal?.f_name || "",
      l_nane: dataToModal?.l_nane || "",
      tel: dataToModal?.tel || "",
      line: dataToModal?.line || "",
      address: dataToModal?.address || "",
    }));
  }, [dataToModal]);

  return (
    <Dialog open={open} size="md" handler={handleOpen}>
      <DialogHeader className="bg-gray-200 rounded-lg flex gap-4 text-lg">
        <HiOutlineUserGroup size={24} color="black" /> สร้างพนักงานใหม่
      </DialogHeader>
      <DialogBody>
        {/* {JSON.stringify(sendData)} */}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              label="ชื่อ"
              color="purple"
              name="f_name"
              onChange={(e) => handleChange(e)}
              value={sendData?.f_name || ""}
              required
              autoComplete="off"
            />
            <Input
              label="สกุล"
              color="purple"
              name="l_nane"
              onChange={(e) => handleChange(e)}
              value={sendData?.l_nane || ""}
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
              name="tel"
              onChange={(e) => handleChange(e)}
              value={sendData?.tel || ""}
            />
            <Input
              label="LINE ID (ถ้ามี)"
              color="purple"
              name="line"
              onChange={(e) => handleChange(e)}
              value={sendData?.line || ""}
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
