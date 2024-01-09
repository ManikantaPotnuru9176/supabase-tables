"use client";
import { useState } from "react";
import Sidebar from "./_components/Sidebar";

export default function Home() {
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
}
