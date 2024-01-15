import { Spinner } from "@material-tailwind/react";
import React from "react";

const LoadingComponent = ({ loading, TABLE_HEAD }) => {
  return (
    <>
      {loading &&
        (TABLE_HEAD ? (
          <tbody className="">
            <tr>
              <td colSpan={TABLE_HEAD}>
                <div className="flex flex-col gap-2 items-center justify-center mt-5">
                  <Spinner className="h-6 w-6  text-gray-900/50" />
                  <small>กรุณารอสักครู่ !</small>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center mt-5">
            <Spinner className="h-6 w-6  text-gray-900/50" />
            <small>กรุณารอสักครู่ !</small>
          </div>
        ))}
    </>
  );
};

export default LoadingComponent;
