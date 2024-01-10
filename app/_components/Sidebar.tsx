"use client";
import React from "react";
import Table from "./Table";
import Image from "next/image";
import useMetadataStore from "../_zustand/metadata";
import { useMutation } from "@tanstack/react-query";
import { createTable } from "../_supabase/createTable";
import { createColumn } from "../_supabase/createColumn";
import { typeConverter } from "../_utils/typeConverter";

const Sidebar = ({ open, setOpen }: { open: boolean; setOpen: Function }) => {
  const table = useMetadataStore((store) => store.table);
  const updateTable = useMetadataStore((store) => store.updateTable);

  const closeSidebar = () => {
    setOpen(false);
  };

  const updateTableId = (tableId: string) => {
    updateTable({ tableId });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTable({ name: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTable({ description: e.target.value });
  };

  const createColumnMutation = useMutation({
    mutationKey: ["createColumn"],
    mutationFn: (data: object) => createColumn(data),
    onSuccess: (data: { data: object; id: string } | undefined) => {},
    onError: () => {
      alert("Error creating table.");
    },
  });

  const createTableMutation = useMutation({
    mutationKey: ["createTable"],
    mutationFn: (data: object) => createTable(data),
    onSuccess: (data: { data: object; id: string } | undefined) => {
      if (data) {
        updateTableId(data.id);
        table.schema.map((column) =>
          createColumnMutation.mutate({
            tableId: table.tableId,
            name: column.name,
            type: typeConverter(column.type),
            isUnique: false,
            isPrimaryKey: column.primary,
          })
        );
      }
    },
    onError: () => {
      alert("Error creating table.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTableMutation.mutate({
      name: table.name,
      schema: "public",
      comment: table.description,
      rls_enabled: false,
    });
  };

  return (
    <div
      className={`${
        open ? "" : "hidden"
      } fixed top-0 bottom-0 lg:right-0 p-2 pt-0 w-[700px] bg-gray-900 overflow-y-auto`}
    >
      <div className="p-3 mt-2 flex items-center bg-gray-900 text-gray-100 text-xl sticky top-0 z-50">
        <Image
          alt="supabase"
          src="https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg"
          width={22}
          height={22}
        />
        <h1 className="font-bold text-gray-200 text-[15px] ml-3">
          Create a new table
        </h1>
      </div>
      <div className="overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-2.5 flex items-center rounded-md px-4 duration-300 text-white">
            <i className="bi bi-table"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Table
            </span>
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
              value={table.name}
              onChange={handleNameChange}
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
              value={table.description}
              onChange={handleDescriptionChange}
              placeholder="optional"
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-400 placeholder-gray-400 text-white focus:outline-none"
            />
          </div>
          <div className="my-4 bg-gray-600 h-[1px]"></div>
          <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white">
            <i className="bi bi-layout-sidebar-inset"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Columns
            </span>
          </div>
          <Table />
          <div className="flex justify-end mb-2 mt-8 space-x-4">
            <button
              type="button"
              className="border focus:outline-none font-medium rounded-lg text-sm px-8 py-2.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600"
              onClick={closeSidebar}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="focus:outline-none text-white font-medium rounded-lg text-sm px-8 py-2.5 bg-green-600 hover:bg-green-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
