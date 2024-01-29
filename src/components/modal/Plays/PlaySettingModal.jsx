import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  CardBody,
  Checkbox,
  Input,
} from "@material-tailwind/react";
import Select from "react-select";
import axios from "axios";
import { Authorization } from "../../../auth/Data";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { HiTrash } from "react-icons/hi2";

const PlaySettingModal = ({ open, handleOpen, dataToModalSetting }) => {
  const [dataUser, setDataUser] = useState([]);
  const [dataMyUsers, setDataMyUsers] = useState([]);
  const home_share_id = localStorage.getItem("home_share_id");

  // Sends
  const [sendDataUser, setSendDataUser] = useState({});

  const fetchDataUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/home_share/users/${home_share_id}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      if (res) {
        const newData = res.data.map((item) => ({
          value: item.id,
          label: item.fname,
        }));
        setDataUser(newData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataMyUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/play/list/user?play_list_id=${
          dataToModalSetting?.id
        }`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      console.log(res.data);
      setDataMyUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const AddNewMyUser = async () => {
    const data = {
      play_list_id: dataToModalSetting.id,
      home_share_user_id: sendDataUser.home_share_user_id,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/play/list/user`,
        data,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        fetchDataMyUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMyUserSelected = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_API}/play/list/user/${id}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        fetchDataMyUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataUser();
    fetchDataMyUser();
  }, [dataToModalSetting.id]);
  return (
    <div>
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader className="bg-gray-200 rounded-lg py-2.5">
          {" "}
          จัดการข้อมูล : {dataToModalSetting.id}
        </DialogHeader>
        <DialogBody className="h-96 md:h-[500px] overflow-y-scroll">
          <div className="flex flex-col md:flex-row gap-2">

            <div className="w-full md:w-5/12 ">
              <Card className=" shadow-xl">
                <CardBody >
                  <h2 className="text-base text-gray-900">ข้อมูลหน้าตาราง</h2>
                  <div className=" grid grid-cols-2 md:grid-cols-2 gap-2 mt-4">
                    <input
                      type="date"
                      className="border-2 border-gray-400 py-1 px-2 rounded-lg "
                    />
                    <input
                      type="text"
                      className="border-2 border-gray-400 py-1 px-2 rounded-lg "
                      placeholder="งวดที่เปีย"
                    />
                  </div>

                  <div className=" grid grid-cols-2 md:grid-cols-2 gap-2 mt-4">
                    <input
                      type="text"
                      className="border-2 border-gray-400 py-1 px-2 rounded-lg "
                      placeholder="ดอกเบี้ย"
                    />
                    <input
                      type="text"
                      className="border-2 border-gray-400 py-1 px-2 rounded-lg "
                      placeholder="ยอดรับ"
                    />
                  </div>

                  <div className=" grid grid-cols-2 md:grid-cols-2 gap-2 mt-4">
                    <input
                      type="text"
                      className="border-2 border-gray-400 py-1 px-2 rounded-lg "
                      placeholder="เงินแถม"
                    />
                    <input
                      type="text"
                      className="border-2 border-gray-400 py-1 px-2 rounded-lg "
                      placeholder="ยกเว้นค่าดูแลวง ยังไม่ทำ"
                    />
                  </div>
                </CardBody>
              </Card>

              <Card className=" shadow-xl mt-4">
                <CardBody>
                  <h2 className="text-base text-gray-900">จัดการลูกแชร์</h2>

                  <div className="flex  flex-row gap-2 items-center mt-3">
                    <Select
                      options={dataUser}
                      className="w-full"
                      placeholder="เลือกลูกแชร์"
                      required
                      // defaultValue={
                      //   dataToModal?.id
                      //     ? dataTypeShare.find(
                      //         (option) => option.value == dataToModal?.type_wong_id
                      //       )
                      //     : ""
                      // }
                      onChange={(e) =>
                        setSendDataUser((prev) => ({
                          ...prev,
                          home_share_user_id: e.value,
                        }))
                      }
                    />
                    <FcPlus
                      size={35}
                      onClick={AddNewMyUser}
                      className=" cursor-pointer"
                    />
                  </div>

                  <ul className="mt-4 h-24 overflow-y-scroll">
                    {dataMyUsers.map((item, index) => (
                      <li
                        className="flex  justify-between p-0.5 hover:bg-gray-200"
                        key={item.id}
                      >
                        {" "}
                        {index + 1} ({item.user_fname}){" "}
                        <HiTrash
                          size={20}
                          className=" cursor-pointer text-red-700"
                          onClick={() => deleteMyUserSelected(item.id)}
                        />
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>

            </div>

            <div className="w-full md:w-7/12 ">
              <Card className=" shadow-xl">
                <CardBody>
                  <h2 className="text-base text-gray-900">รายการหักรับ</h2>

                  <div className="flex flex-col md:flex-row gap-2 mt-2">
                    <Button className="text-sm" size="sm" color="purple">
                      หักจบวง
                    </Button>
                    <Button className="text-sm" size="sm" color="purple">
                      หักดอกเบี้ยจบวง
                    </Button>
                    <Button className="text-sm" size="sm" color="purple">
                      หักท้ายท้าว
                    </Button>
                  </div>

                  <h2 className="text-base text-gray-900 mt-4">
                    สร้างรายการหักรับ
                  </h2>

                  <div className="flex flex-col md:flex-row gap-2 mt-2">
                    <input
                      type="text"
                      className="border-2 border-gray-400 py-1 px-2 rounded-lg w-full "
                      placeholder="รายละเอียด"
                    />

                    <input
                      type="text"
                      className="border-2 border-gray-400 py-1 px-2 rounded-lg  w-full "
                      placeholder="จำนวนเงิน"
                    />

                    <FcPlus size={35} className=" w-20 cursor-pointer" />
                  </div>

              <div className="flex flex-col md:flex-row gap-4 justify-between">
              <h2 className="text-base text-gray-900 mt-4">
                    รวมรายการหักรับ
                  </h2>
                  <h2 className="text-base text-red-700 mt-4">
                    ยอดรวมหักรับ 000 บาท
                  </h2>
              </div>

              
              <ul className="mt-4 h-20 overflow-y-scroll">
                    {dataMyUsers.map((item, index) => (
                      <li
                        className="flex  justify-between p-0.5 hover:bg-gray-200"
                        key={item.id}
                      >
                        {" "}
                        {index + 1} ({item.user_fname}){" "}
                        <HiTrash
                          size={20}
                          className=" cursor-pointer text-red-700"
                          onClick={() => deleteMyUserSelected(item.id)}
                        />
                      </li>
                    ))}
                  </ul>


                </CardBody>
              </Card>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>ออก</span>
          </Button>
          <Button variant="gradient" color="purple" onClick={handleOpen}>
            <span>อัพเดท</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default PlaySettingModal;
