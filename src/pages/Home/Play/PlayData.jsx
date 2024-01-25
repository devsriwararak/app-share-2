import { Button, Input, Textarea } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Select from "react-select";
import { toast } from "react-toastify";
import { Authorization } from "../../../auth/Data";
import axios from "axios";

const PlayData = ({ dataToModal, fetchDataWongShare }) => {
  const [sendData, setSendData] = useState({});
  const [dataTypeShare, setDataTypeHome] = useState([]);

  const onlineSelect = [
    { value: 0, label: "Online" },
    { value: 1, label: "Offline" },
  ];

  const TypeTakeCareSelect = [
    { value: 0, label: "ชำระตอนรับเงิน" },
    { value: 1, label: "ชำระงวดแรก" },
  ];

  const fetchTypeShare = async () => {
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
      setDataTypeHome(rename);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    const data = {
      id: sendData.id,
      home_share_id: localStorage.getItem("home_share_id"),
      name: sendData.name || "",
      type_wong_id: sendData.type_wong_id || "",
      installment: sendData.installment || "",
      price: sendData.price || "",
      count: sendData.count || "",
      pay_for_wong: sendData.pay_for_wong || "",
      interest: sendData.interest || "",
      note: sendData.note || "",
      online: sendData?.online || 0,
      takecare: sendData?.takecare || 0,
    };
    console.log(data);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/wong_share/home`,
        data,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      console.log(res.data);
      toast.success("บันทึกสำเร็จ");
      fetchDataWongShare();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setSendData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    fetchTypeShare();
    setSendData(
      (prev) => (
        {
          ...prev,
        },
        dataToModal
      )
    );
  }, [dataToModal]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between">
        <h2 className="text-lg text-black font-bold flex gap-2 items-center">
          <HiOutlinePencilAlt
            size={35}
            className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
          />
          แก้ไขข้อมูลวงแชร์ {sendData?.name}
        </h2>
        <Button
          color="purple"
          size="sm"
          className="text-sm"
          onClick={handleEdit}
        >
          อัพเดท
        </Button>
      </div>

      {/* {JSON.stringify(sendData)} */}

      <div className="flex flex-col md:flex-row gap-4 mt-5">
        <Input
          type="text"
          label="รหัสวงแชร์"
          disabled
          className="w-full"
          value={sendData.code || ""}
          onChange={(e) => handleChange(e)}
        />
        <Input
          className="w-full"
          type="text"
          label="ชื่อวงแชร์"
          color="purple"
          name="name"
          value={sendData?.name || ""}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Select
          options={dataTypeShare}
          className="w-full"
          placeholder="รูปแบบวงค์แชร์"
          value={
            sendData?.id
              ? dataTypeShare.find(
                  (option) => option.value == sendData?.type_wong_id
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

        <Select
          className="w-full"
          options={onlineSelect}
          placeholder="สถานะ Online / Offline"
          value={
            sendData?.id
              ? onlineSelect.find(
                  (option) => option.value == sendData?.online
                )
              : ""
          }
          onChange={(e) =>
            setSendData((prev) => ({
              ...prev,
              online: e.value,
            }))
          }
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Select
          className="w-full"
          options={TypeTakeCareSelect}
          placeholder="ประเภทค่าดูแล "
          value={
            sendData?.id
              ? TypeTakeCareSelect.find(
                  (option) => option.value == sendData?.takecare
                )
              : ""
          }
          onChange={(e) =>
            setSendData((prev) => ({
              ...prev,
              takecare: e.value,
            }))
          }
        />
        <Input
          className="w-full"
          type="text"
          label="ดอกเบี้ย"
          color="purple"
          name="interest"
          disabled={
            sendData?.type_wong_id == 1 ||
            sendData?.type_wong_id == 3 ||
            sendData?.type_wong_id == 4 ||
            sendData?.type_wong_id == 5
          }
          value={sendData.interest || ""}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Input
          className="w-full"
          type="text"
          label="จำนวนมือ"
          color="purple"
          name="count"
          value={sendData.count || ""}
          onChange={(e) => handleChange(e)}
        />
        <Input
          className="w-full"
          type="text"
          label="เงินต้น"
          color="purple"
          name="price"
          value={sendData.price || ""}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Input
          className="w-full"
          type="text"
          label="ส่งงวดละ"
          color="purple"
          disabled={sendData?.type_wong_id == 3}
          name="installment"
          value={sendData.installment || ""}
          onChange={(e) => handleChange(e)}
        />
        <Input
          className="w-full"
          type="text"
          label="ค่าดูแลวง"
          color="purple"
          name="pay_for_wong"
          value={sendData?.pay_for_wong || ""}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="mt-4">
        <Textarea
          label="หมายเหตุ"
          color="purple"
          name="note"
          value={sendData?.note || ""}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
};

export default PlayData;
