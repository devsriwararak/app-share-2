import React from "react";
import { HiOutlinePlay } from "react-icons/hi";

const PlaySetting = () => {
  return (
    <div>
      <h2 className="text-lg text-black font-bold flex gap-2 items-center">
        <HiOutlinePlay
          size={35}
          className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
        />
        รายละเอียดวงแชร์
      </h2>
      <p>กำลังปรับปรุง !</p>
    </div>
  );
};

export default PlaySetting;
