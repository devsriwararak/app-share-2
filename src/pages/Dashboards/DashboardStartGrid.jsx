import React from "react";
import { IoBagHandle, IoAlarmSharp , IoBarChartOutline , IoCalendarNumberSharp } from "react-icons/io5";

const DashboardStartGrid = () => {
  return (
    <div className="flex gap-4 w-full flex-col md:flex-row">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500">Total Sales</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700"> 500 B</strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-500">
          <IoAlarmSharp className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500">Total Sales</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700"> 500 B</strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-500">
          <IoBarChartOutline className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500">Total Sales</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700"> 500 B</strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
          <IoCalendarNumberSharp className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500">Total Sales</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700"> 500 B</strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
};

export default DashboardStartGrid;

const BoxWrapper = ({ children }) => {
  return (
    <div className="bg-white rounded-lg p-4 flex-1 border border-gray-200 flex items-center shadow-lg">
      {children}
    </div>
  );
};
