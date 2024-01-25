import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { HiOutlineHome } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";
import { Authorization } from "../../../auth/Data";
import { BankList } from "../../data/BankList";
import Select from "react-select";

const HomeShareModal = ({ open, handleOpen, id, fetchData, dataToModal }) => {
  const [sendData, setSendData] = useState({});
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    const text = e.target.value;
    setSendData((prev)=> ({ ...prev , [e.target.name] : text} ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { 
      name: sendData?.name || "" ,
      bank: sendData?.bank || "" ,
      account_number: sendData?.account_number || "" ,
      account_name: sendData?.account_name || "" ,
      line: sendData?.line || "" ,
    };

    console.log(data);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/home_share`,
        data,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        setSendData({});
        handleOpen();
        fetchData();
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message)
      setTimeout(() => {
        setMessage(null)
      },3000);
    }
  };

  const handleEdit = async () => {
    const data = {
      id: sendData?.id,
      name: sendData?.name || "",
      bank: sendData?.bank || "",
      account_number: sendData?.account_number || "",
      account_name: sendData?.account_name || "",
      line: sendData?.line || "",
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/home_share`,
        data,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        handleOpen();
        fetchData();
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
    setSendData((prev) => ({
      ...prev,
      id : dataToModal?.id, 
      name: dataToModal?.name || "",
      bank: dataToModal?.bank || "",
      account_number: dataToModal?.account_number || "",
      account_name: dataToModal?.account_name || "",
      line: dataToModal?.line || "",
    }));
  }, [dataToModal]);

  return (
    <Dialog open={open} size="sm" handler={handleOpen} className="">
      <DialogHeader className="bg-gray-200 text-lg flex gap-2 rounded-lg">
        {" "}
        <HiOutlineHome /> {id ? "แก้ไขบ้านแชร์" : "สร้างบ้านแชร์"}
      </DialogHeader>
      <DialogBody className="  h-fit  md:h-[350px] md:py-10 md:overflow-auto   ">

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Input
              color="purple"
              label="ชื่อบ้านแชร์ "
              required
              name="name"
              onChange={(e) => handleChange(e)}
              value={sendData?.name || ""}
              type="text"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-3">
            <Select
              options={BankList}
              className="w-full  "
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

            <Input
              color="purple"
              label="หมายเลชบัญชีธนาคาร "
              required
              name="account_number"
              onChange={(e) => handleChange(e)}
              value={sendData?.account_number || ""}
              type="text"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-3">
            <Input
              color="purple"
              label="ชื่อบัญชีธนาคาร "
              required
              name="account_name"
              onChange={(e) => handleChange(e)}
              value={sendData?.account_name || ""}
              type="text"
            />

            <Input
              color="purple"
              label="LINE ID "
              required
              name="line"
              onChange={(e) => handleChange(e)}
              value={sendData?.line || ""}
              type="text"
            />
          </div>



          <div className="mt-8 flex justify-end">
          <h4 className="text-base mx-4 text-red-500">{message}</h4>

            <Button
              variant="gradient"
              color="red"
              onClick={() => handleOpen()}
              className="mr-1 text-sm"
              size="sm"
            >
              <span>ยกเลิก</span>
            </Button>

            {id ? (
              <Button
                variant="gradient"
                color="purple"
                size="sm"
                className="text-sm"
                onClick={handleEdit}
              >
                <span>อัพเดท</span>
              </Button>
            ) : (
              <Button
                variant="gradient"
                color="purple"
                size="sm"
                className="text-sm"
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

export default HomeShareModal;
