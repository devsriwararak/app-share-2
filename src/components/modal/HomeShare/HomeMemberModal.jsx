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
import { Authorization } from "../../../auth/Data";


const HomeMemberModal = ({
  open,
  handleOpen,
  fetchMemberByHomeShareId,
  dataToModal,
}) => {
  const [dataHomeSelect, setDataHomeSelect] = useState([]);
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
      home_share_id: sendData.home_share_id,
      username: sendData.username,
      password: sendData.password,
      fname: sendData.fname || "",
      lname: sendData.lname || "",
      address: sendData.address || "",
      tell: sendData.tell || "",
      // line: sendData.line || "",
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/member`,
        data,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      // console.log(res.data);
      if (res.status === 200) {
        fetchMemberByHomeShareId(sendData.home_share_id);
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
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async () => {
    const data = {
      id: sendData.id || "",
      home_share_id: sendData.home_share_id,
      username: sendData.username,
      password: sendData.password,
      fname: sendData.fname || "",
      lname: sendData.lname || "",
      address: sendData.address || "",
      tell: sendData.tell || "",
    };
    // console.log(data);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/member`,
        data,
        {
          headers: {
            Authorization: Authorization
          },
        }
      );
      // console.log(res.data);
      if (res.status === 200) {
        fetchMemberByHomeShareId(sendData.home_share_id);
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
    <Dialog open={open} size="md" handler={handleOpen}>
      <DialogHeader className="bg-gray-200 flex gap-2 rounded-lg text-lg">
        {" "}
        <HiOutlineUserAdd />
        {dataToModal?.id
          ? "แก้ไขพนักงาน ประจำบ้านแชร์" + " " + dataToModal.code
          : "สร้างพนักงาน ประจำบ้านแชร์"}
      </DialogHeader>
      <DialogBody className=" py-5 h-96 overflow-y-scroll md:h-full md:overflow-auto   ">

        {/* {JSON.stringify(sendData)} */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 ">
            <b className="text-black w-full">
              บ้านแชร์ : {sendData?.home_share_name}{" "}
            </b>

            <Input
              color="purple"
              label="เบอร์โทร"
              name="tell"
              onChange={(e) => handleChange(e)}
              className="w-full"
              value={sendData?.tell || ""}
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
              type="password"
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
              name="fname"
              onChange={(e) => handleChange(e)}
              className="w-full"
              required
              value={sendData?.fname || ""}
            />
            <Input
              color="purple"
              label="สกุล"
              name="lname"
              onChange={(e) => handleChange(e)}
              className="w-full"
              required
              value={sendData?.lname || ""}
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
