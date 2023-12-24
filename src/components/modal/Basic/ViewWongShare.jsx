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

const ViewWongShare = ({ open, handleOpen, id, dataToModal }) => {
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
      <DialogHeader className="bg-gray-200 flex gap-2 rounded-lg text-lg ">
        <HiOutlineDesktopComputer /> ข้อมูลวงแชร์ที่ : {dataToModal?.p_code}
      </DialogHeader>
      <DialogBody className=" py-10 h-96 overflow-scroll md:h-full md:overflow-auto ">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-1/3">
            <b className=" font-semibold text-gray-800" >บ้านแชร์ : </b>
            <span className="text-gray-600">{dataToModal?.share_id}</span>
          </div>
          <div className="w-2/3">
            <b className=" font-semibold text-gray-800">รหัสวงแชร์ : </b>
            <span className="text-gray-600">{dataToModal?.p_code}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
        
          <div className="w-1/3">
            <b className=" font-semibold text-gray-800">ชื่อวงแชร์ : </b>
            <span className="text-gray-600">{dataToModal?.p_share_name}</span>
          </div>
          <div className="w-2/3">
            <b className=" font-semibold text-gray-800">รูปแบบวงแชร์ : </b>
            <span className="text-gray-600">
            {dataToModal?.p_share_type === "1" && "บิดดอกตาม"}
            {dataToModal?.p_share_type === "2" && "ดอกตาม"}
            {dataToModal?.p_share_type === "3" && "ขั้นบันได"}
            {dataToModal?.p_share_type === "4" && "บิดลดต้น (ลดต้นงวดถัดไป)"}
            {dataToModal?.p_share_type === "5" && "บิดลดต้น (ลดต้นงวดที่บิด)"}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="w-full">
            <b className=" font-semibold text-gray-800">ดอกเบี้ย : </b>
            <span className="text-gray-600">{dataToModal?.p_share_interest}</span>
          </div>
          <div className="w-full">
            <b className=" font-semibold text-gray-800">ส่งต่องวด : </b>
            <span className="text-gray-600">{dataToModal?.p_share_send_per}</span>
          </div>
          <div className="w-full">
            <b className=" font-semibold text-gray-800">จำนวนเงินต้น : </b>
            <span className="text-gray-700">{dataToModal?.p_share_paid}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="w-1/3">
            <b className=" font-semibold text-gray-800">ค่าดูแลวง : </b>
            <span className="text-gray-600">{dataToModal?.p_share_maintain}</span>
          </div>
          <div className="w-2/3">
            <b className=" font-semibold text-gray-800">จำนวนมือ : </b>
            <span className="text-gray-600">{dataToModal?.p_share_hand}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="w-full">
            <b className=" font-semibold text-gray-800">หมายเหตุ : </b>
            <span className="text-gray-700">{dataToModal?.p_share_req}</span>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={() => handleOpen()} className="bg-gray-900 text-sm " size="md">
            ออก
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ViewWongShare;
