"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TablesData from "./TablesData";

const Main = () => {
  const [open, setOpen] = useState(false);

  const openSidebar = () => {
    setOpen(true);
  };

  return (
    <div>
      <button onClick={openSidebar}>Create Table</button>
      <>
        <p className="text-4xl font-black text-gray-900 dark:text-white">
          Tables Data:
        </p>
        <TablesData />
      </>
      <Sidebar open={open} setOpen={setOpen} />
    </div>
  );
};

export default Main;
