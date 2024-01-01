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
import { toast } from "react-toastify";
import axios from "axios";
import { Authorization } from "../../../auth/Data";

const MyWongShare = ({ open, handleOpen, id, fetchNewDat, dataToModal }) => {
  const [typePlayCheck, setTypePlayCheck] = useState(1);

  const [sendData, setSendData] = useState({});
  const [dataTypeShare, setDataTypeHome] = useState([]);

  const fetchTypeShare = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}/type_wong`, {
        headers: {
          Authorization: Authorization
        },
      });

      const rename = res.data.map((item, index) => ({
        value: item.id,
        label: item.name,
      }));
      setDataTypeHome(rename);

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

    const data = {
      home_share_id : localStorage.getItem('home_share_id') ,
      name :sendData.name || "", 
      type_wong_id :sendData.type_wong_id || "", 
      installment :sendData.installment || "", 
      price :sendData.price || "",  
      count :sendData.count || "", 
      pay_for_wong :sendData.pay_for_wong || "", 
      interest :sendData.interest || "", 
      note :sendData.note || ""
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/wong_share/home`,
        data,
        {
          headers: {
            Authorization: Authorization
          },
        }
      );
      console.log(res.data);
      setSendData({});
      toast.success("บันทึกสำเร็จ ");
      handleOpen();
      fetchNewDat();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    const data = {
      id: sendData.id ,
      home_share_id : localStorage.getItem('home_share_id') ,
      name :sendData.name || "", 
      type_wong_id :sendData.type_wong_id || "", 
      installment :sendData.installment || "", 
      price :sendData.price || "",  
      count :sendData.count || "", 
      pay_for_wong :sendData.pay_for_wong || "", 
      interest :sendData.interest || "", 
      note :sendData.note || ""
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/wong_share/home`,
        data,
        {
          headers: {
            Authorization: Authorization
          },
        }
      );
      console.log(res.data);
      toast.success("บันทึกสำเร็จ");
      handleOpen();
      setSendData({});
      fetchNewDat();
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
    fetchTypeShare()
    addDataToEdit();
  }, [dataToModal]);

  return (
    <Dialog open={open} size="lg" handler={handleOpen}>
      <DialogHeader className="bg-gray-200 flex gap-2 rounded-lg text-lg">
        <HiOutlineChatAlt2 />{" "}
        {dataToModal.id ? "แก้ไขวงค์แชร์ของฉัน" : "สร้างวงค์แชร์ของฉัน"}
      </DialogHeader>
      <DialogBody className=" py-10 h-96 overflow-scroll md:h-full md:overflow-auto ">

        {/* {JSON.stringify(sendData)} */}

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Input
              color="purple"
              label="ชื่อวงค์แชร์"
              required
              name="name"
              onChange={(e) => handleChange(e)}
              value={sendData?.name || ""}
            />
            <Select
              options={dataTypeShare}
              className="w-full"
              placeholder="รูปแบบวงค์แชร์"
              required
              defaultValue={
                dataToModal?.id
                  ? dataTypeShare.find(
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
              value={sendData?.installment || ""}
              onChange={(e) => handleChange(e)}
              required
              disabled={sendData?.type_wong_id == 3}
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

export default MyWongShare;
