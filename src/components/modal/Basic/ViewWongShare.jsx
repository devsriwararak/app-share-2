import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { HiOutlineDesktopComputer } from "react-icons/hi";

const ViewWongShare = ({ open, handleOpen, dataToModal }) => {

  return (
    <Dialog open={open} size="md" handler={handleOpen}>
      <DialogHeader className="bg-gray-200 flex gap-2 rounded-lg text-lg ">
        <HiOutlineDesktopComputer /> ข้อมูลวงแชร์ที่ : {dataToModal?.code}
      </DialogHeader>
      <DialogBody className=" py-10 h-96 overflow-scroll md:h-full md:overflow-auto ">
        <div className="flex flex-col md:flex-row gap-4 -mt-4">
          <Card className="w-full shadow-xl ring-2 ring-gray-800/5">
            <CardBody>
              <h2 className="text-lg font-semibold text-purple-900">
                ข้อมูลวงแชร์
              </h2>
              {dataToModal?.home_share_name && (
                <div className="mt-3">
                  <b className=" font-semibold text-gray-800 ">บ้านแชร์ : </b>
                  <span className="text-gray-700">
                    {dataToModal?.home_share_name}
                  </span>
                </div>
              )}

              <div className="mt-1">
                <b className=" font-semibold text-gray-800">รหัสวงแชร์ : </b>
                <span className="text-gray-700">{dataToModal?.code}</span>
              </div>

              <div className="mt-1">
                <b className=" font-semibold text-gray-800">ชื่อวงแชร์ : </b>
                <span className="text-gray-700">{dataToModal?.name}</span>
              </div>

              <div className="flex flex-col md:flex-row gap-2 mt-1">
                <b className=" font-semibold text-gray-800">รูปแบบวงแชร์ : </b>
                <span className="text-gray-700 ">
                  {dataToModal?.type_wong_id === 1 && "บิดดอกตาม"}
                  {dataToModal?.type_wong_id === 2 && "ดอกตาม"}
                  {dataToModal?.type_wong_id === 3 && "ขั้นบันได"}
                  {dataToModal?.type_wong_id === 4 &&
                    "บิดลดต้น (ลดต้นงวดถัดไป)"}
                  {dataToModal?.type_wong_id === 5 &&
                    "บิดลดต้น (ลดต้นงวดที่บิด)"}
                </span>
              </div>

              <div className="mt-1">
                <b className=" font-semibold text-gray-800">หมายเหตุ : </b>
                <span className="text-gray-700">{dataToModal?.note}</span>
              </div>
            </CardBody>
          </Card>

          <Card className="w-full shadow-xl ring-2 ring-gray-800/5">
            <CardBody>
              <h2 className="text-lg font-semibold text-purple-900">
                ข้อมูลการเงิน
              </h2>

              <div className="mt-3">
                <b className=" font-semibold text-gray-800">ดอกเบี้ย : </b>
                <span className="text-gray-700">
                  {dataToModal?.interest?.toLocaleString()} บาท
                </span>
              </div>
              <div className="mt-1">
                <b className=" font-semibold text-gray-800">ส่งต่องวด : </b>
                <span className="text-gray-700">
                  {dataToModal?.installment?.toLocaleString()} บาท
                </span>
              </div>
              <div className="mt-1">
                <b className=" font-semibold text-gray-800">จำนวนเงินต้น : </b>
                <span className="text-gray-700">{dataToModal?.price?.toLocaleString()} บาท</span>
              </div>

              <div className="mt-1">
                <b className=" font-semibold text-gray-800">ค่าดูแลวง : </b>
                <span className="text-gray-700">
                  {dataToModal?.pay_for_wong?.toLocaleString()} บาท
                </span>
              </div>
              <div className="mt-1">
                <b className=" font-semibold text-gray-800">จำนวนมือ : </b>
                <span className="text-gray-700">{dataToModal?.count} มือ</span>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <b className=" font-semibold text-gray-800">บ้านแชร์ : </b>
            <span className="text-gray-600">
              {dataToModal?.home_share_name}
            </span>
          </div>
          <div className="w-full">
            <b className=" font-semibold text-gray-800">รหัสวงแชร์ : </b>
            <span className="text-gray-600">{dataToModal?.code}</span>
          </div>
          <div className="w-full">
            <b className=" font-semibold text-gray-800">ชื่อวงแชร์ : </b>
            <span className="text-gray-600">{dataToModal?.name}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="w-2/3">
            <b className=" font-semibold text-gray-800">รูปแบบวงแชร์ : </b>
            <span className="text-gray-600">
              {dataToModal?.type_wong_id === 1 && "บิดดอกตาม"}
              {dataToModal?.type_wong_id === 2 && "ดอกตาม"}
              {dataToModal?.type_wong_id === 3 && "ขั้นบันได"}
              {dataToModal?.type_wong_id === 4 && "บิดลดต้น (ลดต้นงวดถัดไป)"}
              {dataToModal?.type_wong_id === 5 && "บิดลดต้น (ลดต้นงวดที่บิด)"}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="w-full">
            <b className=" font-semibold text-gray-800">ดอกเบี้ย : </b>
            <span className="text-gray-600">{dataToModal?.interest}</span>
          </div>
          <div className="w-full">
            <b className=" font-semibold text-gray-800">ส่งต่องวด : </b>
            <span className="text-gray-600">{dataToModal?.installment}</span>
          </div>
          <div className="w-full">
            <b className=" font-semibold text-gray-800">จำนวนเงินต้น : </b>
            <span className="text-gray-700">{dataToModal?.price}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="w-1/3">
            <b className=" font-semibold text-gray-800">ค่าดูแลวง : </b>
            <span className="text-gray-600">{dataToModal?.pay_for_wong}</span>
          </div>
          <div className="w-2/3">
            <b className=" font-semibold text-gray-800">จำนวนมือ : </b>
            <span className="text-gray-600">{dataToModal?.count}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="w-full">
            <b className=" font-semibold text-gray-800">หมายเหตุ : </b>
            <span className="text-gray-700">{dataToModal?.note}</span>
          </div>
        </div> */}

        <div className="flex justify-end mt-4">
          <Button
            onClick={() => handleOpen()}
            className="bg-gray-900 text-sm "
            size="md"
          >
            ออก
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ViewWongShare;
