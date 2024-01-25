import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineHome, HiOutlinePencilAlt } from "react-icons/hi";
import { Authorization } from "../../../auth/Data";
import { toast } from "react-toastify";

const DataUser = ({ selectData, fetchDataMyUser }) => {
  const [sendData, setSendData] = useState({});
  const home_share_id = localStorage.getItem("home_share_id");

  const handleChange = (e) => {
    setSendData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async()=>{
    try {
      const data = {
        id: sendData?.id,
        home_share_id ,
        fname: sendData?.fname || "",
        lname: sendData?.lname || "",
        address: sendData?.address || "",
        tell: sendData?.tell || "",
      };

      const res = await axios.put(`${import.meta.env.VITE_APP_API}/home_share/users`,data, {
        headers:{
          Authorization : Authorization
        }
      })
      console.log(res.data);
      if(res.status === 200){
        toast.success(res.data.message)
        fetchDataMyUser()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)

    }
  }

  useEffect(() => {
    setSendData( selectData)
  }, [selectData]);
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-base text-black font-bold flex items-center gap-3">
          <HiOutlineHome
            size={30}
            className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
          />
          ลูกแชร์ 
        </h2>

        <Button size="sm" color="purple" onClick={handleUpdate}>
          อัพเดท
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-5 text-sm">
        <div className="w-full">
          <Input
            name="fname"
            label="ชื่อ"
            color="purple"
            value={sendData?.fname || ""}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="w-full">
          <Input
            name="lname"
            label="สกุล"
            color="purple"
            value={sendData?.lname || ""}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-5 text-sm">
        <div className="w-full">
          <Input
            name="tell"
            label="เบอร์โทร"
            color="purple"
            value={sendData?.tell || ""}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="w-full">
          <Input
            name="address"
            label="ที่อยู่"
            color="purple"
            value={sendData?.address || ""}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-16">
        <Card className="w-full ring-2 ring-gray-800/5 mt-8 md:mt-0 h-full">
          <CardHeader className="h-14 bg-purple-400 text-white flex justify-center items-center text-md font-bold ring-1 ring-gray-300">
            วงแชร์ทั้งหมดที่เล่น (ข้อมูลปลอม)
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

        {selectData?.id && (
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
