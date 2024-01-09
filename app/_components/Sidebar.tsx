"use client";
import React from "react";
import Table from "./Table";

const Sidebar = ({ open, setOpen }: { open: boolean; setOpen: Function }) => {
  const closeSidebar = () => {
    setOpen(false);
  };

  return (
    <div
      className={`${
        open ? "" : "hidden"
      } fixed top-0 bottom-0 lg:right-0 p-2 w-[700px] overflow-y-auto bg-gray-900`}
    >
      <div className="text-gray-100 text-xl">
        <div className="relative p-2.5 mt-1 flex items-center">
          <img
            src="https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg"
            className="w-8 h-8"
          />
          <h1 className="font-bold text-gray-200 text-[15px] ml-3">Supabase</h1>
          <i
            className="bi bi-x text-xl cursor-pointer fixed right-4 top-6"
            onClick={closeSidebar}
          ></i>
        </div>
        <div className="my-2 bg-gray-600 h-[1px]"></div>
      </div>
      <div className="p-2.5 flex items-center rounded-md px-4 duration-300 text-white">
        <i className="bi bi-table"></i>
        <span className="text-[15px] ml-4 text-gray-200 font-bold">Table</span>
      </div>
      <div className="p-2.5 mt-3 rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder=""
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-400 placeholder-gray-400 text-white focus:outline-none"
          required
        />
      </div>
      <div className="p-2.5 mt-3 rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          placeholder="optional"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-400 placeholder-gray-400 text-white focus:outline-none"
        />
      </div>
      <div className="my-4 bg-gray-600 h-[1px]"></div>
      <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
        <i className="bi bi-layout-sidebar-inset"></i>
        <span className="text-[15px] ml-4 text-gray-200 font-bold">
          Columns
        </span>
      </div>
      <Table />
    </div>
  );
};

export default Sidebar;
