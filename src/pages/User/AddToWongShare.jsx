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
import { Authorization } from "../../auth/Data";

const TABLE_HEAD = ["ลำดับ", "บ้านแร์", "วงค์แชร์", "สถานะ"];


const AddToWongShare = () => {
  // State
  const [btnDisable, setBtnDisable] = useState(true);
  const [data, setData] = useState([]);
  const [dataAllWongShare, setDataAllWongShare] = useState([]);
  const [dataHomeShare, setDataHomeShare] = useState([]);
  const [dataWongShare, setDataWongShare] = useState([]);
  const [dataForSelect, setDataForSelect] = useState({});
  const user_id = localStorage.getItem("id")
  const [search, setSearch] = useState("")

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
        home_name: e.label,
        home_id: e.value,
      }));
    }
  };

  const handleChange_2 = (e) => {
    const text = e.value;
    const newData = dataAllWongShare.find((obj) => obj.id == text);

    setDataForSelect((prev) => ({
      ...prev,
      wong_name: newData.name,
      type_wong_name: newData.type_wong_name,
      price: newData.price,
      pay_for_wong: newData.pay_for_wong,
      count: newData.count,
      note: newData.note,
      wong_id: newData.id,
    }));
  };

  const handleAddWong = async () => {
    const data = {
      home_id: dataForSelect.home_id,
      user_id: user_id,
      wong_id: dataForSelect.wong_id,
      status: 0,
    };

    console.log(data);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/users/wong_share`,
        data,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );

      if (res.status === 200) {
        toast.success("ทำรายการสำเร็จ");
        fetchDataMyWongShare();
        setBtnDisable(true)
      } else {
        toast.error("ทำรายการไม่สำเร็จ !");
      }
    } catch (error) {
      console.log(error);
      toast.error("ทำรายการไม่สำเร็จ !");
    }
  };

  const fetchDataHomeShare = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/home_share`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      // console.log(res.data);
      const addData = res.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setDataHomeShare(addData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataWongShareForHome = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/wong_share/home/${id}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      console.log(res.data);
      setDataAllWongShare(res.data);
      const addData = res.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setDataWongShare(addData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataMyWongShare = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/users/wong_share/${user_id}?search=${search}`,
        {
          headers: {
            Authorization: Authorization
          },
        }
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataHomeShare();
    fetchDataMyWongShare();
  }, [search]);

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
            {/* <p className="text-black bg-red-500"> ss : {JSON.stringify(dataHomeShare)}</p>
            <p className="text-black bg-green-500"> ss : {JSON.stringify(dataAllWongShare)}</p> */}

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
                <b>ชื่อบ้านแชร์ : </b> <p> {dataForSelect?.home_name || ""} </p>
              </div>
              <div>
                <b>ชื่อวงค์แชร์ : </b> <p> {dataForSelect.wong_name} </p>
              </div>
            </div>

            <div className="grid grid-rows-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <b>รูปแบบวงค์แชร์ : </b> <p>{dataForSelect.type_wong_name}</p>
              </div>
              <div>
                <b>จำนวนเงินต้น : </b> <p>{dataForSelect.price}</p>
              </div>
            </div>

            <div className="grid grid-rows-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <b>ค่าดูแลวงค์ : </b> <p>{dataForSelect.pay_for_wong}</p>
              </div>
              <div>
                <b>จำนวนมือ : </b> <p>{dataForSelect.count}</p>
              </div>
            </div>

            <div className="mt-4">
              <b>หมายเหตุ : </b> <p>{dataForSelect.note}</p>
            </div>

            <div className="flex justify-end mt-5 gap-2">
              <Button
                color="purple"
                variant="filled"
                onClick={handleAddWong}
                disabled={!dataForSelect?.wong_name}
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
                label="ค้นหาวงค์แชร์"
                color="purple"
                className="w-full "
                onChange={(e)=>setSearch(e.target.value)}
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
                            {item.home_share_name || ""}
                          </Typography>
                        </td>
                        <td className="p-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.wong_share_name || ""}
                          </Typography>
                        </td>
                        <td className="p-2">
                          {item.status === 0 && (
                            <p className="bg-yellow-300 bg-opacity-70 text-orange-700 rounded-lg">
                              รออนุมัติ
                            </p>
                          )}
                          {item.status === 1 && (
                            <p className="bg-green-300 bg-opacity-70 text-green-700 rounded-lg">
                              อนุมัติ
                            </p>
                          )}
                          {item.status === 2 && (
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
