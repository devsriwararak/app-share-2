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
  Spinner,
} from "@material-tailwind/react";
// import HomeShareModal from "../../../components/modal/HomeShareModal";
import {
  HiOutlineHome,
  HiOutlineChatAlt2,
  HiOutlinePlusCircle,
  HiPencilAlt,
  HiTrash,
  HiOutlineDesktopComputer,
  HiOutlinePlusSm,
} from "react-icons/hi";
import WongShareModal from "../../../components/modal/Basic/WongShareModal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ViewWongShare from "../../../components/modal/Basic/ViewWongShare";
import axios from "axios";
import {
  calculatePageIndices,
  calculatePagination,
} from "../../../components/pagination/PaginationUtils";
import Pagination from "../../../components/pagination/Pagination";
import { Authorization, checkNoToken } from "../../../auth/Data";
import LoadingComponent from "../../../components/pagination/LoadingComponent";

const TABLE_HEAD = [
  "ลำดับ",
  "รหัสวงแชร์",
  "ชื่อวงแชร์",
  "รูปแบบวงแชร์",
  "จำนวนมือ",
  "เงินต้น",
  "แก้ไข/ลบ",
];

const BasicWong = () => {
  const [id, setId] = useState(null);

  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const handleOpen = (number) => (setOpen(!open), setId(number));
  const handleOpenView = (number) => (setOpenView(!openView), setId(number));

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [dataToModal, setDataToModal] = useState({});
  const [loading, setLoading] = useState(true);

  // Pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 3;
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const getPaginatedData = () => {
  //   return calculatePagination(currentPage, itemsPerPage, data);
  // };
  // const { firstIndex, lastIndex } = calculatePageIndices(
  //   currentPage,
  //   itemsPerPage
  // );

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/wong_share?search=${search}`,
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
        deleteRow(id);
      }
    });
  };

  const deleteRow = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_API}/wong_share/${id}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      console.log(res.data);
      toast.success("ลบข้อมูลสำเร็จ");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectToModal = (item) => {
    handleOpen(1);
    if (item.id) {
      setDataToModal(item);
    }
  };

  const handleViewModal = (item) => {
    handleOpenView(3);
    setDataToModal(item);
  };

  useEffect(() => {
    fetchData();
  },[search]);

  return (
    <div className="">
      <WongShareModal
        handleOpen={handleOpen}
        open={open}
        id={id}
        fetchData={fetchData}
        dataToModal={dataToModal}
      />
      <ViewWongShare
        handleOpen={handleOpenView}
        open={openView}
        dataToModal={dataToModal}
      />

      <div className="flex flex-col md:flex-row   items-center  md:justify-between gap-4">
        <div className="flex gap-2 items-center">
          <HiOutlineChatAlt2
            size={35}
            className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
          />
          <span className="text-xl text-black font-bold">
            {" "}
            จัดการข้อมูลวงค์แชร์
          </span>
        </div>

        <div className="flex gap-2 flex-col items-center   md:flex-row">
          <div className="w-72 bg-slate-50 rounded-md  bg-gray-50  ">
            <Input
              variant="outlined"
              label="ค้นหาวงค์แชร์"
              // onChange={(e) => (setCurrentPage(1), setSearch(e.target.value))}
              onChange={(e) => ( setSearch(e.target.value))}
            />
          </div>
          <div className="">
            <Button
              onClick={() => (handleOpen(null), setDataToModal(null))}
              variant="filled"
              color="purple"
              size="sm"
              className="text-sm  flex items-center gap-1 "
            >
              <HiOutlinePlusSm size={20} />
              สร้างวงค์แชร์
            </Button>
          </div>
        </div>
      </div>

      <Card className=" h-full md:h-full  w-full mx-auto   md:w-full  mt-5 shadow-lg ">
        <CardBody className="  px-2 overflow-scroll -mt-4">
  

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
                  <tr key={item.id} className="hover:bg-gray-200">
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
                        {item.code}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.name}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.type_wong_name}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.count}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.price}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <div className="flex justify-center  gap-2 ">
                        <HiOutlineDesktopComputer
                          size={20}
                          color="black"
                          className=" cursor-pointer"
                          onClick={() => handleViewModal(item)}
                        />
                        <HiPencilAlt
                          className=" cursor-pointer"
                          size={20}
                          color="black"
                          onClick={() => handleSelectToModal(item)}
                        />
                        <HiTrash
                          className=" cursor-pointer"
                          size={20}
                          color="red"
                          onClick={() => handleDelete(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        {/* <CardFooter className="flex items-center justify-start ">
   
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default BasicWong;
