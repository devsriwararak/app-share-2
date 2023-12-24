import { Card, CardBody } from "@material-tailwind/react";
import React from "react";

const MyWongWong = ({ data }) => {
  return (
    <div>
      <h1 className="text-lg text-black">ข้อมูลวงค์แชร์.  {data.wong}</h1>

      <div className="flex flex-col md:flex-row gap-4 mt-4 text-gray-800">
        <div className="w-full">
          <b>รหัสวงค์แชร์ :</b> <span>xxxx</span>
        </div>
        <div className="w-full">
          <b>ชื่อวงค์แชร์ :</b> <span>{data.wong}</span>
        </div>
        <div className="w-full">
          <b>บ้านแชร์ :</b> <span>{data.home}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-4 text-gray-800">
        <div className="w-full">
          <b>รูปแบบวงค์แชร์ :</b> <span>บิดดอกตาม</span>
        </div>
        <div className="w-full">
          <b>จำนวนเงินต้น :</b> <span>500 บาท</span>
        </div>
        <div className="w-full">
          <b>ค่าดูแลง ค์ :</b> <span>100 บาท</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-rowgap-4 mt-4 text-gray-800">
        <div className="w-full md:w-4/12">
          <b>จำนวนมือ :</b> <span>20 คน</span>
        </div>
        <div className="w-full md:w-8/12 whitespace-nowrap overflow-hidden mt-3">
          <b>หมายเหตุ :</b> <span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
        </div>
      </div>

      <hr className="border border-gray-200 mt-8"/>

      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <Card className="w-full ring-2 ring-gray-200">
          <CardBody><p className='text-lg text-gray-800'>ข้อมูลวงค์แชร์ จะดำเนินการในงวดที่ 3/3 ครับ.</p></CardBody>
        </Card>

        <Card className="w-full ring-2 ring-gray-200">
          <CardBody><p className='text-lg text-gray-800'>ข้อมูลวงค์แชร์ จะดำเนินการในงวดที่ 3/3 ครับ.</p></CardBody>
        </Card>

      </div>
    </div>
  );
};

export default MyWongWong;
