import { Button, Input, Textarea } from "@material-tailwind/react";
import React from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Select from "react-select";
import { toast } from "react-toastify";

const PlayData = ({ data, setData }) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const handleUpdate = () => {
    toast.success("บันทึกสำเร็จ ");
  };

  const handleChange = () => {};

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between">
        <h2 className="text-lg text-black font-bold flex gap-2 items-center">
          <HiOutlinePencilAlt
                  size={35}
                  className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
                />
          
          แก้ไขข้อมูลวงแชร์ {data?.name}
        </h2>
        <Button color="purple" size="sm" className="text-sm" onClick={handleUpdate}>
          อัพเดท
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-5">
        <Input
          type="text"
          label="รหัสวงแชร์"
          value={data.code || ""}
          disabled
          className="w-full"
          onChange={(e) => setData((rev) => ({ ...rev, code: e.target.value }))}
        />
        <Input
          className="w-full"
          type="text"
          label="ชื่อวงแชร์"
          color="purple"
          value={data.name || ""}
          onChange={(e) => setData((rev) => ({ ...rev, name: e.target.value }))}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Select
          className="w-full"
          options={options}
          placeholder="รูปแบบวงแชร์"
        />

        <Select
          className="w-full"
          options={options}
          placeholder="สถานะ Online / Offline"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Select
          className="w-full"
          options={options}
          placeholder="ประเภทค่าดูแล ชำระงวดแรก / ชำระตอนได้เงิน"
        />
        <Input className="w-full" type="text" label="ดอกเบี้ย" color="purple" />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Input className="w-full" type="text" label="จำนวนมือ" color="purple" />
        <Input className="w-full" type="text" label="เงินต้น" color="purple" />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Input className="w-full" type="text" label="ส่งงวดละ" color="purple" />
        <Input
          className="w-full"
          type="text"
          label="ค่าดูแลวง"
          color="purple"
        />
      </div>

      <div className="mt-4">
        <Textarea label="หมายเหตุ" color="purple" />
      </div>

 
    </div>
  );
};

export default PlayData;
