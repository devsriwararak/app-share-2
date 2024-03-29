import React, { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";

import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Input,
  Spinner,
} from "@material-tailwind/react";
import {
  HiOutlineChatAlt2,
  HiPencilAlt,
  HiTrash,
  HiOutlineDesktopComputer,
  HiOutlinePlusSm,
} from "react-icons/hi";
import WongShareModal from "../../components/modal/Basic/WongShareModal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ViewWongShare from "../../components/modal/Basic/ViewWongShare";
import axios from "axios";

import Pagination from "../../components/pagination/Pagination";
import {
  calculatePageIndices,
  calculatePagination,
} from "../../components/pagination/PaginationUtils";
import MyWongShare from "../../components/modal/HomeShare/MyWongShare";
import { Authorization } from "../../auth/Data";
import LoadingComponent from "../../components/pagination/LoadingComponent";

const TABLE_HEAD = [
  "ลำดับ",
  "ชื่อวงแชร์",
  "รูปแบบ",
  "จำนวนมือ",
  "้เงินต้น",
  "แก้ไข/ลบ",
];

const HomeWongShare = () => {
  const [id, setId] = useState(null);

  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const handleOpen = (number) => (setOpen(!open), setId(number));
  const handleOpenView = (number) => (setOpenView(!openView), setId(number));

  // State
  const [data, setData] = useState([]);
  const [dataToModal, setDataToModal] = useState({});
  const home_share_id = localStorage.getItem("home_share_id");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);



  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_API
        }/wong_share/home/${home_share_id}?search=${search}`,
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
      toast.success("ลบข้อมูลสำเร็จ");
      fetchData();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (item) => {
    handleOpen(1);
    console.log(item);
    setDataToModal(item);
  };

  const handleViewModal = (item) => {
    handleOpenView(3);
    setDataToModal(item);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="">
      <MyWongShare
        handleOpen={handleOpen}
        open={open}
        id={id}
        fetchNewDat={fetchData}
        dataToModal={dataToModal}
      />
      {/* <WongShareModal handleOpen={handleOpen} open={open} id={id} /> */}
      {/* <ViewWongShare handleOpen={handleOpenView} open={openView} id={id} /> */}
      <ViewWongShare
        handleOpen={handleOpenView}
        open={openView}
        id={id}
        dataToModal={dataToModal}
      />

      <div className="flex flex-col md:flex-row   items-center  md:justify-between gap-4">
        <div className="flex gap-2 items-center">
          <HiOutlineChatAlt2
            size={35}
            className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
          />
          <span className="text-lg text-black font-bold">
            {" "}
            จัดการข้อมูลวงค์แชร์
          </span>
        </div>

        <div className="flex gap-2 flex-col items-center   md:flex-row">
          <div className="w-72 bg-slate-50 rounded-md  bg-gray-50  ">
            <Input
              variant="outlined"
              label="ค้นหาวงค์แชร์"
              color="purple"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="">
            <Button
              onClick={() => handleOpen(null)}
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

      <Card className=" h-full w-full mx-auto   md:w-full  mt-5 shadow-lg ">
        <CardBody className="  px-2 overflow-y-scroll -mt-4">
          <table className=" w-full  min-w-max table-auto text-center">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
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
              {loading === false && data.map((item, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-2"
                  : "p-2 border-b border-blue-gray-50 ";

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
                          color="purple"
                          className="cursor-pointer  "
                          onClick={() => handleViewModal(item)}
                        />
                        <HiPencilAlt
                          size={20}
                          color="purple"
                          className="cursor-pointer  "
                          onClick={() => handleChange(item)}
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
                );
              })}
            </tbody>
          </table>
        </CardBody>

      </Card>
    </div>
  );
};

export default HomeWongShare;
