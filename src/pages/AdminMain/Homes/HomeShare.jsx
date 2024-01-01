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
import { Authorization } from "../../../auth/Data.js";
import classNames from "classnames";

const HomeShare = () => {
  const TABLE_HEAD = ["ลำดับ", "รหัส", "ชื่อ", "username", "แก้ไข/ลบ"];

  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");

  // State
  const [dataHome, setDataHome] = useState([]);
  const [dataMember, setDataMember] = useState([]);
  const [dataToModal, setDataToModal] = useState({});
  const [dataToModalMember, setDataToModalMember] = useState({});
  const [indexStatus, setIndexStatus] = useState(null);

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
        `${import.meta.env.VITE_APP_API}/home_account?search=${search1}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      // console.log(res);
      setDataHome(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMemberByHomeShareId = async (home_share_id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/member/${home_share_id}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      // console.log(res.data);
      setDataMember(res.data);
    } catch (error) {
      console.log(error);
    }
  };



  const handleDelete = (id, home_share_id) => {
    Swal.fire({
      title: `ต้องการลบ ID : ${id} `,
      text: "คุณต้องการที่จะลบข้อมูลนี้ จริงหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRow(id, home_share_id);
      }
    });
  };

  const deleteRow = async (id, home_share_id) => {
    try {

      const res = await axios.delete(
        `${import.meta.env.VITE_APP_API}/home_account/${id}/${home_share_id}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        toast.success(res.data.message);
        fetchDataHome();
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMember = (id, home_share_id) => {
    Swal.fire({
      title: `ต้องการลบ ID : ${id} `,
      text: "คุณต้องการที่จะลบข้อมูลนี้ จริงหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMember(id, home_share_id);
      }
    });
  };

  const deleteMember = async (id, home_share_id) => {
    try {
  
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_API}/member/${id}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        toast.success(res.data.message);

        fetchMemberByHomeShareId(home_share_id)
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const handleDataToModal = (item, number) => {
    setDataToModal(item);
    setDataToModalMember({...item, home_share_name :  dataToModalMember?.home_share_name })
    number === 1 ? handleOpen1() : handleOpen2();
  };

  const handleSelectHome = (home_share_id, home_share_name, index) => {
    if (home_share_id) {
      setDataToModalMember((prev) => ({
        ...prev,
        home_share_name,
        home_share_id,
      }));
      fetchMemberByHomeShareId(home_share_id);
      setIndexStatus(index);
    }
  };

  useEffect(() => {
    fetchDataHome();
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
        fetchMemberByHomeShareId={fetchMemberByHomeShareId}
        dataToModal={dataToModalMember}
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

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 ">
        <div className="w-full">
          <Card className="mt-6 shadow-lg border border-gray-200 ">
            <CardBody>
              <div className="flex flex-col lg:flex-row md:justify-between gap-2 items-center">
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
                        className={classNames(
                          indexStatus === index && "bg-gray-200",
                          "hover:bg-gray-200 cursor-pointer"
                        )}
                        onClick={() =>
                          handleSelectHome(
                            item.home_share_id,
                            item.home_share_names,
                            index
                          )
                        }
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
                            {item?.fname || ""}
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
                              onClick={() =>
                                handleDelete(item.id, item.home_share_id)
                              }
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
          <div className="flex justify-between">
            <h2 className="text-lg text-black ml-4">
              ข้อมูลพนักงาน : {dataToModalMember?.home_share_name}
            </h2>
            <Button
              color="purple"
              size="sm"
              className="text-sm rounded-full"
              onClick={handleOpen2}
              disabled={!dataToModalMember?.home_share_name}
            >
              เพิ่มพนักงานใหม่
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 mt-4">
            {dataMember?.map((item, index) => (
              <Card key={item.id}>
                <CardBody>
                  <p>รหัส : {item?.code}</p>
                  <p>
                    ชื่อ-สกุล : {item?.fname} {item?.lname}
                  </p>
                  <p>โทรศีพท์ : {item?.tell} </p>
                  <div className="flex flex-row justify-end gap-1">
                    <HiPencilAlt
                      className="bg-yellow-700 hover:bg-yellow-800 cursor-pointer px-1 rounded-lg text-black"
                      size={25}
                      onClick={() => handleDataToModal(item, 2)}

                    />
                    <HiTrash
                      size={25}
                      className="bg-red-700 hover:bg-red-800 cursor-pointer px-1 rounded-lg text-white"
                      onClick={()=>handleDeleteMember(item.id, item.home_share_id)}
                    />
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeShare;
