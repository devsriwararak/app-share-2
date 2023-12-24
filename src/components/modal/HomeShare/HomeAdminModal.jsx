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

const options = [
  { value: "", label: "เลือกธนาคารที่ต้องการ" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const HomeAdminModal = ({ open, handleOpen, fetchDataHome, dataToModal }) => {
  const [dataHomeSelect, setDataHomeSelect] = useState([]);
  const [sendData, setSendData] = useState({});
  const [message, setMessage] = useState("");

  const fetchHome = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/homesh/home-search?name=`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      const addData = res.data.map((item) => ({
        value: item.id,
        label: item.sh_name,
      }));

      setDataHomeSelect(addData);
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
      username: sendData.username || "",
      share_w_id: sendData.share_w_id || "",
      password: sendData.password || "",
      f_name: sendData.f_name || "",
      l_nane: sendData.l_nane || "",
      address: sendData.address || "",
      bank: sendData.bank || "",
      bank_acc: sendData.bank_acc || "",
      bank_name: sendData.bank_name || "",
      tel: sendData.tel || "",
      line: sendData.line || "",
    };
    console.log(data);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/register-h`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(res.data);
      if (res.data.result == "เพิ่มข้อมูลสำเร็จ") {
        fetchDataHome();
        toast.success("บันทึกสำเร็จ");
        handleOpen();
        setSendData({});
        setMessage("");
      } else {
        toast.error("ไม่สามารถลงทะเบียนได้");
        setMessage("มีผู้ใช้งานนี้ในระบบแล้ว กรุณาลองใหม่อีกครั้ง !");

        // setSendData({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const data = {
      id: sendData.id || "",
      username: sendData.username || "",
      share_w_id: sendData.share_w_id || "",
      password: sendData.password || "",
      f_name: sendData.f_name || "",
      l_nane: sendData.l_nane || "",
      address: sendData.address || "",
      bank: sendData.bank || "",
      bank_acc: sendData.bank_acc || "",
      bank_name: sendData.bank_name || "",
      tel: sendData.tel || "",
      line: sendData.line || "",
    };
    console.log(data);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/edit`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(res.data);
      if (res.data.error) {
        toast.error("ไม่สามารถดำเนินการได้");
        setMessage("มีผู้ใช้งานนี้ในระบบแล้ว กรุณาลองใหม่อีกครั้ง !");
      } else {
        toast.success("บันทึกข้อมูลสำเร็จ");
        handleOpen();
        setMessage("");
        fetchDataHome();
      }
    } catch (error) {
      console.log(error);
      toast.error("ไม่สามารถดำเนินการได้");
    }
  };

  useEffect(() => {
    fetchHome();
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
            options={dataHomeSelect}
            className="w-full"
            placeholder="เลือกบ้านแชร์"
            defaultValue={
              dataToModal?.id
                ? dataHomeSelect.find(
                    (option) => option.value == dataToModal?.share_w_id
                  )
                : ""
            }
            onChange={(e) =>
              setSendData((prev) => ({
                ...prev,
                share_w_id: e.value,
              }))
            }
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
            name="f_name"
            onChange={(e) => handleChange(e)}
            value={sendData?.f_name || ""}
          />
          <Input
            color="purple"
            label="สกุล"
            className="w-full"
            name="l_nane"
            onChange={(e) => handleChange(e)}
            value={sendData?.l_nane || ""}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-3">
          <Select
            options={BankList}
            className="w-full"
            placeholder="เลือกธนาคาร"
            onChange={(e) =>
              setSendData((prev) => ({
                ...prev,
                bank: e.value,
              }))
            }
            defaultValue={
              dataToModal?.id
                ? BankList.find((option) => option.label == sendData?.bank)
                : ""
            }
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4  justify-center mt-3">
          <Input
            color="purple"
            label="หมายเลขบัญชี"
            className="w-full"
            name="bank_acc"
            onChange={(e) => handleChange(e)}
            value={sendData?.bank_acc || ""}
          />
          <Input
            color="purple"
            label="ชื่อบัญชี"
            className="w-full"
            name="bank_name"
            onChange={(e) => handleChange(e)}
            value={sendData?.bank_name || ""}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-3">
          <Input
            color="purple"
            label="เบอร์โทร"
            name="tel"
            onChange={(e) => handleChange(e)}
            value={sendData?.tel || ""}
          />
          <Input
            color="purple"
            label="Line ID (ถ้ามี)"
            name="line"
            onChange={(e) => handleChange(e)}
            value={sendData?.line || ""}
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
