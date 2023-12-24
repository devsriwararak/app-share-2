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

const WongShareModal = ({ open, handleOpen, id, fetchData, dataToModal }) => {
  const [typePlayCheck, setTypePlayCheck] = useState(1);

  const [sendData, setSendData] = useState({});
  const [dataHome, setDataHome] = useState([]);

  const fetchHomeShare = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}/homesh`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });

      const rename = res.data.map((item, index) => ({
        value: item.id,
        label: item.sh_name,
      }));
      setDataHome(rename);

      console.log(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSendData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSendAPI = {
      user_id: localStorage.getItem("id"),
      share_id: sendData.shaer_id,
      p_share_name: sendData.p_share_name,
      p_share_type: sendData.p_share_type,
      p_share_interest: sendData.p_share_interest,
      p_share_send_per: sendData.p_share_send_per,
      p_share_maintain: sendData.p_share_maintain,
      p_share_req: sendData.p_share_req,
      p_share_paid: sendData.p_share_paid,
      p_share_hand: sendData.p_share_hand,
    };



    console.log(dataToSendAPI);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/share/addshare`,
        dataToSendAPI,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(res.data);
      setSendData({})
      fetchData();
      toast.success("บันทึกสำเร็จ ");
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    const sendDataToApi = {
      id: sendData.id,
      // user_id: localStorage.getItem("id"),
      share_id: sendData.shaer_id,
      p_share_name: sendData.p_share_name,
      p_share_type: sendData.p_share_type,
      p_share_interest: sendData.p_share_interest,
      p_share_send_per: sendData.p_share_send_per,
      p_share_paid: sendData.p_share_paid,
      p_share_maintain: sendData.p_share_maintain,
      p_share_hand: sendData.p_share_hand,
      p_share_req: sendData.p_share_req,
    };
    console.log(sendDataToApi);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/share/edit`,
        sendDataToApi
      );
      console.log(res.data);
      toast.success('บันทึกสำเร็จ')
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
    addDataToEdit();
    // console.log(dataToModal);
  }, [dataToModal]);

  return (
    <Dialog open={open} size="lg" handler={handleOpen}>
      <DialogHeader className="bg-gray-200 flex gap-2 rounded-lg text-lg">
        <HiOutlineChatAlt2 /> {id ? "แก้ไขวงค์แชร์" : "สร้างวงค์แชร์"}
      </DialogHeader>
      <DialogBody className=" py-10 h-96 overflow-scroll md:h-full md:overflow-auto ">
        ID : {dataToModal?.share_id || ""}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Select
              options={dataHome}
              className="w-full"
              placeholder="เลือกบ้านแชร์"
              defaultValue={dataToModal?.id ? dataHome.find(option => option.value == dataToModal?.share_id) : ""}
              onChange={(e) =>
                setSendData((prev) => ({
                  ...prev,
                  shaer_id: e.value,
                }))
              }
            />
            <Input
              color="purple"
              label="ชื่อวงค์แชร์"
              required
              name="p_share_name"
              onChange={(e) => handleChange(e)}
              value={sendData?.p_share_name || ""}
            />
            <Select
              options={options2}
              className="w-full"
              placeholder="รูปแบบวงค์แชร์"
              defaultValue={dataToModal?.id ? options2.find(option => option.value == dataToModal?.p_share_type) : ""}
              onChange={(e) =>
                setSendData((prev) => ({
                  ...prev,
                  p_share_type: e.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-5">
            <Input
              color="purple"
              label="ส่งต่องวด"
              name="p_share_send_per"
              value={sendData?.p_share_send_per || ""}
              onChange={(e) => handleChange(e)}
              required
              disabled={sendData?.p_share_type == 3}
            />

            <Input
              color="purple"
              label="จำนวนเงินต้น"
              name="p_share_paid"
              onChange={(e) => handleChange(e)}
              value={sendData?.p_share_paid || ""}

            />

            <Input
              color="purple"
              label="จำนวนมือ"
              required
              name="p_share_hand"
              onChange={(e) => handleChange(e)}
              value={sendData?.p_share_hand || ""}

            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-5">
            <Input
              color="purple"
              label="ค่าดูแลวง "
              name="p_share_maintain"
              onChange={(e) => handleChange(e)}
              value={sendData?.p_share_maintain || ""}

            />
            <Input
              color="purple"
              label="ดอกเบี้ย"
              disabled={
                sendData?.p_share_type == 1 ||
                sendData?.p_share_type == 3 ||
                sendData?.p_share_type == 4 ||
                sendData?.p_share_type == 5
              }
              name="p_share_interest"
              onChange={(e) => handleChange(e)}
              value={sendData?.p_share_interest || ""}

            />
          </div>

          <div className="w-full mt-5">
            <Input
              color="purple"
              label="หมายเหตุ"
              name="p_share_req"
              onChange={(e) => handleChange(e)}
              value={sendData?.p_share_req || ""}

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
