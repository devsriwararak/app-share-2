import { Card, CardBody } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Authorization } from "../../auth/Data";
import classNames from "classnames";

const MyWongWong = ({ home_share_id }) => {
  const user_id = localStorage.getItem("id");
  const [wongShare , setWongShare] = useState([])
  const [dataWongShare, setDataWongShare] = useState({});
  const [indexStatus , setIndexStatus] = useState(null)


  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_API
        }/users/wong_share/${user_id}/${home_share_id}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      console.log(res.data);
      setWongShare(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectWongShare = (id, index)=>{
    const data = wongShare.find((obj)=>obj.id === id)
    setDataWongShare(data)
    setIndexStatus(index)

  }
  useEffect(() => {
    fetchData();
  }, [home_share_id]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 mt-2 ">
        <Card className="w-full lg:w-2/6">
          <CardBody>
            <ul className="">
              {wongShare.map((item, index) => (
                <div key={item.id}>
                  <li  onClick={()=>selectWongShare(item.wong_share_id, index)}  className={classNames(indexStatus === index && "bg-gray-300 hover:bg-gray-300","flex justify-between items-center  hover:bg-gray-200 rounded-lg py-1 px-2 cursor-pointer ")}>
                    {`${item.name}`}
                    <span className="text-xs bg-purple-400 text-white rounded-full px-1 py-1">
                      เลือก
                    </span>
                  </li>
                  <hr className="mt-1" />
                </div>
              ))}
            </ul>
          </CardBody>
        </Card>

        <div className="w-full lg:w-4/6 px-5">
          <div className="flex flex-col md:flex-row gap-4 mt-4 text-gray-800">

          <div className="w-full">
              <b>บ้านแชร์ :</b> <span>{dataWongShare?.home_share_name}</span>
            </div>

            <div className="w-full">
              <b>รหัสวงค์แชร์ :</b> <span>{dataWongShare?.code}</span>
            </div>
           
          
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4 text-gray-800">

          <div className="w-full">
              <b>ชื่อวงค์แชร์ :</b> <span>{dataWongShare?.name}</span>
            </div>

            <div className="w-full">
              <b>รูปแบบวงค์แชร์ :</b> <span>{dataWongShare?.type_wong_name}</span>
            </div>
            
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4 text-gray-800">

          <div className="w-full">
              <b>จำนวนเงินต้น :</b> <span>{dataWongShare?.price} บาท</span>
            </div>

            <div className="w-full ">
              <b>จำนวนมือ :</b> <span>{dataWongShare?.count} คน</span>
            </div>

           
          </div>

          <div className="flex flex-col md:flex-rowgap-4 mt-2 text-gray-800">

          <div className="w-full">
              <b>ค่าดูแลวงค์ :</b> <span>{dataWongShare?.pay_for_wong} บาท</span>
            </div>

            <div className="w-full md:w-8/12 whitespace-nowrap overflow-hidden mt-2">
              <b>หมายเหตุ :</b>{" "}
              <span>{dataWongShare?.note}</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border border-gray-200 mt-8" />

      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <Card className="w-full ring-2 ring-gray-200">
          <CardBody>
            <p className="text-lg text-gray-800">
              ข้อมูลวงค์แชร์ จะดำเนินการในงวดที่ 3/3 ครับ.
            </p>
          </CardBody>
        </Card>

        <Card className="w-full ring-2 ring-gray-200">
          <CardBody>
            <p className="text-lg text-gray-800">
              ข้อมูลวงค์แชร์ จะดำเนินการในงวดที่ 3/3 ครับ.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default MyWongWong;
