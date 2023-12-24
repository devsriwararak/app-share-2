import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import React from "react";
import { HiOutlineCalendar, HiOutlineScale } from "react-icons/hi";

const DataActivity = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mt-5">
        <Card className="w-full ring-2 ring-gray-800/5 mt-8 md:mt-0">
            <CardHeader className="h-14 bg-purple-400 text-white flex justify-start px-8 items-center text-md  font-bold gap-3"> <HiOutlineCalendar size={20}/> วันที่กิจกรรมวงค์แชร์</CardHeader>
            <CardBody>ดำเนินการทำใน งวดที่3/3 ครับ</CardBody>
        </Card>

        <Card className="w-full ring-2 ring-gray-800/5 mt-8 md:mt-0">
            <CardHeader className="h-14 bg-purple-400 text-white flex justify-start px-8 items-center text-md  font-bold gap-3"> <HiOutlineScale size={20}/> วันที่จบวงค์แชร์</CardHeader>
            <CardBody>ดำเนินการทำใน งวดที่3/3 ครับ</CardBody>
        </Card>
      </div>
    </>
  );
};

export default DataActivity;
