"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TablesData from "./TablesData";
import TablesList from "./TablesList";

const Main = () => {
  const [open, setOpen] = useState(false);

  const openSidebar = () => {
    setOpen(true);
  };

  return (
    <div>
      {/* <button onClick={openSidebar}>Create Table</button> */}
      <div className={`${open ? "blur-sm" : ""}`}>
        <TablesList openSidebar={openSidebar} />
      </div>
      <Sidebar open={open} setOpen={setOpen} />
    </div>
  );
};

export default Main;
