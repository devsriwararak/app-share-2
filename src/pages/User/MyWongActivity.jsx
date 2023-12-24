import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { HiOutlineCalendar, HiOutlineScale } from "react-icons/hi";

const TABLE_HEAD_1 = ["วันที่", "ชื่อวงค์แชร์", "งวดที่", "จำนวนเงิน"];
const TABLE_ROWS_2 = [
  {
    name: "10/11/2566",
    job: "วงมะพร้าว",
    date: "17/18",
    price: 1000,
  },
  {
    name: "11/11/2566",
    job: "วงมะนาว",
    date: "1/18",
    price: 2000,
  },
  {
    name: "12/11/2566",
    job: "วงคอมพิวเตอร์",
    date: "5/19",
    price: 3000,
  },
  {
    name: "13/11/2566",
    job: "วงกะลา",
    date: "19/20",
    price: 4000,
  },
  {
    name: "14/11/2566",
    job: "วงแคลช",
    date: "12/20",
    price: 5000,
  },
];

const MyWongActivity = ({ data }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 ">
        <Card className="w-full ring-2 ring-gray-800/5 mt-5">
          <CardHeader className="bg-purple-400 text-white ring-1 ring-gray-300 h-14 flex justify-start items-center gap-3 text-lg px-5 font-bold">
            <HiOutlineCalendar  size={22} /> วันที่กิจกรรมวงค์แชร์ ({data.home})
          </CardHeader>
          <CardBody>
            <Input label="ค้นหา รหัส หรือ ชื่อวงค์แชร์" color="purple" />

            <Card className=" w-full overflow-scroll mt-4">
              <table className="w-full table-auto text-center">
                <thead>
                  <tr>
                    {TABLE_HEAD_1.map((head) => (
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
                  {TABLE_ROWS_2.map(({ name, job, date, price }, index) => (
                    <tr key={name} className="even:bg-blue-gray-50/50 hover:bg-gray-200">
                      <td className="p-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className="p-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {job}
                        </Typography>
                      </td>
                      <td className="p-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className="p-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {price}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <p className='text-lg text-gray-800 mt-4'> จะดำเนินการในงวดที่ 3/3 ครับ.</p>

          </CardBody>
        </Card>

        <Card className="w-full ring-2 ring-gray-800/5 mt-5">
        <CardHeader className="bg-purple-400 text-white ring-1 ring-gray-300 h-14 flex justify-start items-center gap-3 text-lg px-5 font-bold">
            <HiOutlineScale size={22} /> วันที่จบวงค์แชร์ ({data.home})
          </CardHeader>
          <CardBody>

          <Input label="ค้นหา รหัส หรือ ชื่อวงค์แชร์" color="purple" />


          <Card className=" w-full overflow-scroll mt-4">
              <table className="w-full table-auto text-center">
                <thead>
                  <tr>
                    {TABLE_HEAD_1.map((head) => (
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
                  {TABLE_ROWS_2.map(({ name, job, date, price }, index) => (
                    <tr key={name} className="even:bg-blue-gray-50/50 hover:bg-gray-200">
                      <td className="p-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className="p-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {job}
                        </Typography>
                      </td>
                      <td className="p-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className="p-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {price}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <p className='text-lg text-gray-800 mt-4'> จะดำเนินการในงวดที่ 3/3 ครับ.</p>

          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default MyWongActivity;
