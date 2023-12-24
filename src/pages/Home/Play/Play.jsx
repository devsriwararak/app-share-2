import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  HiOutlineCash,
  HiOutlineChatAlt2,
  HiOutlinePencilAlt,
  HiOutlinePlay,
  HiOutlinePlus,
} from "react-icons/hi";
import { FcPlus } from "react-icons/fc";
import PlayData from "./PlayData";
import PlayMoney from "./PlayMoney";
import PlaySetting from "./PlaySetting";
import WongShareModal from "../../../components/modal/Basic/WongShareModal";
import classNames from "classnames";

const dataWongShare = [
  { code: "W00001", name: "วงข้าวโพด 500" },
  { code: "W00002", name: "วง002 600" },
  { code: "W00003", name: "วง003 700" },
  { code: "W00004", name: "วง004 800" },
];

const Play = () => {
  const [statusBtn, setStatusBtn] = useState(1);
  const [data, setData] = useState({});
  const [activeItem, setActiveItem] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = (number) => setOpen(!open);

  const handleStatusBtn = (number) => {
    setStatusBtn(number);
  };

  const handleSelect = (data, index) => {
    setData((prev) => ({
      ...prev,
      name: data.name,
      code: data.code,
    }));
    setActiveItem(index);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <WongShareModal handleOpen={handleOpen} open={open} />

      <div className=" w-full md:w-1/3 ">
        <Card className="ring-2 ring-gray-300/20">
          <CardBody>
            <div className="flex justify-between">
              <h2 className="text-lg font-bold text-black flex items-center gap-2">
                <HiOutlineChatAlt2
                  size={35}
                  className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
                />
                วงแชร์ (4)
              </h2>
              <Button
                color="purple"
                size="sm"
                className="flex items-center gap-2  text-sm"
                onClick={handleOpen}
              >
                <HiOutlinePlus size={18} />
                สร้างวงแชร์
              </Button>
            </div>

            <div className="mt-3">
              <Input label="ค้นหาวงแชร์ของฉัน" color="purple" />
            </div>

            <ul className="mt-4 overflow-y-scroll">
              {dataWongShare.map((data, index) => (
                <div key={index}>
                  <li
                    onClick={() => handleSelect(data, index)}
                    className={classNames(
                      activeItem === index && "bg-gray-800/20",
                      "hover:bg-gray-200 py-2 flex justify-between items-center px-2 rounded-lg cursor-pointer"
                    )}
                  >
                    {` ${index + 1}.  ${data.code}  (${data.name})`}

                    <FcPlus
                      onClick={() => handleSelect(data, index)}
                      className=" cursor-pointer"
                      size={25}
                    />
                  </li>
                  {/* <hr className="m-1.5" /> */}
                </div>
              ))}
            </ul>
          </CardBody>
        </Card>

        <div className="mt-8 bg-red-100 px-4 py-4">
          <h2 className="text-lg text-black">ดำเนินการในงวด 3/3</h2>
        </div>
      </div>
      <div className="w-full md:w-2/3 ">
        <div className="flex gap-2">
          <Button
            className="flex flex-col md:flex-row gap-2 items-center text-sm"
            color="blue"
            onClick={() => handleStatusBtn(1)}
            size="sm"
          >
            <HiOutlinePencilAlt size={22} /> ข้อมูลพื้นฐาน
          </Button>
          <Button
            className="flex  flex-col md:flex-row gap-2 items-center  text-sm"
            color="green"
            onClick={() => handleStatusBtn(2)}
            size="sm"
          >
            <HiOutlinePlay size={22} /> รายละเอียดวงแชร์
          </Button>
          <Button
            className="flex  flex-col md:flex-row gap-2 items-center  text-sm"
            color="orange"
            onClick={() => handleStatusBtn(3)}
            size="sm"
          >
            <HiOutlineCash size={22} />
            รายละอียดค่างวดและสถานะการชำระเงิน
          </Button>
        </div>
        <Card className="mt-4 ring-2 ring-gray-300/20">
          <CardBody>
            {statusBtn === 1 && <PlayData data={data} setData={setData} />}
            {statusBtn === 2 && <PlaySetting />}
            {statusBtn === 3 && <PlayMoney />}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Play;
