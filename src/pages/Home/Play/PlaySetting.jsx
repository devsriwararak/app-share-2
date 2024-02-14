import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { HiOutlinePlay } from "react-icons/hi";
import { Card, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";
import { Authorization } from "../../../auth/Data.js";
import moment from "moment";
import { HiMiniListBullet } from "react-icons/hi2";
import PlaySettingModal from "../../../components/modal/Plays/PlaySettingModal.jsx";
import LoadingComponent from "../../../components/pagination/LoadingComponent.jsx";

const TABLE_HEAD = [
  "ลำดับ",
  "วันที่",
  "ลูกแชร์",
  "งวดที่เปีย",
  "ดอกเบี้ย",
  "ยอดรับ",
  "ยอดส่ง",
  "เงินแถม",
  "เลือก",
];

const PlaySetting = ({ dataToModal }) => {
  const [sumDay, setSumDay] = useState(0);
  const daysArray = Array.from({ length: sumDay }, (_, index) => index + 1);

  const [data, setData] = useState([]);
  const [dataToModalSetting, setDataToModalSetting] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const changeDay = (number) => {
    if (number > dataToModal?.count) {
      setSumDay(number);
    } else {
      toast.error("กรุณาใส่จำนวนวันมากกว่านี้");
    }
  };

  const NewPlay = async () => {
    setLoading(true)
    try {
      const data = {
        home_share_id: localStorage.getItem("home_share_id"),
        wong_share_id: dataToModal?.id,
        count: dataToModal.count,
        // installment : dataToModal.installment,
        // price : dataToModal.price
        
      };
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/play`,
        data,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      if (res.status === 200) {
        setLoading(false)
        toast.success(res.data.message);
        setTimeout(() => {
          fetchDataPlayList();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const fetchDataPlayList = async () => {
    setLoading(true);
    try {
      const home_share_id = localStorage.getItem("home_share_id");
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_API
        }/play/list?home_share_id=${home_share_id}&wong_share_id=${
          dataToModal?.id
        }`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );

      if (res.status === 200) {
        setData(res.data);
        setLoading(false);
        setMessage(null);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessage("กรุณาสร้างการบันทึกใหม่");
    }
  };

  const addNewDay = async () => {
    try {
      const dataSend = {
        play_id: data[0]?.play_id,
        day: sumDay,
        count : dataToModal.count  
      };
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/play/list/new_day`,
        dataSend,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );

      if (res.status === 200) {
        fetchDataPlayList();
        setSumDay(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = (item, index) => {
    handleOpen();
    setDataToModalSetting(item);
    setDataToModalSetting((prev) => ({
      ...prev,
      installment: dataToModal?.installment || 0,
      price: dataToModal?.price || 0,
      count: dataToModal?.count || 0,
      type_wong_id : dataToModal.type_wong_id || 0,
      interest : dataToModal.interest || 0,
      index
    }));
  };

  useEffect(() => {
    fetchDataPlayList();
  }, []);

  return (
    <div>
      <PlaySettingModal
        open={open}
        handleOpen={handleOpen}
        dataToModalSetting={dataToModalSetting}
        fetchDataPlayList={fetchDataPlayList}
      />
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          <h2 className="text-lg text-black font-bold flex gap-2 items-center">
            <HiOutlinePlay
              size={35}
              className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
            />
            รายละเอียด {`(${dataToModal?.name || ""})`}
          </h2>
        </div>

        {/* {JSON.stringify(dataToModal)}  */}

        <div className="flex gap-2 items-center ">
          <p className=" ">เพิ่มระยะเวลา/วัน</p>

          <input
            type="number"
            className="w-14 border-2 border-gray-400 rounded-md text-center"
            value={sumDay}
            onChange={(e) => setSumDay(parseInt(e.target.value))}
          />

          <FcPlus
            onClick={addNewDay}
            className={` cursor-pointer ${data == "" ? "hidden" : "block"}`}
            size={27}
          />
        </div>
      </div>

      {dataToModal?.id && (
        <div>
          {data == "" && (
            <div className="flex items-center gap-4 justify-center my-10">
              <Button className="text-sm text " onClick={NewPlay}>
                เริ่มบันทึกวงแชร์ใหม่
              </Button>
              {message && <p className="text-sm text-red-500">{message}</p>}
            </div>
          )}

          <div className="overflow-scroll h-96 mt-4">
            <table className=" min-w-max  w-full  table-auto text-center ">
              <thead className=" sticky top-0 z-50">
                <tr>
                  {data != "" &&
                    TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                </tr>
              </thead>

              {/* Loading Spinner dataToModal?.id */}
              {/* <LoadingComponent
              loading={loading}
              TABLE_HEAD={TABLE_HEAD.length}
            /> */}

              <LoadingComponent
                loading={loading}
                TABLE_HEAD={TABLE_HEAD.length}
              />

              <tbody>
                {loading === false &&
                  data.map((item, index) => {
                    const isLast = index === daysArray.length - 1;
                    const classes = isLast
                      ? "p-3"
                      : "p-3 border-b border-blue-gray-50 text-[13px] ";

                    return (
                      <tr key={index}>
                        <td className={classes}>{index + 1}</td>
                        <td className={classes}>{item?.start_date_th || " - "}</td>
                        <td className={classes}>
                          <ul className="bg-yellow-700 bg-opacity-30 rounded-md">
                            {item.fname.map((item_2, index) => (
                              <li className=" text-left   px-3  " key={index}>
                                - {item_2.fname}
                              </li>
                            ))}
                          </ul>
                          {item.deducation_name && (
                            <p className="mt-2 bg-blue-100 bg-opacity-80 text-black px-1  rounded-md">
                              {item.deducation_name} {item.deducation_price}
                            </p>
                          )}
                        </td>

                        <td className={classes}>{item?.play_date_th}</td>
                        <td className={classes}>{item?.interest}</td>
                        <td className={classes}><p className="font-semibold text-green-700">{item?.received}</p></td>
                        <td className={classes}><p className="font-semibold text-purple-500">{item?.shipping}</p></td>
                        <td className={classes}>{item?.free_money}</td>
                        <td className={classes}>
                          <div className="flex justify-center hover:bg-gray-200 rounded-lg py-1 px-1">
                            <HiMiniListBullet
                              onClick={() => handleModal(item, index)}
                              className="text-black cursor-pointer"
                              size={20}
                              color="purple"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaySetting;
