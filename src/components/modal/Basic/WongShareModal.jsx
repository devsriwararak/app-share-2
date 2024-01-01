import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import {
  HiOutlineHome,
  HiOutlineChatAlt2,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import Select from "react-select";
import { options2 } from "../../data/TypePlay";
import { toast } from "react-toastify";
import axios from "axios";
import { Authorization } from "../../../auth/Data";

const WongShareModal = ({ open, handleOpen, id, fetchData, dataToModal }) => {
  const [typePlayCheck, setTypePlayCheck] = useState(1);

  const [sendData, setSendData] = useState({});
  const [dataHome, setDataHome] = useState([]);
  const [dataTypeWong, setDataTypeWong] = useState([]);

  const fetchHomeShare = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/home_share`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );

      const rename = res.data.map((item, index) => ({
        value: item.id,
        label: item.name,
      }));
      setDataHome(rename);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTypeWong = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}/type_wong`, {
        headers: {
          Authorization: Authorization,
        },
      });

      const rename = res.data.map((item, index) => ({
        value: item.id,
        label: item.name,
      }));
      setDataTypeWong(rename);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, handleChange) => {
    setSendData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSendAPI = {
      home_share_id: sendData.home_share_id || "",
      type_wong_id: sendData.type_wong_id || "",
      name: sendData.name || "",
      interest: sendData.interest || "",
      installment: sendData.installment || "",
      price: sendData.price || "",
      pay_for_wong: sendData.pay_for_wong || "",
      count: sendData.count || "",
      note: sendData.note || "",
    };

    console.log(dataToSendAPI);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/wong_share`,
        dataToSendAPI,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        setSendData({});
        fetchData();
        handleOpen();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = async () => {


    const sendDataToApi = {
      id: sendData.id,
      home_share_id: sendData.home_share_id || "",
      type_wong_id: sendData.type_wong_id || "",
      name: sendData.name || "",
      interest: sendData.interest || "",
      installment: sendData.installment || "",
      price: sendData.price || "",
      pay_for_wong: sendData.pay_for_wong || "",
      count: sendData.count || "",
      note: sendData.note || "",
    };

    console.log(sendDataToApi);

    
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/wong_share`, sendDataToApi , {
          headers:{
            Authorization : Authorization
          }
        }
        
      );
      console.log(res.data);
      toast.success("บันทึกสำเร็จ");
      fetchData();
      handleOpen();
      setSendData({});
    } catch (error) {
      console.log(error);
    }
  };

  const addDataToEdit = () => {
    setSendData(
      (prev) => (
        {
          ...prev,
        },
        dataToModal
      )
    );
  };

  useEffect(() => {
    fetchHomeShare();
    fetchTypeWong();
    addDataToEdit();
    // console.log(dataToModal);
  }, [dataToModal]);

  return (
    <Dialog open={open} size="lg" handler={handleOpen}>
      <DialogHeader className="bg-gray-200 flex gap-2 rounded-lg text-lg">
        <HiOutlineChatAlt2 /> {id ? "แก้ไขวงแชร์" : "สร้างวงแชร์"}
      </DialogHeader>
      <DialogBody className=" py-10 h-96 overflow-scroll md:h-full md:overflow-auto ">

      {/* SEND {JSON.stringify(sendData)}<br />
        DATA{JSON.stringify(dataToModal)}  */}

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Select
            isDisabled={sendData?.id}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                background:'#F7F9D7'
              }),
            }}
              options={dataHome}
              className="w-full"
              placeholder="เลือกบ้านแชร์"
              
              defaultValue={
                dataToModal?.id
                  ? dataHome.find(
                      (option) => option.value == dataToModal?.home_share_id
                    )
                  : ""
              }
              onChange={(e) =>
                setSendData((prev) => ({
                  ...prev,
                  home_share_id: e.value,
                }))
              }
            />
            <Input
              color="purple"
              label="ชื่อวงค์แชร์"
              required
              name="name"
              onChange={(e) => handleChange(e)}
              value={sendData?.name || ""}
            />
            <Select
            isDisabled={sendData?.id}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    background:'#F7F9D7'
                  }),
                }}
              options={dataTypeWong}
              className="w-full"
              placeholder="รูปแบบวงค์แชร์"
              defaultValue={
                dataToModal?.id
                  ? options2.find(
                      (option) => option.value == dataToModal?.type_wong_id
                    )
                  : ""
              }
              onChange={(e) =>
                setSendData((prev) => ({
                  ...prev,
                  type_wong_id: e.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-5">
            <Input
              color="purple"
              label="ส่งต่องวด"
              name="installment"
              // value={sendData?.installment || ""}
              value={sendData?.type_wong_id == 3 ? "" :  sendData?.installment || ""}
              onChange={(e) => handleChange(e)}
              required
              disabled={sendData?.type_wong_id == 3 }
            />

            <Input
              color="purple"
              label="จำนวนเงินต้น"
              name="price"
              onChange={(e) => handleChange(e)}
              value={sendData?.price || ""}
            />

            <Input
              color="purple"
              label="จำนวนมือ"
              required
              name="count"
              onChange={(e) => handleChange(e)}
              value={sendData?.count || ""}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-5">
            <Input
              color="purple"
              label="ค่าดูแลวง "
              name="pay_for_wong"
              onChange={(e) => handleChange(e)}
              value={sendData?.pay_for_wong || ""}
            />
            <Input
              color="purple"
              label="ดอกเบี้ย"
              disabled={
                sendData?.type_wong_id == 1 ||
                sendData?.type_wong_id == 3 ||
                sendData?.type_wong_id == 4 ||
                sendData?.type_wong_id == 5
              }
              name="interest"
              onChange={(e) => handleChange(e)}
              value={sendData?.interest || ""}
              // value={
              //   sendData?.type_wong_id == 1 ? "" : 
              //   sendData?.type_wong_id == 3 ? "" : 
              //   sendData?.type_wong_id == 4 ? "" : 
              //   sendData?.type_wong_id == 5 ? "" :  sendData?.interest
              // }
            />
          </div>

          <div className="w-full mt-5">
            <Input
              color="purple"
              label="หมายเหตุ"
              name="note"
              onChange={(e) => handleChange(e)}
              value={sendData?.note || ""}
            />
          </div>

          <div className="flex justify-end mt-5">
            <Button
              variant="gradient"
              color="red"
              onClick={() => handleOpen()}
              className="mr-1 text-sm"
              size="sm"
            >
              <span>ยกเลิก</span>
            </Button>
            {id ? (
              <Button
                onClick={handleEdit}
                variant="gradient"
                color="purple"
                className="text-sm "
                size="sm"
              >
                <span>อัพเดท</span>
              </Button>
            ) : (
              <Button
                type="submit"
                variant="gradient"
                color="purple"
                className="text-sm "
                size="sm"
              >
                <span>บันทึก</span>
              </Button>
            )}
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default WongShareModal;
