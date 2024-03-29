import React, { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";

import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { HiOutlineUserAdd, HiPencilAlt, HiTrash } from "react-icons/hi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import {
  calculatePageIndices,
  calculatePagination,
} from "../../components/pagination/PaginationUtils";
import Pagination from "../../components/pagination/Pagination";
import { Authorization, checkNoToken } from "../../auth/Data.js";
import LoadingComponent from "../../components/pagination/LoadingComponent.jsx";

const TABLE_HEAD = [
  "ลำดับ",
  "รหัส",
  "ชือ-สกุล",
  "เบอร์โทร",
  "Username",
  "แก้ไข",
];

const CrudAdmin = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [data, setData] = useState([]);
  const [dataToModal, setDataToModal] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/admin?search=${search}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      checkNoToken(error.response.data.message);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: `ต้องการลบ ID : ${id}`,
      text: "คุณต้องการที่จะลบข้อมูลนี้ จริงหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("ลบข้อมูลสำเร็จ");
      }
    });
  };

  const handleOpenEdit = (item) => {
    setDataToModal(item);
    handleOpen();
    console.log(item);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="">
      <ModalAdmin
        handleOpen={handleOpen}
        open={open}
        dataToModal={dataToModal}
        fetchData={fetchData}
      />

      <div className="flex flex-col md:flex-row    items-center justify-between gap-4">
        <div className="flex gap-2 items-center">
          <HiOutlineUserAdd
            size={35}
            className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
          />
          <span className="text-lg text-black font-bold">
            จัดการข้อมูล ADMIN
          </span>
        </div>

        <div className="flex gap-2 flex-col items-center   md:flex-row">
          <div className="w-72 bg-slate-50 rounded-md bg-gray-50  ">
            <Input
              variant="outlined"
              label="ค้นหาชื่อ / รหัส"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card className=" h-full w-full mx-auto   md:w-full  mt-5 shadow-lg ">
        <CardBody className="  px-2 overflow-y-scroll -mt-4">
     

          <table className=" w-full  min-w-max table-auto text-center">
            <thead>
              <tr>
                {
                  TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50 p-4"
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

            {/* Loading Spinner */}
            <LoadingComponent
              loading={loading}
              TABLE_HEAD={TABLE_HEAD.length}
            />

            <tbody>
              {data.map((item, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-2"
                  : "p-2 border-b border-blue-gray-50";

                return (
                  <tr key={index} className="hover:bg-gray-200">
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.code || ""}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.fname || ""} {item.lname || ""}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.tell || ""}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.username || ""}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <div className="flex justify-center  gap-2">
                        <HiPencilAlt
                          size={20}
                          onClick={() => handleOpenEdit(item)}
                          color="black"
                          className=" cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
     
      </Card>
    </div>
  );
};

export default CrudAdmin;

const ModalAdmin = ({ handleOpen, open, dataToModal, fetchData }) => {
  const [sendData, setSendData] = useState({});
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setSendData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    const data = {
      id: dataToModal.id || "",
      username: sendData.username || "",
      password: sendData.password || "",
      fname: sendData.fname || "",
      lname: sendData.lname || "",
      tell: sendData.tell,
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/admin`,
        data,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );

      toast.success("บันทึกสำเร็จ");
      fetchData();
      handleOpen();
      setMessage("");

    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message)
      setTimeout(() => {
        setMessage(null)
      }, 3000);
    }
  };

  useEffect(() => {
    setSendData((prev) => ({
      ...prev,
      id: dataToModal?.id || "",
      code: dataToModal?.code || "",
      username: dataToModal?.username || "",
      password: dataToModal?.password || "",
      fname: dataToModal?.fname || "",
      lname: dataToModal?.lname || "",
      tell: dataToModal?.tell || "",
    }));
  }, [dataToModal]);

  return (
    <Dialog open={open} size="sm" handler={handleOpen}>
      <DialogHeader className="bg-gray-200 rounded-lg text-lg">
        แก้ไขผู้ดูแลระบบ : {dataToModal?.code}{" "}
      </DialogHeader>
      <DialogBody>
        {/* {JSON.stringify(sendData)} */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <Input label="รหัส" value={sendData?.code} disabled />
          </div>
          <div className="w-full">
            <Input
              name="tell"
              label="เบอร์โทรท์"
              onChange={(e) => handleChange(e)}
              color="purple"
              value={sendData?.tell || ""}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
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

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="w-full">
            <Input
              name="username"
              label="username"
              color="purple"
              value={sendData?.username || ""}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="w-full">
            <Input
              name="password"
              type="password"
              label="password"
              color="purple"
              value={sendData?.password || ""}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <h4 className="text-base mx-4 text-red-500">{message}</h4>

        <Button
          variant="filled"
          color="red"
          onClick={handleOpen}
          className="mr-1 text-sm"
          size="sm"
        >
          <span>ยกเลิก</span>
        </Button>
        <Button
          variant="gradient"
          color="purple"
          className="text-sm"
          size="sm"
          onClick={handleUpdate}
        >
          <span>อัพเดท</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
