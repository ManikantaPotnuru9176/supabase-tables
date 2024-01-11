"use client";
import React, { useState } from "react";
import Table from "./Table";
import Image from "next/image";

import useMetadataStore from "@/zustand/metadata";
import { useMutation } from "@tanstack/react-query";
import { createTable } from "@/app/_supabase/_table/createTable";
import { createColumn } from "@/app/_supabase/_table/createColumn";
import { typeConverter } from "@/utils/typeConverter";
import { insertData } from "../_supabase/_data/insert";

interface ColumnMutationParams {
  tableId: number;
  name: string;
  type: string;
  isUnique: boolean;
  isPrimaryKey: boolean;
  defaultValue?: string;
  isIdentity: boolean;
  defaultValueFormat?: string;
  isNullable?: boolean;
}

const Sidebar = ({ open, setOpen }: { open: boolean; setOpen: Function }) => {
  const [isLoading, setIsLoading] = useState(false);

  const table = useMetadataStore((store) => store.table);
  const updateTable = useMetadataStore((store) => store.updateTable);
  const resetTableData = useMetadataStore((store) => store.resetTable);

  console.log("table: ", table);

  const closeSidebar = () => {
    setOpen(false);
    resetTableData();
  };

  const updateTableId = (tableId: number) => {
    updateTable({ table_id: tableId });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTable({ name: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTable({ description: e.target.value });
  };

  const insertMutation = useMutation({
    mutationFn: (newTableData: { table_id: number; schema: string }) =>
      insertData("metadata", newTableData),
  });

  const createColumnMutation = useMutation({
    mutationFn: (data: object) => createColumn(data),
    onError: () => {
      alert("Error creating column.");
    },
  });

  const createTableMutation = useMutation({
    mutationFn: (data: object) => createTable(data),
    onSuccess: (data: { data: object; id: number } | undefined) => {
      if (data) {
        updateTableId(data.id);
        table.schema.map((column) => {
          const mutationParams: ColumnMutationParams = {
            tableId: data.id,
            name: column.name,
            type: typeConverter(column.type),
            isUnique: false,
            isPrimaryKey: column.primary,
            isIdentity: false,
          };

          if (column.column_id === 1) {
            mutationParams.isIdentity = true;
          } else if (column.column_id === 2) {
            mutationParams.defaultValueFormat = "expression";
            mutationParams.defaultValue = column.default_value;
            mutationParams.isNullable = false;
          } else {
            mutationParams.defaultValue = column.default_value;
            mutationParams.isNullable = true;
          }

          createColumnMutation.mutate(mutationParams, {
            onSuccess: () => {
              insertMutation.mutate(
                {
                  table_id: data.id,
                  schema: JSON.stringify(table.schema),
                },
                {
                  onSuccess: () => {
                    setOpen(false);
                    setIsLoading(false);
                    resetTableData();
                  },
                }
              );
            },
          });
        });
      }
    },
    onError: (error) => {
      console.log("error: ", error);
      setIsLoading(false);
      alert("Error creating table.");
    },
  });

  // const createMetadataColumnMutation = useMutation({
  //   mutationFn: (data: object) => createColumn(data),
  //   onError: () => {
  //     alert("Error creating metadata column.");
  //   },
  // });

  // const createMetadataTableMutation = useMutation({
  //   mutationFn: (data: object) => createTable(data),
  //   onSuccess: async (data: { data: object; id: number } | undefined) => {
  //     if (data) {
  //       const columnsData = [
  //         {
  //           tableId: data.id,
  //           name: "id",
  //           type: "int8",
  //           isIdentity: true,
  //           isUnique: true,
  //           isPrimaryKey: true,
  //         },
  //         {
  //           tableId: data.id,
  //           name: "table_id",
  //           type: typeConverter("integer"),
  //           isIdentity: false,
  //           isUnique: false,
  //           isPrimaryKey: false,
  //         },
  //         {
  //           tableId: data.id,
  //           name: "schema",
  //           type: typeConverter("string"),
  //           isIdentity: false,
  //           isUnique: false,
  //           isPrimaryKey: false,
  //         },
  //       ];

  //       columnsData.map((column) => {
  //         createMetadataColumnMutation.mutate(column, {
  //           onSuccess: async () => {
  //             setTimeout(() => {
  //               insertMutation.mutate({
  //                 table_id: data.id,
  //                 schema: JSON.stringify(table.schema),
  //               });
  //               setIsLoading(false);
  //             }, 1000);
  //           },
  //         });
  //       });
  //     }
  //   },
  //   onError: () => {
  //     alert("Error creating metadata table.");
  //   },
  // });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    createTableMutation.mutate({
      name: table.name,
      schema: "public",
      comment: table.description,
      rls_enabled: false,
    });

    // createMetadataTableMutation.mutate({
    //   name: "metadata",
    //   schema: "public",
    //   comment: "It is a metadata of the tables",
    //   rls_enabled: false,
    // });
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
              className="focus:outline-none text-white font-medium rounded-lg text-sm px-8 py-2.5 bg-green-600 hover:bg-green-700 flex"
            >
              {isLoading && (
                <svg
                  className="w-5 h-5 mr-2 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
