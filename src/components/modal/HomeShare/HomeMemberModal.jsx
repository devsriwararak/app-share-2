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
import { HiOutlineHome, HiOutlineUserAdd } from "react-icons/hi";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";

const options = [
  { value: "", label: "เลือกธนาคารที่ต้องการ" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const HomeMemberModal = ({
  open,
  handleOpen,
  fetchDataMember,
  dataToModal,
}) => {
  const [dataHomeSelect, setDataHomeSelect] = useState([]);
  const [sendData, setSendData] = useState({});
  const [message, setMessage] = useState("");

  const fetchHome = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/homesh/home-search?name=`, {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: sendData.username,
      share_w_id: sendData.share_w_id,
      password: sendData.password,
      f_name: sendData.f_name,
      l_nane: sendData.l_nane,
      address: sendData.address,
      tel: sendData.tel,
      line : sendData.line
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
        fetchDataMember();
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
      id: sendData.id || "",
      username: sendData.username || "",
      share_w_id: sendData.share_w_id || "",
      password: sendData.password || "",
      f_name: sendData.f_name || "",
      l_nane: sendData.l_nane || "",
      address: sendData.address || "",
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
        fetchDataMember()
      }
    } catch (error) {
      console.log(error);
      toast.error("ไม่สามารถดำเนินการได้");
    }
  };

  useEffect(() => {
    setMessage("")
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
        <HiOutlineUserAdd />
        {dataToModal?.id
          ? "แก้ไขพนักงานประจำบ้านแชร์" + " " + dataToModal.code
          : "สร้างพนักงานประจำบ้านแชร์"}
      </DialogHeader>
      <DialogBody className=" py-5 h-96 overflow-y-scroll md:h-full md:overflow-auto   ">
        {/* {JSON.stringify(sendData)} */}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-2 justify-center">
            <Select
              options={dataHomeSelect}
              className="w-full"
              placeholder="เลือกบ้านแชร์"
              required
              onChange={(e) =>
                setSendData((prev) => ({
                  ...prev,
                  share_w_id: e.value,
                }))
              }
              defaultValue={
                dataToModal?.id
                  ? dataHomeSelect.find(
                      (option) => option.value == dataToModal?.share_w_id
                    )
                  : ""
              }
            />
          </div>

          <div className="grid grid-flow-row md:grid-cols-2 gap-2 mx-auto mt-3  ">
            <Input
              color="red"
              label="Username"
              name="username"
              onChange={(e) => handleChange(e)}
              error
              required
              value={sendData?.username || ""}
            />
            <Input
              color="red"
              label="password"
              name="password"
              onChange={(e) => handleChange(e)}
              error
              required
              value={sendData?.password || ""}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2  justify-center mt-3">
            <Input
              color="purple"
              label="ชื่อ"
              name="f_name"
              onChange={(e) => handleChange(e)}
              className="w-full"
              required
              value={sendData?.f_name || ""}
            />
            <Input
              color="purple"
              label="สกุล"
              name="l_nane"
              onChange={(e) => handleChange(e)}
              className="w-full"
              required
              value={sendData?.l_nane || ""}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2  justify-center mt-3">
            <Input
              color="purple"
              label="เบอร์โทร"
              name="tel"
              onChange={(e) => handleChange(e)}
              className="w-full"
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
              name="address"
              onChange={(e) => handleChange(e)}
              className="w-full"
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

export default HomeMemberModal;
