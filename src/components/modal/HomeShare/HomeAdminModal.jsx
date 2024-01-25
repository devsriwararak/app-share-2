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
import { HiOutlineHome } from "react-icons/hi";
import Select from "react-select";
import { BankList } from "../../data/BankList";
import axios from "axios";
import { toast } from "react-toastify";
import { Authorization } from "../../../auth/Data.js";

const HomeAdminModal = ({ open, handleOpen, fetchDataHome, dataToModal }) => {
  const [dataHomeSelect, setDataHomeSelect] = useState([]);
  const [sendData, setSendData] = useState({});
  const [message, setMessage] = useState("");

  const fetchHomeShare = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/home_share?status_own=0`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );

      const rename = res.data.map((item, index) => ({
        value: item.id,
        label: item.name,
      }));
      setDataHomeSelect(rename);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSendData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const data = {
      home_share_id: sendData.home_share_id || "",
      username: sendData.username || "",
      password: sendData.password || "",
      fname: sendData.fname || "",
      lname: sendData.lname || "",
      address: sendData.address || "",
      tell: sendData.tell || "",
    };
    // console.log(data);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/home_account`,
         data ,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      console.log(res.data);

      if (res.status === 200) {
        fetchDataHome();
        toast.success(res.data.message);
        handleOpen();
        setSendData({});
        setMessage("");
      } else {
        toast.error("ไม่สามารถลงทะเบียนได้");
        setMessage("มีผู้ใช้งานนี้ในระบบแล้ว กรุณาลองใหม่อีกครั้ง !");
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message)
      setTimeout(() => {
        setMessage(null)
      },3000);
    }
  };

  const handleUpdate = async () => {
    const data = {
      id : sendData.id ,
      username: sendData.username || "",
      password: sendData.password || "",
      fname: sendData.fname || "",
      lname: sendData.lname || "",
      address: sendData.address || "",
      tell: sendData.tell || "",
    };
    // console.log(data);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/home_account`,
        data,
        {
          headers: {
            Authorization: Authorization
          },
        }
      );
      console.log(res.data);
      if (res.status === 200) {

        toast.success("บันทึกข้อมูลสำเร็จ");
        handleOpen();
        setMessage("");
        fetchDataHome();
      } else {
        toast.error("ไม่สามารถดำเนินการได้");
        setMessage("มีผู้ใช้งานนี้ในระบบแล้ว กรุณาลองใหม่อีกครั้ง !");
      
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message)
      setTimeout(() => {
        setMessage(null)
      },3000);
    }
  };

  useEffect(() => {
    fetchHomeShare();
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
        <HiOutlineHome />{" "}
        {dataToModal?.id
          ? "แก้ไขเจ้าของบ้านแชร์" + " " + dataToModal.code
          : "สร้างเจ้าของบ้านแชร์"}
      </DialogHeader>
      <DialogBody className=" py-5 h-96 overflow-y-scroll md:h-full md:overflow-auto   ">
        {/* {JSON.stringify(sendData)} */}

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Select
          isDisabled={sendData?.id}
            options={dataHomeSelect}
            className="w-full"
            placeholder="เลือกบ้านแชร์"
            defaultValue={
              dataToModal?.id
                ? dataHomeSelect.find(
                    (option) => option.value == dataToModal?.home_share_id
                  )
                : ""
            }
            onChange={(e) =>
              setSendData((prev) => ({
                ...prev,
                home_share_id: e.value,
              }))
            }
          />

          <Input
            color="purple"
            label="เบอร์โทร"
            name="tell"
            onChange={(e) => handleChange(e)}
            value={sendData?.tell || ""}
          />
        </div>

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
            type="password"
            error
            required
            className="w-full"
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
          />
          <Input
            color="purple"
            label="สกุล"
            className="w-full"
            name="lname"
            onChange={(e) => handleChange(e)}
            value={sendData?.lname || ""}
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
      </DialogBody>
      <DialogFooter>
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
            onClick={handleSubmit}
            size="sm"
            className="text-sm"
          >
            <span>บันทึก</span>
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
};

export default HomeAdminModal;
