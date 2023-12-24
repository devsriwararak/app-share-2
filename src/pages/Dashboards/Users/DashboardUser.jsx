import { Input, Progress } from "@material-tailwind/react";
import moment from "moment";
import React from "react";
import {
  HiOutlineCurrencyDollar,
  HiOutlineSaveAs,
  HiOutlineScale,
} from "react-icons/hi";
import {
  LiaCommentsDollarSolid,
  LiaMoneyBillWaveSolid,
  LiaWalletSolid,
} from "react-icons/lia";

const DashboardUser = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row mx-6 gap-2  items-center">
        <h1 className="text-black text-xl w-full  md:w-2/3 flex flex-row items-center gap-3">
          <HiOutlineSaveAs
            size={40}
            className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
          />{" "}
          สรุปรายรับ/รายจ่าย (ประจำวัน) งวด 3/3{" "}
        </h1>
        <div className="w-full  md:w-1/3">
          <Input type="date" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 text-gray-900 mt-5 m-4">
        <div className="w-full bg-blue-700 hover:bg-blue-600 mx-2 px-4 py-4 rounded-lg">
          <div className="flex flex-row gap-2 items-center">
            <LiaCommentsDollarSolid
              size={40}
              className="bg-gray-200 rounded-full px-1.5 py-1 text-blue-700 "
            />
            <h2 className="text-3xl text-white">177,069</h2>
          </div>
          <hr className="mt-2 border-gray-500" />
          <div className="flex flex-col mt-3 text-white gap-4 items-end">
            <p>[ยอดส่ง + หักรับ + ค่าดูแล]</p>
            <h3 className="text-xl">รายรับรวม</h3>
          </div>
        </div>

        <div className="w-full bg-yellow-700 hover:bg-yellow-600 mx-2 px-4 py-4 rounded-lg">
          <div className="flex flex-row gap-2 items-center">
            <LiaWalletSolid
              size={40}
              className="bg-gray-200 rounded-full px-1.5 py-1 text-yellow-800 "
            />
            <h2 className="text-3xl ">176,920</h2>
          </div>
          <hr className="mt-2 border-gray-500" />
          <div className="flex flex-col mt-3  gap-4 items-end">
            <p>[ยอดรับ + เงินแถม]</p>
            <h3 className="text-xl">รายจ่ายรวม</h3>
          </div>
        </div>
        <div className="w-full bg-green-700 hover:bg-green-600 mx-2 px-4 py-4 rounded-lg text-white">
          <div className="flex flex-row gap-2 items-center">
            <LiaMoneyBillWaveSolid
              size={40}
              className="bg-gray-200 rounded-full px-1.5 py-1 text-green-800 "
            />
            <h2 className="text-3xl ">+149</h2>
          </div>
          <hr className="mt-2 border-gray-500" />
          <div className="flex flex-col mt-3  gap-4 items-end">
            <p>[รายรับรวม - รายจ่ายรวม]</p>
            <h3 className="text-xl">สรุปยอด</h3>
          </div>
        </div>
      </div>

      <small className="text-gray-700 flex justify-end text-xs mx-6">
        {" "}
        ข้อมูล ณ วันที่ {moment().format("DD-M-YYYY")}
      </small>

      <h2 className="text-black text-xl mx-6 flex flex-row gap-3 items-center">
        <HiOutlineScale
          size={40}
          className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
        />{" "}
        รายการความสมบูรณ์ของข้อมูล งวด 3/3{" "}
      </h2>

      <div className="flex flex-col md:flex-row  gap-4 mt-4 mx-5">
        <div className="w-full bg-white px-4 py-5 rounded-lg text-gray-800 shadow-md border border-gray-300/5  ">
          <hr className=" border-y-4 border-red-400 rounded-lg mb-3" />
          <p className="text-xl">ขาดผู้เล่นและวันที่ในวงแชร์</p>
          <p>จำนวน 4 วง</p>
        </div>
        <div className="w-full bg-white px-4 py-5 rounded-lg text-gray-800 shadow-md border border-gray-300/5 ">
          <hr className=" border-y-4 border-red-400 rounded-lg mb-3" />
          <p className="text-xl">วงบิทขาดดอกเบี้ย</p>
          <p>จำนวน 1 วง</p>
        </div>

        <div className="w-full bg-white px-4 py-5 rounded-lg text-gray-800 shadow-md border border-gray-300/5 ">
          <hr className=" border-y-4 border-red-400 rounded-lg mb-3" />
          <p className="text-xl">ขาดยอดส่งวงขั้นบันได</p>
          <p>จำนวน 2 วง</p>
        </div>

        <div className="w-full bg-white px-4 py-5 rounded-lg text-gray-800 shadow-md border border-gray-300/5 ">
          <hr className=" border-y-4 border-green-400 rounded-lg mb-3" />

          <p className="text-xl">ไม่พบยอดติดลบในวงแชร์</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row  gap-4 mt-4 mx-5">
        <div className="w-full bg-white px-4 py-5 rounded-lg text-gray-800 shadow-md border border-gray-300/5 ">
        <hr className=" border-y-4 border-red-400 rounded-lg mb-3"  />
          <p className="text-xl">วงจบที่ยังไม่ได้ออฟไลน์</p>
          <p>จำนวน 5 วง</p>
        </div>
        <div className="w-full bg-white px-4 py-5 rounded-lg text-gray-800 shadow-md border border-gray-300/5 ">
        <hr className=" border-y-4 border-green-400 rounded-lg mb-3"  />
          <p className="text-xl">ไม่พบวันที่ซ้ำซ้อนในวงแชร์</p>
        </div>

        <div className="w-full bg-white px-4 py-5 rounded-lg text-gray-800 shadow-md border border-gray-300/5  ">
        <hr className=" border-y-4 border-green-400 rounded-lg mb-3"  />
          <p className="text-xl">ไม่พบความผิดปกติของวันที่ประจำงวด</p>
        </div>

   
       <div className="w-full  px-4 py-5">

       </div>
      </div>
    </div>
  );
};

export default DashboardUser;
