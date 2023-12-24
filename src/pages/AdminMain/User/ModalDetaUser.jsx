import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Typography,
} from "@material-tailwind/react";
import moment from "moment";

const TABLE_HEAD = ["ลำดับ", "ชื่อวงแชร์", "จำนวนเงิน"];

const TABLE_ROWS = [
  {
    name: "วงทดสอบโปรแกรม-01",
    price: "100",
  },
  {
    name: "วงทดสอบโปรแกรม-02",
    price: "200",
  },
  {
    name: "วงทดสอบโปรแกรม-03",
    price: "300",
  },
];

const ModalDetaUser = ({ open, handleOpen, dataToModal }) => {
  const formattedDate = moment().format("DD-MM-YYYY");

  useEffect(() => {
    console.log(dataToModal);
  }, [dataToModal]);
  return (
    <Dialog open={open} handler={handleOpen} size="lg">
      <DialogHeader className="flex justify-between bg-purple-400 text-white ">
        <p className="text-lg">
          {dataToModal?.code || ""} ({dataToModal?.f_name || ""})
        </p>
        <p className="text-sm">ข้อมูล ณ วันที่ {formattedDate} </p>
      </DialogHeader>
      <DialogBody >
        <div className=" overflow-y-scroll flex flex-col md:flex-row gap-10 h-96">
            
       
          <div className="w-full md:w-1/3">
            <h2 className="text-xl text-blue-800 font-semibold">
              รายการมือเป็น
            </h2>

            <Card className=" w-full overflow-y-scroll mt-3 ">
              <table className="w-full min-w-max table-auto text-center">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(({ name, price }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-3"
                      : "p-3 border-b border-blue-gray-50";

                    return (
                      <tr key={name}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {index + 1}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {price}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>

            <p className="flex flex-row justify-end mt-4 text-lg text-black">ยอดมือเป็นรวม : <span className="mx-2 font-semibold text-blue-700 underline"> 500</span>  </p> 
          </div>

          <div className="w-full md:w-1/3">
            <h2 className="text-xl text-red-800 font-semibold">
              รายกมารมือตาย
            </h2>

            <Card className=" w-full overflow-y-scroll mt-3 ">
              <table className="w-full min-w-max table-auto text-center">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(({ name, price }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-3"
                      : "p-3 border-b border-blue-gray-50";

                    return (
                      <tr key={name}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {index + 1}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {price}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
            <p className="flex flex-row justify-end mt-4 text-lg text-black">ยอดเงินที่ยังต้องส่งรวม : <span className="mx-2 font-semibold text-red-700 underline"> 700</span>  </p> 

          </div>

          <div className="w-full md:w-1/3">
            {/* Blue report */}
            <div className="bg-blue-700 text-white px-4 py-4 rounded-lg">
              <h2 className="text-xl"> 100,155</h2>
              <hr className="mt-2" />
              <div className="mt-2 flex flex-col ">
                <p>คิดเป็น 78.80 %</p>
                <h2>รวมมือเป็น</h2>
              </div>
            </div>

            {/* Yellow report */}
            <div className="bg-yellow-800 text-white px-4 py-4 rounded-lg mt-4">
              <h2 className="text-xl"> 100,155</h2>
              <hr className="mt-2" />
              <div className="mt-2">
                <p>คิดเป็น 78.80 %</p>
                <h2>รวมมือตาย</h2>
              </div>
            </div>

            {/* Green report */}
            <div className="bg-green-700 text-white px-4 py-4 rounded-lg mt-4">
              <h2 className="text-xl"> 100,155</h2>
              <hr className="mt-2" />
              <div className="mt-2 flex flex-col ">
                <p>คิดเป็น 78.80 %</p>
                <h2>สรุปยอด</h2>
              </div>
            </div>
          </div>
     
          </div>
        <p>ดำเนินการในงวดที่ 3/3</p>
      </DialogBody>
      {/* <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleOpen}>
          <span>Confirm</span>
        </Button>
      </DialogFooter> */}
    </Dialog>
  );
};

export default ModalDetaUser;
