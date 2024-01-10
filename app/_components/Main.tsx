"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Main = () => {
  const [open, setOpen] = useState(false);

  const openSidebar = () => {
    setOpen(true);
  };

  return (
    <div>
      <button onClick={openSidebar}>Create Table</button>
      <Sidebar open={open} setOpen={setOpen} />
    </div>
  );
};

export default Main;
