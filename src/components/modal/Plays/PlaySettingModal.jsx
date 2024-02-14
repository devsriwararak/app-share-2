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
import Swal from "sweetalert2";
import moment from "moment";

const PlaySettingModal = ({
  open,
  handleOpen,
  dataToModalSetting,
  fetchDataPlayList,
}) => {
  const [dataUser, setDataUser] = useState([]);
  const [dataMyUsers, setDataMyUsers] = useState([]);
  const home_share_id = localStorage.getItem("home_share_id");
  const [sendData, setSendData] = useState({});
  const [deduction, setDeduction] = useState(false);
  const [message, setmessage] = useState(null);
  // moment.locale("th");

  // Sends
  const [sendDataUser, setSendDataUser] = useState({});
  // สร้างรายการหักรับเอง
  const [deducation, setDeducation] = useState(0);

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
        fetchDataPlayList();
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
        fetchDataPlayList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const data = {
      play_id: sendData.play_id,
      play_list_id: sendData.id,
      play_date: sendData.play_date,
      free_money: sendData.free_money,
      deducation_name: sendData.deducation_name,
      deducation_price: sendData.deducation_price,
      deducation_number: sendData.deducation_number,
      installment: sendData.installment,
      price: sendData.price,
      index: sendData.index,
      count: sendData.count,
      type_wong_id: sendData.type_wong_id,
      interest: sendData.interest,
      shipping : sendData.shipping
    };
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/play/list`,
        data,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        fetchDataPlayList();
        handleOpen();
      }
    } catch (error) {
      console.log(error);
      setmessage(error.response.data);
      setTimeout(() => {
        setmessage(null);
      }, 5000);
    }
  };

  const openDeducation = () => {
    setDeduction(!deduction);
  };

  const handleDeducation = async (number) => {
    alert("รายการนี้จะบันทึกทับรายการเก่า ตกลงหรือไม่ ?");

    if (number === 1 || number === 2 || number === 3) {
      setDeducation(0);
      let deducation_name =
        number === 1
          ? "หักจบวง"
          : number === 2
          ? "หักดอกเบี้ยจบวง"
          : "หักท้ายท้าว";
          const deducation_price = 
          number === 1 ? 200 :
          number === 2 ? 300 :
          // parseInt(sendData.type_wong_id == 3 ? sendData.shipping : sendData.installment) sendData.installment, 10
          parseInt(sendData.type_wong_id == 3 ? (sendData.shipping == "" ? 0 : sendData.shipping) :  500);

      setSendData((prev) => ({
        ...prev,
        deducation_name,
        deducation_price ,
        deducation_number: number,
      }));
    } else {
      setSendData((prev) => ({
        ...prev,
        deducation_name: "สร้างรายการหักรับ",
        deducation_price: deducation,
        deducation_number: number,
      }));
    }
  };

  useEffect(() => {
    fetchDataUser();
    fetchDataMyUser();
    setSendData(dataToModalSetting);
  }, [dataToModalSetting.id]);
  return (
    <div>
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader className="bg-gray-200 rounded-lg py-2.5">
          {" "}
          จัดการข้อมูล : {sendData.id}
        </DialogHeader>
        <DialogBody className="h-96 md:h-[500px] overflow-y-scroll">
          {JSON.stringify(sendData)}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-5/12 ">
              <div className="border-2 border-gray-300 bg-gray-50 shadow-sm rounded-lg px-4 py-4">
                <h2 className="text-base text-gray-900 font-semibold">
                  ข้อมูลหน้าตาราง {sendData?.play_date}
                </h2>
                <div className=" grid grid-cols-2 md:grid-cols-2 gap-2 mt-2">
                  <div>
                    <label className="text-xs text-gray-700">งวดที่เปีย</label>
                    <input
                      type="date"
                      className="border-2 border-gray-400 py-1 px-2 rounded-lg "
                      value={sendData?.play_date || ""}
                      disabled={dataMyUsers == ""}
                      onChange={(e) =>
                        setSendData((prev) => ({
                          ...prev,
                          play_date: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="w-full">
                    <label className="text-xs text-gray-700 ">ดอกเบี้ย</label>
                    <input
                      disabled
                      type="text"
                      className="border-2 border-gray-400 py-1 px-2 rounded-lg w-full "
                      placeholder="ดอกเบี้ย"
                      value={sendData?.interest || 0}
                      onChange={(e) =>
                        setSendData((prev) => ({
                          ...prev,
                          interest: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className=" grid grid-cols-2 md:grid-cols-2 gap-2 mt-1">
                  <div className="w-full">
                    <label className="text-xs text-gray-700 ">ยอดรับ</label>
                    <input
                      disabled
                      type="text"
                      className="border-2 border-gray-400 py-1 px-2 rounded-lg w-full "
                      placeholder="ยอดรับ"
                      value={sendData?.received || 0}
                      onChange={(e) =>
                        setSendData((prev) => ({
                          ...prev,
                          received: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-700 ">เงินแถม</label>
                    <input
                      disabled
                      type="text"
                      className="border-2 border-gray-400 py-1 px-2 rounded-lg w-full "
                      placeholder="เงินแถม"
                      value={sendData?.free_money || 0}
                      onChange={(e) =>
                        setSendData((prev) => ({
                          ...prev,
                          free_money: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className=" grid grid-cols-2 md:grid-cols-2 gap-2 mt-1">
                  <div>
                    <label className="text-xs text-gray-700 ">
                      ยกเว้นค่าดูแลวง
                    </label>
                    <input
                      disabled
                      type="text"
                      className="border-2 border-gray-400 py-1 px-2 rounded-lg w-full "
                      placeholder="ยกเว้นค่าดูแลวง ยังไม่ทำ"
                    />
                  </div>

                  {sendData.type_wong_id === 3 && (
                    <div>
                      <label className="text-xs text-gray-700 ">
                        ยอดส่ง
                      </label>
                      <input
                        onChange={(e)=>setSendData((prev=>({
                          ...prev,
                          shipping : e.target.value
                        })))}
                        type="number"
                        value={sendData.shipping || 0}
                        className="border-2 border-gray-400 py-1 px-2 rounded-lg w-full "
                        placeholder="ยอดส่ง"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* จัดการลูกแชร์ */}

              <div className="border-2 border-gray-300 bg-gray-50 shadow-sm rounded-lg px-4 py-3 mt-3  ">
                <h2 className="text-base text-gray-900 font-semibold">
                  จัดการลูกแชร์
                </h2>

                <div className="flex  flex-row gap-2 items-center mt-2">
                  <Select
                    options={dataUser}
                    className="w-full"
                    placeholder="เลือกลูกแชร์"
                    required
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

                <ul className="mt-4 h-16 overflow-y-scroll">
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
              </div>
            </div>

            {/* รายการหักรับ */}

            <div className="w-full md:w-7/12 ">
              <div className="border-2 border-gray-300 bg-gray-50 shadow-sm rounded-lg px-4 py-5 mt-3">
                <h2 className="text-base text-gray-900 font-semibold">
                  รายการหักรับ
                </h2>

                <div className="flex flex-col md:flex-row gap-2 mt-2">
                  <Button
                    onClick={() => handleDeducation(1)}
                    className="text-sm w-full"
                    size="sm"
                    color="purple"
                    disabled={sendData.play_status == 1 || sendData.index === 0}
                  >
                    หักจบวง
                  </Button>
                  <Button
                    onClick={() => handleDeducation(2)}
                    className="text-sm w-full"
                    size="sm"
                    color="red"
                    disabled={
                      sendData.play_status === 1 || sendData.index === 0
                    }
                  >
                    หักดอกเบี้ยจบวง
                  </Button>
                  <Button
                    onClick={() => handleDeducation(3)}
                    className="text-sm w-full"
                    size="sm"
                    color="purple"
                    disabled={
                      sendData.play_status === 1 || sendData.index === 0
                    }
                  >
                    หักท้ายท้าว
                  </Button>
                </div>

                {sendData.index === 1 ||
                  (sendData.type_wong_id === 1 && (
                    <div className="mt-4  flex flex-row items-center justify-start gap-4">
                      <p className="w-2/3">สร้างรายการหักรับ</p>
                      <Input
                        onChange={(e) => setDeducation(e.target.value)}
                        color="purple"
                        label="สร้างรายการหักรับ"
                        value={deducation}
                        className="w-1/3"
                        type="number"
                      />
                      <Button
                        onClick={() => handleDeducation(4)}
                        size="sm"
                        className="text-sm w-1/3 "
                        variant="outlined"
                        color="purple"
                      >
                        เลือก
                      </Button>
                    </div>
                  ))}

                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <h2 className="text-base text-gray-900 mt-4 font-semibold">
                    รายละเอียดการหักรับ
                  </h2>
                  <h2 className="text-base text-red-700 mt-4">
                    {sendData?.deducation_name || ""}{" "}
                    {sendData?.deducation_price || 0} บาท
                  </h2>
                </div>

                <h2 className="text-base text-gray-900 mt-4 font-semibold">
                  สรุปรายการ
                </h2>

                <div className="text-sm mt-2 flex flex-row gap-4 justify-between">
                  <div>
                    <b className="font-semibold text-gray-700 ">วันที่</b>{" "}
                    <span>{sendData?.start_date_th}</span>
                  </div>
                  <div>
                    <b className="font-semibold text-gray-700 "> งวดที่เปีย</b>{" "}
                    <span>{sendData?.play_date_th}</span>
                  </div>
                  <div>
                    <b className="font-semibold text-gray-700 "> ดอกเบี้ย</b>{" "}
                    <span>{sendData?.interest}</span>
                  </div>
                </div>

                <div className="text-sm mt-2 flex flex-row gap-4 justify-between">
                  <div>
                    <b className="font-semibold text-gray-700 ">ยอดรับ</b>{" "}
                    <span>{sendData?.received}</span>
                  </div>
                  <div>
                    <b className="font-semibold text-gray-700 "> เงินแถม</b>{" "}
                    <span>{sendData?.free_money}</span>
                  </div>
                  <div>
                    <b className="font-semibold text-gray-700 ">
                      {" "}
                      ยกเว้นค่าดูแลวง
                    </b>{" "}
                    <span>{sendData?.cancel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          {message && <p className="mx-10 text-red-500">{message}</p>}
          <Button
            variant="gradient"
            color="gray"
            onClick={handleOpen}
            size="sm"
            className="mr-1 text-sm "
          >
            <span>ออก</span>
          </Button>
          <Button
            variant="gradient"
            className="text-sm"
            size="sm"
            color="purple"
            onClick={handleUpdate}
          >
            <span>อัพเดท</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default PlaySettingModal;
