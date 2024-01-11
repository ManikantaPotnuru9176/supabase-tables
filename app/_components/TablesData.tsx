import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getListTables } from "../_supabase/getListTables";

const TablesData = () => {
  //   const getMetadata = useQuery({
  //     queryKey: ["getListTables"],
  //     queryFn: () => getListTables(),
  //   });

  //   console.log("TablesData: ", getAllTables);

  return (
    <div className="relative shadow-md">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Accessories
            </th>
            <th scope="col" className="px-6 py-3">
              Available
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Weight
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700 hover:bg-gray-600">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">3.0 lb.</td>
            <td className="flex items-center px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
              >
                Remove
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablesData;
