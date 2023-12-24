import React, { useEffect, useState } from "react";

import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Input,
  CardHeader,
} from "@material-tailwind/react";
import {
  HiPencilAlt,
  HiTrash,
  HiOutlineShoppingCart,
  HiOutlinePlusSm,
} from "react-icons/hi";
import AddUser from "../../../components/modal/User/AddUser";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

import {
  calculatePageIndices,
  calculatePagination,
} from "../../../components/pagination/PaginationUtils";
import Pagination from "../../../components/pagination/Pagination";
import UserData from "./UserData";

const TABLE_HEAD = [
  "ลำดับ",
  "รหัส",
  "ชื่อ-สกุล",
  "เบอร์โทร",
  "Username",
  "แก้ไข/ลบ",
];

const User = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // State
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [dataToModal, setDataToModal] = useState({});

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
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
        `${import.meta.env.VITE_APP_API}/u-search?name=${search}`
      );
      console.log(res.data);
      setData(res.data);
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
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDataToModal = (item) => {
    console.log(item);
    setDataToModal(item);
    handleOpen();
  };

  const handelSendToUserData = (item)=>{
    setDataToModal(item);
  }

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="">
      {/* <AdminModal handleOpen={handleOpen} open={open} /> */}

      <AddUser
        handleOpen={handleOpen}
        open={open}
        fetchData={fetchData}
        dataToModal={dataToModal}
      />

      <div className="flex flex-col md:flex-row    items-center justify-between gap-4">
        <div className="flex items-center gap-2">
     
          <HiOutlineShoppingCart
            size={35}
            className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
          />
          <span className="text-lg text-black font-bold">
            จัดการข้อมูลลูกแชร์
          </span>
        </div>

        <div className="flex gap-2 flex-col items-center   md:flex-row">
          <div className="w-full bg-slate-50 rounded-md bg-gray-50  "></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-2">
        <Card className="w-full md:w-1/4">
          <CardBody>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="w-2/5">
                <b>จำนวน (20)</b>
              </p>
              <Button
                variant="outlined"
                className="w-3/5 flex items-center gap-2 text-sm "
                size="sm"
                color="purple"
                onClick={() => (handleOpen(), setDataToModal({}))}
              >
                <HiOutlinePlusSm size={20} />
                เพิ่มลูกค้าใหม่
              </Button>
            </div>

            <div className="mt-3">
              <Input
                variant="outlined"
                label="ค้นหาชื่อ / รหัส"
                onChange={(e) => (setSearch(e.target.value), setCurrentPage(1))}
              />
            </div>

            <ul className="mt-4 overflow-y-scroll">
              {data.map((item, index) => (
                <li key={item.id} className="flex  justify-between hover:bg-gray-200 py-1.5 px-2 cursor-pointer">
                  <p onClick={()=>handelSendToUserData(item)}>{`${item.code} (${item.f_name})`}</p>

                  <div className="flex flex-row gap-2">
                    <HiPencilAlt
                      size={20}
                      color="black"
                      className="cursor-pointer  "
                      onClick={() => handleDataToModal(item)}
                    />
                    <HiTrash
                      size={20}
                      color="red"
                      className="cursor-pointer  "
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <div className="w-full md:w-3/4 flex flex-col md:flex-row gap-2">
          <UserData  dataToModal={dataToModal}/>
        </div>
      </div>


    </div>
  );
};

export default User;
