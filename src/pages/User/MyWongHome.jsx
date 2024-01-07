import axios from "axios";
import React, { useEffect, useState } from "react";
import { Authorization } from "../../auth/Data";
import { Card, CardBody } from "@material-tailwind/react";

const MyWongHome = ({ data }) => {
  const id = data?.item?.home_share_id || "";
  const [dataHomeShare, setDataHomeShare] = useState({});

  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_APP_API}/home_share/${id}`,
  //       {
  //         headers: {
  //           Authorization: Authorization,
  //         },
  //       }
  //     );
  //     // console.log(res.data);
  //     // setDataHomeShare(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // fetchData();
  }, [data]);

  return (
    <div>
      <Card>
        <CardBody>

          {/* {JSON.stringify(data)} */}

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <b>รหัสบ้านแชร์ : </b>
              <span>{data?.home_share_code}</span>
            </div>

            <div className="w-full">
              <b>ชื่อบ้านแชร์ : </b>
              <span>{data?.home_share_name}</span>
            </div>

            <div className="w-full">
              <b>สถานะ : </b>
              <span>
                {data?.status_own === 1 ? "Online" : "Offline"}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="w-full">
              <b>ธนาคาร : </b>
              <span>{dataHomeShare?.bank}</span>
            </div>

            <div className="w-full">
              <b>เลขบัญชี : </b>
              <span>{dataHomeShare?.account_number}</span>
            </div>

            <div className="w-full">
              <b>ชื่อบัญชี : </b>
              <span>
                {dataHomeShare?.account_name }
              </span>
            </div>
          </div>


        </CardBody>
      </Card>
     
    </div>
  );
};

export default MyWongHome;
