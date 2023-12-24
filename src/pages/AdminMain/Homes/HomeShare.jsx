import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  IconButton,
} from "@material-tailwind/react";
import Select from "react-select";
import HomeAdminModal from "../../../components/modal/HomeShare/HomeAdminModal";
import HomeMemberModal from "../../../components/modal/HomeShare/HomeMemberModal";
import { HiDatabase, HiPencilAlt, HiTrash } from "react-icons/hi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

const HomeShare = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const TABLE_HEAD = ["ลำดับ", "รหัส", "ชื่อ", "username", "แก้ไข/ลบ"];

  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");

  // State
  const [dataHome, setDataHome] = useState([]);
  const [dataMember, setDataMember] = useState([]);
  const [dataToModal, setDataToModal] = useState({});

  // Footer Table 1
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataHome.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataHome.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Modal
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleOpen1 = () => setOpen1(!open1);
  const handleOpen2 = () => setOpen2(!open2);

  // Fetch data home
  const fetchDataHome = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/h-search?name=${search1}`
      );
      // console.log(res.data);
      setDataHome(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Data Member
  const fetchDataMember = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/m-search?name=${search2}`
      );
      setDataMember(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
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
        deleteRow(id);
      }
    });
  };

  const deleteRow = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_API}/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      toast.success("ลบข้อมูลสำเร็จ");
      fetchDataHome();
      fetchDataMember();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDataToModal = (item, number) => {
    console.log(item);
    setDataToModal(item);
    number === 1 ? handleOpen1() : handleOpen2();
  };

  useEffect(() => {
    fetchDataHome();
    fetchDataMember();
  }, [search1, search2]);

  return (
    <>
      <HomeAdminModal
        handleOpen={handleOpen1}
        open={open1}
        fetchDataHome={fetchDataHome}
        dataToModal={dataToModal}
      />
      <HomeMemberModal
        handleOpen={handleOpen2}
        open={open2}
        fetchDataMember={fetchDataMember}
        dataToModal={dataToModal}
      />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 flex gap-2 items-center
        "
        >
          <HiDatabase
            size={35}
            className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
          />
          ข้อมูลบ้านแชร์และพนักงาน (ทั้งหมด)
        </Typography>
        {/* <div className="w-full md:w-4/12">
          <Select options={options} placeholder="เลือกบ้านแชร์" />
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 ">
        <div className="w-full">
          <Card className="mt-6 shadow-lg border border-gray-200 ">
            <CardBody>
              <div className="flex flex-col md:flex-row md:justify-between gap-2 items-center">
                <div className="  ">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="mb-2  font-bold"
                  >
                    เจ้าของบ้านแชร์
                  </Typography>
                </div>
                <div className="   ">
                  <Input
                    label="ค้นหาเจ้าของบ้านแชร์"
                    onChange={(e) => setSearch1(e.target.value)}
                  />
                </div>
                <div className="   flex justify-end">
                  <Button
                    onClick={() => (handleOpen1(), setDataToModal({}))}
                    className="text-sm"
                    size="sm"
                    color="purple"
                  >
                    เพิ่มเจ้าของบ้าน
                  </Button>
                </div>
              </div>

              <Card className="h-full w-full mt-6 overflow-scroll ">
                <table className="w-full min-w-max table-auto  text-center">
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
                    {dataHome.map((item, index) => (
                      <tr
                        key={index}
                        className="even:bg-blue-gray-50/50 hover:bg-gray-200 "
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
                            {item?.code || ""}
                          </Typography>
                        </td>
                        <td className="p-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.f_name || ""}
                          </Typography>
                        </td>

                        <td className="p-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.username || ""}
                          </Typography>
                        </td>

                        <td className="p-3">
                          <div className="flex  gap-1 ">
                            <HiPencilAlt
                              size={20}
                              color="black"
                              className="cursor-pointer "
                              onClick={() => handleDataToModal(item, 1)}
                            />
                            <HiTrash
                              size={20}
                              color="red"
                              className="cursor-pointer "
                              onClick={() => handleDelete(item.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </CardBody>
            {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">

            </CardFooter> */}
          </Card>
        </div>
        <div className="w-full">
          <Card className="mt-6 shadow-lg border border-gray-200  ">
            <CardBody>
              <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="mb-2  font-bold"
                >
                  พนักงานบ้านแชร์
                </Typography>
                <div className="flex-1">
                  <Input
                    label="ค้นหาเจ้าของบ้านแชร์"
                    onChange={(e) => setSearch2(e.target.value)}
                  />
                </div>
                <div className="">
                  <Button
                    onClick={() => (handleOpen2(), setDataToModal({}))}
                    className="text-sm"
                    size="sm"
                    color="purple"
                  >
                    เพิ่มพนักงาน
                  </Button>
                </div>
              </div>

              <Card className="h-full w-full mt-6 overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
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
                    {dataMember.map((item, index) => (
                      <tr
                        key={index}
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
                            {item?.code}
                          </Typography>
                        </td>
                        <td className="p-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.f_name}
                          </Typography>
                        </td>

                        <td className="p-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.username}
                          </Typography>
                        </td>

                        <td className="p-3">
                          <div className="flex  gap-2 ">
                            <HiPencilAlt
                              size={20}
                              color="black"
                              className="cursor-pointer  "
                              onClick={() => handleDataToModal(item, 2)}
                            />
                            <HiTrash
                              size={20}
                              color="red"
                              className="cursor-pointer  "
                              onClick={() => handleDelete(item.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </CardBody>
            {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"></CardFooter> */}
          </Card>
        </div>
      </div>
    </>
  );
};

export default HomeShare;
