import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  HiOutlineHeart,
  HiOutlineScale,
  HiOutlineShare,
  HiOutlineUserAdd,
} from "react-icons/hi";
import Select from "react-select";
import { toast } from "react-toastify";

const TABLE_HEAD = ["ลำดับ", "บ้านแร์", "วงค์แชร์", "สถานะ"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
    status: "รอดำเนินการ",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
    status: "รอดำเนินการ",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
    status: "ปฏิเสธ",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
    status: "เข้าร่วม",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "เข้าร่วม",
  },
];

const AddToWongShare = () => {
  // State
  const [btnDisable, setBtnDisable] = useState(true);
  const [data, setData] = useState([]);
  const [dataAllWongShare, setDataAllWongShare] = useState([]);
  const [dataHomeShare, setDataHomeShare] = useState([]);
  const [dataWongShare, setDataWongShare] = useState([]);
  const [dataForSelect, setDataForSelect] = useState({});

  const handleChange_1 = (e) => {
    const text = e.value;
    if (text === "") {
      setBtnDisable(true);
      alert("111");
    } else {
      setBtnDisable(false);

      fetchDataWongShareForHome(text);

      setDataForSelect((prev) => ({
        ...prev,
        share_name: e.label,
        share_id: e.value,
      }));
    }
  };

  const handleChange_2 = (e) => {
    const text = e.value;
    const newData = dataAllWongShare.find((obj) => obj.id == text);

    setDataForSelect((prev) => ({
      ...prev,
      p_share_name: newData.p_share_name,
      p_share_type: newData.p_share_type,
      p_share_paid: newData.p_share_paid,
      p_share_maintain: newData.p_share_maintain,
      p_share_hand: newData.p_share_hand,
      p_share_req: newData.p_share_req,
      share_v_id: newData.id,
    }));
  };

  const handleAddWong = async () => {
    const data = {
      share_id: dataForSelect.share_id,
      user_id: localStorage.getItem("id"),
      share_v_id: dataForSelect.share_v_id,
    };

    console.log(data);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/sharehouse/userselect`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(res.data);
      if (res.data.error) {
        toast.error("ทำรายการไม่สำเร็จ !");
        setDataForSelect({});
      } else {
        toast.success("ทำรายการสำเร็จ");
        fetchDataMyWongShare();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataHomeShare = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/homesh/home-search?name=`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      // console.log(res.data);
      const addData = res.data.map((item) => ({
        value: item.id,
        label: item.sh_name,
      }));
      setDataHomeShare(addData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataWongShareForHome = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/share/share-search?name=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(res.data);
      setDataAllWongShare(res.data);
      const addData = res.data.map((item) => ({
        value: item.id,
        label: item.p_share_name,
      }));
      setDataWongShare(addData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataMyWongShare = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/sharehouse/search-user?search_term=`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataHomeShare();
    fetchDataMyWongShare();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-2 ">
      <div className="w-full">
        <Card className="ring-1  ring-gray-300 shadow-lg">
          <CardBody>
            <h2 className="text-lg font-bold text-black flex items-center gap-2">
              <HiOutlineUserAdd
                size={35}
                className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
              />
              ขอเข้าวงค์แชร์
            </h2>
            <div className="grid grid-rows-1 md:grid-cols-2 gap-4 mt-5">
              <Select
                options={dataHomeShare}
                placeholder="เลือกบ้านแชร์"
                onChange={(e) => handleChange_1(e)}
              />
              <Select
                isDisabled={btnDisable}
                options={dataWongShare}
                placeholder="เลือกวงค์แชร์"
                onChange={(e) => handleChange_2(e)}
              />
            </div>

            <div className="grid grid-rows-1 md:grid-cols-2 gap-4 mt-8">
              <div>
                <b>ชื่อบ้านแชร์ : </b>{" "}
                <span> {dataForSelect?.share_name || ""} </span>
              </div>
              <div>
                <b>ชื่อวงค์แชร์ : </b>{" "}
                <span> {dataForSelect.p_share_name} </span>
              </div>
            </div>

            <div className="grid grid-rows-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <b>รูปแบบวงค์แชร์ : </b>{" "}
                <span>{dataForSelect.p_share_type}</span>
              </div>
              <div>
                <b>จำนวนเงินต้น : </b> <span>{dataForSelect.p_share_paid}</span>
              </div>
            </div>

            <div className="grid grid-rows-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <b>ค่าดูแลวงค์ : </b>{" "}
                <span>{dataForSelect.p_share_maintain}</span>
              </div>
              <div>
                <b>จำนวนมือ : </b> <span>{dataForSelect.p_share_hand}</span>
              </div>
            </div>

            <div className="mt-4">
              <b>หมายเหตุ : </b> <span>{dataForSelect.p_share_req}</span>
            </div>

            <div className="flex justify-end mt-5 gap-2">
              <Button
                color="purple"
                variant="filled"
                onClick={handleAddWong}
                disabled={!dataForSelect?.p_share_name}
                size="sm"
                className=" text-sm"
              >
                เข้าร่วม
              </Button>
              <Button size="sm" className=" text-sm bg-gray-800">
                ยกเลิก
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="w-full">
        <Card className="  ring-1 ring-gray-300 shadow-lg ">
          <CardBody>
            <div className="flex flex-col md:flex-row justify-between ">
              <h2 className="text-lg font-bold text-black flex items-center gap-2 w-full ">
              <HiOutlineShare
                size={35}
                className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
              />
                วงค์แชร์ของฉัน
              </h2>
              <Input
                label="ค้นหารหัส หรือ วงค์แชร์"
                color="purple"
                className="w-full "
              />
            </div>

            <Card className="overflow-y-scroll md:overflow-hidden ">
              <CardBody>
                <table className="w-full min-w-max table-auto text-center mt1">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-90"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr
                        key={item.id}
                        className="even:bg-blue-gray-50/50 hover:bg-gray-200"
                      >
                        <td className="p-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {index + 1}
                          </Typography>
                        </td>
                        <td className="p-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.sh_name || ""}
                          </Typography>
                        </td>
                        <td className="p-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.p_share_name || ""}
                          </Typography>
                        </td>
                        <td className="p-2">
                          {item.is_apporvee === 0 && (
                            <p className="bg-yellow-300 bg-opacity-70 text-orange-700 rounded-lg">
                              รออนุมัติ
                            </p>
                          )}
                          {item.is_apporvee === 1 && (
                            <p className="bg-green-300 bg-opacity-70 text-green-700 rounded-lg">
                              อนุมัติ
                            </p>
                          )}
                          {item.is_apporvee === 2 && (
                            <p className="bg-red-300 bg-opacity-70 text-red-700 rounded-lg">
                              ปฏิเสธ
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AddToWongShare;
