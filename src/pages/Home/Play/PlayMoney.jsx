import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineCash } from "react-icons/hi";
import { Authorization } from "../../../auth/Data";
import { Button, Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";

const PlayMoney = ({ wong_share_id, count }) => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState(
    Array.from({ length: data.name }, () => Array(count).fill("data"))
  );
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_API
        }/play/list/money?wong_share_id=${wong_share_id}`,
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      if(res.status === 200){
        setLoading(false)
        setData(res.data);
      }
    
    } catch (error) {
      console.error(error);
    }
  };

  const checkbill = async (id, sum, status) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/play/list/money/${id}`,
        { sum, status },
        {
          headers: {
            Authorization: Authorization,
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);

        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [wong_share_id]);
  return (
    <div>
      {/* {JSON.stringify(dataToModal)} */}

      <h2 className="text-lg text-black font-bold flex gap-2 items-center">
        <HiOutlineCash
          size={35}
          className="bg-purple-700/5 rounded-full px-1 py-1.5 text-purple-300"
        />
        รายละเอียดวงแชร์
      </h2>

      {loading && (
        <div className="mt-4 flex flex-col gap-4 justify-center items-center">
          <Spinner />
          <small>กรุณารอสักครู่</small>
        </div>
      )}

      {!loading && (
        <div className="  overflow-scroll h-[450px]  w-full   ">
          <table className=" mt-4 text-center table-auto  text-sm  w-full     ">
            <thead>
              <tr className="bg-gray-200  sticky top-0 z-50    ">
                <th className="py-2  ">ลูกแชร์</th>
                {Array.from({ length: count }, (_, index) => (
                  <th className="py-2 " key={index}>
                    {" "}
                    งวดที่ {index + 1}{" "}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="py-3   ">
              {data.map((item, indexMain) => (
                <tr key={indexMain} className="  ">
                  <td className="">
                    <ul className=" text-left text-sm w-20">
                      {item.fname.map((itemFname, index) => (
                        <li key={index}>- {itemFname?.fname}</li>
                      ))}
                    </ul>
                  </td>
                  {item.money.map((moneyItem, index) => (
                    <td className="py-3   " key={index}>
                      <div
                        className={` ${
                          moneyItem.price ? "bg-green-100" : "bg-red-100"
                        } py-2 w-40    bg-opacity-80 rounded-md mx-0.5 text-gray-900 border-2 border-gray-400 shadow-lg  `}
                      >
                        {/* ID {moneyItem.money_id} <br /> */}

                        <div className="">
                          <h2 className="text-lg">ยอด</h2>
                          <h2 className="text-xl font-semibold">
                            {moneyItem.sum}
                          </h2>
                        </div>

                        <div className="px-2">
                          <h2 className="text-lg">ชำระแล้ว</h2>
                          <h2
                            className={
                              moneyItem.price
                                ? "bg-green-700 bg-opacity-70 py-1 px-4 rounded-md text-white text-xl font-semibold"
                                : "bg-red-700 bg-opacity-70 py-1 px-4 rounded-md text-white text-xl font-semibold"
                            }
                          >
                            {moneyItem.price || 0}
                          </h2>
                        </div>

                        {/* <p className="mt-4">
                        วันที่ชำระ : {moneyItem?.date || "ยังไม่ชำระ"}
                      </p> */}

                        <hr className=" mt-2 border-1  border-gray-400  " />
                        <div className="mt-2 flex flex-col gap-2  justify-center w-full px-2   ">
                          <Button
                            size="sm"
                            className="bg-green-700 font-light py-1   text-sm"
                            onClick={() =>
                              checkbill(moneyItem.money_id, moneyItem.sum, 1)
                            }
                            disabled={
                              moneyItem.price ? true : false || indexMain === 0
                            }
                          >
                            ชำระเงิน
                          </Button>

                          <Button
                            size="sm"
                            className="bg-red-700 font-light py-1   text-sm"
                            disabled={indexMain === 0}
                            onClick={() =>
                              checkbill(moneyItem.money_id, moneyItem.sum, 0)
                            }
                          >
                            ไม่ชำระ
                          </Button>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PlayMoney;

// ลำดับ / count_1 / count_2 / count_3
// item.name / money_id / money_id / money_id
// item.name / money_id / money_id / money_id
// item.name / money_id / money_id / money_id
{
  /* <tr>
  <td>item.name 1</td>
  <td>money_id 1</td>
  <td>money_id 2</td>
  <td>money_id 3</td>
</tr>
<tr>
  <td>item.name 2</td>
  <td>money_id 4</td>
  <td>money_id 5</td>
  <td>money_id 6</td>
</tr> */
}
