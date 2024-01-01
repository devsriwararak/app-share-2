import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { HiOutlineInboxIn } from "react-icons/hi";
import ModalDetaUser from "./ModalDetaUser";

const UserData = ({ dataToModal }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    console.log(dataToModal);
  }, [dataToModal]);
  return (
    <>
      <ModalDetaUser open={open} handleOpen={handleOpen} />
      <Card className="w-full mt-8 md:mt-0">
        <CardHeader className="flex justify-center py-2.5 bg-purple-400 text-white font-semibold">
          ข้อมูลลูกแชร์
        </CardHeader>
        <CardBody>
          <div className="flex-col ">
            <div>
              <b className="text-gray-800 ">รหัสลูกแชร์ :</b>{" "}
              <span>{dataToModal?.code || ""}</span>
            </div>
            <div className="mt-3">
              <b className="text-gray-800">ชื่อ-สกุล :</b>{" "}
              <span>
                {`${dataToModal?.f_name || ""}  ${dataToModal?.l_nane || ""}`}
              </span>
            </div>
            <div className="mt-3">
              <b className="text-gray-800">Username :</b>{" "}
              <span>{dataToModal?.username || ""}</span>
            </div>
            <div className="mt-3">
              <b className="text-gray-800">เบอร์โทรศัพท์ :</b>{" "}
              <span>{dataToModal?.tel || ""}</span>
            </div>
            <div className="mt-3">
              <b className="text-gray-800">ที่อยู่ :</b>{" "}
              <span>{dataToModal?.address || ""}</span>
            </div>
          </div>

          {dataToModal?.code === "U0001" && (
            <div className="bg-green-500 p-2 mt-4 rounded-md px-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl text-white">+ 1,000</h1>
                <HiOutlineInboxIn
                  color="white"
                  size={24}
                  onClick={handleOpen}
                  className="cursor-pointer"
                />
              </div>
              <hr className="border-1 border-gray-400 mt-2" />
              <h4 className="mt-3 text-white text-lg">มือเป็น : 1,200 </h4>
              <h4 className="mt-3 text-white text-lg">มือตาย : 200 </h4>
            </div>
          )}

          {dataToModal?.code === "U0002" && (
            <div className="bg-red-500 p-2 mt-4 rounded-md px-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl text-white">- 400</h1>
                <HiOutlineInboxIn
                  color="white"
                  size={24}
                  onClick={handleOpen}
                  className="cursor-pointer"
                />
              </div>
              <hr className="border-1 border-gray-400 mt-2" />
              <h4 className="mt-3 text-white text-lg">มือเป็น : 100 </h4>
              <h4 className="mt-3 text-white text-lg">มือตาย : 500 </h4>
            </div>
          )}

          {dataToModal?.code === "U0003" && (
            <div className="bg-orange-600 p-2 mt-4 rounded-md px-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl text-white">(+/-) 0</h1>
                <HiOutlineInboxIn
                  color="white"
                  size={24}
                  onClick={handleOpen}
                  className="cursor-pointer"
                />
              </div>
              <hr className="border-1 border-gray-400 mt-2" />
              <h4 className="mt-3 text-white text-lg">มือเป็น : 0 </h4>
              <h4 className="mt-3 text-white text-lg">มือตาย : 0 </h4>
            </div>
          )}
        </CardBody>
      </Card>

      <Card className="w-full mt-8 md:mt-0">
        <CardHeader className="flex justify-center py-2.5 bg-purple-400 text-white font-semibold">
          วันที่กิจกรรม
        </CardHeader>

        <CardBody>ดำเนินการใน งวดที่ 3/3</CardBody>
      </Card>

      <Card className="w-full mt-8 md:mt-0">
        <CardHeader className="flex justify-center py-2.5 bg-purple-400 text-white font-semibold">
          วันที่จบวงแชร์
        </CardHeader>

        <CardBody>ดำเนินการใน งวดที่ 3/3</CardBody>
      </Card>
    </>
  );
};

export default UserData;
