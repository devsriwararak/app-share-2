import {
  Button,
  Card,
  CardBody,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineHome,
  HiOutlinePencilAlt,
  HiOutlinePlus,
  HiOutlinePlusSm,
  HiOutlineUsers,
} from "react-icons/hi";
import { FcPlus } from "react-icons/fc";
import DataUser from "./DataUser";
import DataActivity from "./DataActivity";
import AddUserToHome from "../../../components/modal/User/AddUserToHome";
import axios from "axios";
import classNames from "classnames";
import { Authorization, checkNoToken } from "../../../auth/Data";
import LoadingComponent from "../../../components/pagination/LoadingComponent";

const ManageUser = () => {
  const [statusBtn, setStatusBtn] = useState(1);
  const [data, setData] = useState([]);
  const [selectData, setSelectData] = useState({});
  const [activeItem, setActiveItem] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const home_share_id = localStorage.getItem("home_share_id");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const handleBtnPage = (number) => {
    setStatusBtn(number);
  };

  const fetchDataMyUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_API
        }/home_share/users/${home_share_id}?search=${search}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      if (res) {
        setData(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      checkNoToken(error.response.data.message);
    }
  };

  const handleSelect = (item, index) => {
    setSelectData(item);
    setActiveItem(index);
  };

  useEffect(() => {
    fetchDataMyUser();
  }, [search]);

  return (
    <div>
      <AddUserToHome
        handleOpen={handleOpen}
        open={open}
        fetchDataMyUser={fetchDataMyUser}
      />

      <div className="flex flex-col md:flex-row gap-4">
        <div className=" w-full h-full md:w-1/4">
          <Card className="ring-2 ring-gray-800/5">
            <CardBody>
              <div className="flex flex-col md:flex-row   md:justify-between">
                <h2 className="text-base text-black font-bold flex items-center gap-1">
                  ลูกแชร์ ({data?.length})
                </h2>
                <Button
                  className="text-sm flex items-center gap-1 mt-2 md:mt-0   "
                  color="purple"
                  size="sm"
                  variant="filled"
                  onClick={handleOpen}
                >
                  <HiOutlinePlusSm size={20} />
                  เพิ่มลูกแชร์ใหม่
                </Button>
              </div>
              <div className="mt-3 w-full">
                <Input
                  className="test-sm"
                  label="ค้นหา ชื่อลูกค้า"
                  color="purple"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <ul className="mt-5 overflow-y-scroll ">
                {/* Loading Spinner */}
                <LoadingComponent loading={loading} TABLE_HEAD={null} />

                {loading === false &&
                  data.map((item, index) => (
                    <li
                      onClick={() => handleSelect(item, index)}
                      className={classNames(
                        activeItem === index && "bg-gray-300",
                        "hover:bg-gray-200 py-2 text-sm flex justify-between items-center px-2 cursor-pointer rounded-lg"
                      )}
                      key={index}
                    >
                      {`${index + 1}.  ${item.user_fname || item.fname} (${
                        item.user_code || item.lname
                      })`}

                      <div>
                        {" "}
                        <FcPlus
                          className=" cursor-pointer"
                          onClick={() => handleSelect(item, index)}
                          size={23}
                        />
                      </div>
                    </li>
                  ))}
              </ul>
            </CardBody>
          </Card>
          <p className="text-sm mt-4 text-red-500">กรณีสร้าง ท้าวประจำบ้าน ให้ใส่เบอร์โทรของเจ้าของบ้าน* สามารถ login เข้าดูข้อมูลตัวเองได้ (ส่วนตัว)</p>
        </div>

        <div className="w-full md:w-3/4 ">
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Button
              color="blue"
              size="sm"
              className=" text-sm flex items-center gap-2 "
              onClick={() => handleBtnPage(1)}
            >
              <HiOutlineHome size={20} /> ข้อมูลลูกแชร์
            </Button>
            <Button
              color="green"
              size="sm"
              className=" text-sm flex items-center gap-2"
              disabled={!selectData.user_id}
              onClick={() => handleBtnPage(2)}
            >
              {" "}
              <HiOutlineCalendar size={20} /> ข้อมูลกิจกรรม
            </Button>
          </div>
          <Card className="ring-2  ring-gray-800/5 mt-6 ">
            <CardBody>
              <div>
                {statusBtn === 1 && selectData?.id && (
                  <DataUser
                    data={data}
                    selectData={selectData}
                    fetchDataMyUser={fetchDataMyUser}
                  />
                )}
                {statusBtn === 2 && <DataActivity />}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
