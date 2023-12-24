import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import React from "react";
import { HiOutlineHome, HiOutlinePencilAlt } from "react-icons/hi";

const DataUser = ({ data, selectData }) => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-lg text-black font-bold flex items-center gap-3">
          <HiOutlineHome
            size={30}
            className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
          />
          ข้อมูลลูกแชร์
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-5">
        <div className="w-full">
          <b>รหัส : </b> <span> {selectData.code} </span>
        </div>
        <div className="w-full">
          <b>ชื่อ : </b> <span> {selectData.f_name} </span>
        </div>
        <div className="w-full">
          <b>สกุล : </b> <span>{selectData.l_nane}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="w-1/3">
          <b>เบอร์โทร : </b> <span>{selectData.tel}</span>
        </div>
        <div className="w-2/3">
          <b>ที่อยู่ : </b> <span>{selectData.address}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-16">
        <Card className="w-full md:w-2/3 ring-2 ring-gray-800/5 mt-8 md:mt-0 h-full">
          <CardHeader className="h-14 bg-purple-400 text-white flex justify-center items-center text-md font-bold ring-1 ring-gray-300">
            วงแชร์ทั้งหมดที่เล่น
          </CardHeader>
          <CardBody>
            {selectData?.code && (
              <div>
                <p className="text-black text-lg">18 ธ.ค. 2566</p>
                <ul>
                  <li>- 217(วง สีม่วง บิทลดต้น 104,720) </li>
                  <li>- (ง.19/22) [104,720] </li>
                </ul>
                <hr className="mt-2 border-gray-300" />
                <p className="text-black text-lg mt-2">18 ธ.ค. 2566</p>
                <ul>
                  <li>- 217(วง สีม่วง บิทลดต้น 104,720) </li>
                  <li>- (ง.19/22) [104,720] </li>
                </ul>
                <hr className="mt-2 border-gray-300" />
              </div>
            )}

            <p className="mt-4">ดำเนินการทำใน งวดที่3/3 ครับ</p>
          </CardBody>
        </Card>

        {selectData?.code && (
          <div className="w-full md:w-1/3">
            {/* Green Report */}
            <div className="bg-green-500 p-2 mt-4 rounded-md px-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl text-white">+ 1,000</h1>
              </div>
              <hr className="border-1 border-gray-400 mt-2" />
              <h4 className="mt-3 text-white text-lg">มือเป็น : 1,200 </h4>
              <h4 className="mt-3 text-white text-lg">มือตาย : 200 </h4>
            </div>

            {/* Yellow Report */}
            <div className="bg-orange-600 p-2 mt-4 rounded-md px-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl text-white">(+/-) 0</h1>
                {/* <HiOutlinePhotograph
                  size={25}
                  color="white"
                  className=" cursor-pointer"
                  onClick={handleOpen}
                /> */}
              </div>
              <hr className="border-1 border-gray-400 mt-2" />
              <h4 className="mt-3 text-white text-lg">มือเป็น : 0 </h4>
              <h4 className="mt-3 text-white text-lg">มือตาย : 0 </h4>
            </div>

            {/* red Report */}
            <div className="bg-red-500 p-2 mt-4 rounded-md px-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl text-white">- 400</h1>
                {/* <HiOutlinePhotograph
                  size={25}
                  color="white"
                  className=" cursor-pointer"
                  onClick={handleOpen}
                /> */}
              </div>
              <hr className="border-1 border-gray-400 mt-2" />
              <h4 className="mt-3 text-white text-lg">มือเป็น : 100 </h4>
              <h4 className="mt-3 text-white text-lg">มือตาย : 500 </h4>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DataUser;
