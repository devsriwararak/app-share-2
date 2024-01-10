import React, { useEffect, useState } from "react";

import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
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
import {
  HiOutlineHome,
  HiOutlinePlusCircle,
  HiTrash,
  HiPencilAlt,
  HiOutlinePlusSm,
} from "react-icons/hi";
import HomeShareModal from "../../../components/modal/Basic/HomeShareModal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import Pagination from "../../../components/pagination/Pagination";
import {
  calculatePageIndices,
  calculatePagination,
} from "../../../components/pagination/PaginationUtils";
import { Authorization, checkNoToken } from "../../../auth/Data";

const TABLE_HEAD = [
  "ลำดับ",
  "รหัสบ้านแชร์",
  "ชื่อบ้านแชร์",
  "สถานะ",
  "แก้ไข/ลบ",
];

const BasicHome = () => {
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (number) => (setOpen(!open), setId(number));

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [dataToModal, setDataTomodal] = useState({});
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const getPaginatedData = () => {
    return calculatePagination(currentPage, itemsPerPage, data);
  };
  const { firstIndex, lastIndex } = calculatePageIndices(
    currentPage,
    itemsPerPage
  );

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/home_share?search=${search}`,
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
      checkNoToken(error.response.data.message)
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
        deleteData(id);
      }
    });
  };

  const deleteData = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_API}/home_share/${id}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error("ลบข้อมูลสำเร็จ");
    }
  };

  const handleOpenEdit = (id, item) => {
    handleOpen(id);
    setDataTomodal(item);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="">
      <HomeShareModal
        handleOpen={handleOpen}
        open={open}
        id={id}
        fetchData={fetchData}
        dataToModal={dataToModal}
      />

      <div className="flex flex-col md:flex-row   items-center  md:justify-between gap-4">
        <div className="flex gap-2 items-center">
          <HiOutlineHome
            size={35}
            className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
          />
          <span className="text-xl text-black font-bold">
            จัดการข้อมูลบ้านแชร์
          </span>
        </div>

        <div className="flex gap-2 flex-col items-center   md:flex-row">
          <div className="w-72 bg-slate-50 rounded-md bg-gray-50   ">
            <Input
              variant="outlined"
              label="ค้นหาบ้านแชร์"
              color="purple"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="">
            <Button
              onClick={() => (handleOpen(null), setDataTomodal({}))}
              variant="filled"
              color="purple"
              size="sm"
              className="text-sm  flex items-center gap-1  "
            >
              <HiOutlinePlusSm size={20} />
              สร้างบ้านแชร์
            </Button>
          </div>
        </div>
      </div>

      <Card className=" h-full w-full m-4 mx-auto shadow-lg   md:w-full  mt-5 ">
        <CardBody className="  px-2 -mt-4 overflow-scroll">
          
          <div className="flex justify-center">
            {loading === true && (
              <Spinner className="h-8 w-8 text-gray-900/50 " />
            )}
          </div>

          <table className=" w-full  min-w-max table-auto text-center  ">
            <thead className="  ">
              <tr>
                {loading === false &&
                  TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y  border-blue-gray-100  bg-blue-gray-50 p-4"
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
              {getPaginatedData().map((item, index) => {
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
                        {firstIndex + index}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.code}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.name}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        ออนไลน์
                      </Typography>
                    </td>

                    <td className={classes}>
                      <div className="flex justify-center  gap-2 ">
                        <HiPencilAlt
                          size={20}
                          color="black"
                          className=" cursor-pointer"
                          onClick={() => handleOpenEdit(item.id, item)}
                        />

                        <HiTrash
                          size={20}
                          color="red"
                          className=" cursor-pointer"
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
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 ">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
            paginate={paginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default BasicHome;
