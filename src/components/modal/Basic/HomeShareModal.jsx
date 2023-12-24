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

const HomeShareModal = ({ open, handleOpen, id, fetchData, dataToModal }) => {
  const [sendData, setSendData] = useState({});

  const handleChange = (e) => {
    const text = e.target.value;
    setSendData({ sh_name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      sh_name: sendData.sh_name || "",
    };

    console.log(data);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/homesh/adddata`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      console.log(res.data);
      toast.success("บันทึกสำเร็จ");
      setSendData({});
      handleOpen();
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("บันทึกไม่สำเร็จ");
    }
  };

  const handleEdit = async () => {
    const data = {
      id: id,
      sh_name: sendData.sh_name,
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/homesh/edit`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      toast.success("บันทึกสำเร็จ");
      handleOpen();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSendData((prev) => ({
      ...prev,
      sh_name: dataToModal?.sh_name || "",
    }));
  }, [dataToModal]);

  return (
    <Dialog open={open} size="sm" handler={handleOpen}>
      <DialogHeader className="bg-gray-200 text-lg flex gap-2 rounded-lg">
        {" "}
        <HiOutlineHome /> {id ? "แก้ไขบ้านแชร์" : "สร้างบ้านแชร์"}
      </DialogHeader>
      <DialogBody className="  h-fit  md:h-full md:overflow-auto  ">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Input
              color="purple"
              label="ชื่อบ้านแชร์ "
              required
              onChange={(e) => handleChange(e)}
              value={sendData?.sh_name || ""}
              type="text"
            />
          </div>

          <div className="mt-4 flex justify-end">
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
