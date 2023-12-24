import React from "react";
import { Link } from "react-router-dom";
import DashboardStartGrid from "./DashboardStartGrid";
import TransactionChart from "./TransactionChart";
import BuyerProfileChart from "./BuyerProfileChart";
import moment from "moment";

const Dashboard = () => {
  return (
    <>
      <div className="  ">
        <div className="flex gap-4 w-full">
          <DashboardStartGrid />
        </div>

        <div className=" flex flex-col md:flex-row lg:flex-row gap-2 w-full ">
          <TransactionChart />
          <BuyerProfileChart />
        </div>

        <div className="text-black mt-10">
          <h2 className="text-3xl">
            กำลังปรับปรุง ! Function นี้ (ใช้งานได้ในงวดที่ 3/3){" "}
          </h2>
        </div>

        {/* <div className="flex flex-col md:flex-row gap-4 text-gray-900 mt-5 m-4">

          <div className="w-full bg-blue-700 mx-2 px-4 py-4 rounded-lg">
            <h2 className="text-3xl text-white">177,069</h2>
            <hr className="mt-2 border-gray-500" />
            <div className="flex flex-col mt-3 text-white gap-4 items-end">
              <p>[ยอดส่ง + หักรับ + ค่าดูแล]</p>
              <h3 className="text-xl">รายรับรวม</h3>
            </div>
          </div>

          <div className="w-full bg-yellow-700 mx-2 px-4 py-4 rounded-lg">
          <h2 className="text-3xl ">176,920</h2>
            <hr className="mt-2 border-gray-500" />
            <div className="flex flex-col mt-3  gap-4 items-end">
              <p>[ยอดรับ + เงินแถม]</p>
              <h3 className="text-xl">รายจ่ายรวม</h3>
            </div>
          </div>
          <div className="w-full bg-green-700 mx-2 px-4 py-4 rounded-lg text-white">
          <h2 className="text-3xl ">+149</h2>
            <hr className="mt-2 border-gray-500" />
            <div className="flex flex-col mt-3  gap-4 items-end">
              <p>[รายรับรวม - รายจ่ายรวม]</p>
              <h3 className="text-xl">สรุปยอด</h3>
            </div>
          </div>
        </div>

        <small className="text-black flex justify-end text-sm"> ข้อมูล ณ วันที่ {moment().format('DD-M-YYYY') }</small> */}
      </div>
    </>
  );
};

export default Dashboard;
