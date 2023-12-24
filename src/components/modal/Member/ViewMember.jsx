import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { HiOutlineDesktopComputer } from "react-icons/hi";

const ViewMember = ({ open, handleOpen, id, dataToModal }) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const options2 = [
    { value: "บิดดอกตาม", label: "บิดดอกตาม" },
    { value: "ดอกตาม", label: "ดอกตาม" },
    { value: "ขั้นบันได", label: "ขั้นบันได" },
    { value: "บิดลดต้น (ลดต้นงวดถัดไป)", label: "บิดลดต้น (ลดต้นงวดถัดไป)" },
    { value: "บิดลดต้น (ลดต้นงวดที่บิด)", label: "บิดลดต้น (ลดต้นงวดที่บิด)" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Dialog open={open} size="md" handler={handleOpen}>
      <DialogHeader className="bg-gray-200 flex text-lg gap-2 rounded-lg">
        <HiOutlineDesktopComputer /> ข้อมูลพนักงาน : {dataToModal?.code}
      </DialogHeader>
      <DialogBody className=" py-10 h-96 overflow-scroll md:h-full md:overflow-auto ">

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full">
            <b className=" font-semibold text-gray-800">รหัสพนักงาน : </b>
            <span className="text-gray-700">{dataToModal?.code}</span>
          </div>
          <div className="w-full">
            <b className=" font-semibold text-gray-800" >username : </b>
            <span className="text-gray-700">{dataToModal?.username}</span>
          </div>
        
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
   
          <div className="w-full">
            <b className=" font-semibold text-gray-800" >ชื่อ : </b>
            <span className="text-gray-700">{dataToModal?.f_name}</span>
          </div>
          <div className="w-full">
            <b className=" font-semibold text-gray-800">สกุล : </b>
            <span className="text-gray-700">{dataToModal?.l_nane}</span>
          </div>
        
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
    
          <div className="w-full">
            <b className=" font-semibold text-gray-800">เบอร์โทรศัพท์ : </b>
            <span className="text-gray-700">{dataToModal?.tel}</span>
          </div>
          <div className="w-full">
            <b className=" font-semibold text-gray-800">line ID  : </b>
            <span className="text-gray-700">{dataToModal?.line}</span>
          </div>
        </div>

        <div className="w-full mt-6">
            <b className=" font-semibold  text-gray-800">ที่อยู่  : </b>
            <span className="text-gray-700">{dataToModal?.address}</span>
          </div>

 


        <div className="flex justify-end mt-4">
          <Button onClick={() => handleOpen()} color="gray">
            ออก
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ViewMember;

