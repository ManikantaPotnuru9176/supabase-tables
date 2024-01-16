import React from "react";
import TablesData from "./TablesData";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getData } from "@/supabase/_data/get";
import { getTable } from "@/supabase/_table/getTable";
import { useParams, useSearchParams } from "next/navigation";

const TablesList = ({ openSidebar }: { openSidebar: Function }) => {
  const serachParams = useSearchParams();

  const { data: metadata, isLoading }: { data: any; isLoading: boolean } =
    useQuery({
      queryKey: ["metadata"],
      queryFn: () => getData("metadata", "*", "id"),
    });

  const tableQueries = useQueries({
    queries: !!metadata
      ? metadata.map(({ table_id }: { table_id: number }) => {
          return {
            queryKey: ["table", table_id],
            queryFn: () => getTable(table_id),
          };
        })
      : [],
  }).map((query) => query.data);

  const { data }: { data: any } = useQuery({
    queryKey: ["metadata", serachParams.get("tableId")],
    queryFn: () => getData(serachParams.get("tableName") ?? "", "*", "id"),
    enabled: !!serachParams.get("tableName"),
  });

  console.log("Metadata: ", metadata);
  console.log("tableQueries: ", tableQueries);

  if (isLoading) {
    return (
      <div>
        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 border-r-2">
            <div className="shadow animate-pulse space-y-8">
              <div className="w-full bg-gray-200 rounded-lg h-6 dark:bg-gray-700"></div>
              <div className="w-full bg-gray-200 rounded-lg h-6 dark:bg-gray-700"></div>
              <div className="w-full bg-gray-200 rounded-lg h-6 dark:bg-gray-700"></div>
              <div className="w-full bg-gray-200 rounded-lg h-6 dark:bg-gray-700"></div>
              <div className="w-full bg-gray-200 rounded-lg h-6 dark:bg-gray-700"></div>
              <div className="w-full bg-gray-200 rounded-lg h-6 dark:bg-gray-700"></div>
              <div className="w-full bg-gray-200 rounded-lg h-6 dark:bg-gray-700"></div>
            </div>
          </div>
        </aside>

        <div className="sm:ml-64 dark:bg-gray-800 overflow-x-auto min-h-screen">
          <TablesData data={[]} tableColumnsData={[]} />
        </div>
      </div>
    );
  }

  const tableColumnsData = tableQueries.filter(
    (table: any) => table?.name === serachParams.get("tableName")
  );

  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 border-r-2">
          <div className="w-full pb-5">
            <span
              className="text-sm font-medium me-2 px-14 py-1.5 rounded bg-gray-700 text-gray-300 cursor-pointer"
              onClick={() => openSidebar()}
            >
              <i className="bi bi-pencil-square mr-3"></i>
              New table
            </span>
          </div>
          <span className="text-sm font-medium p-2 pb-4 w-full text-gray-300">
            Tables{" "}
            <span className="text-sm text-gray-300">
              ({tableQueries?.length}):
            </span>
          </span>
          <ul className="font-medium">
            {tableQueries?.map((table: any) => {
              return (
                <li key={table?.id}>
                  <a
                    href={`?tableId=${table?.id}&tableName=${table?.name}`}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <i className="bi bi-table"></i>
                    <span className="ms-3">{table?.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <div className="sm:ml-64 dark:bg-gray-800 overflow-x-auto min-h-screen">
        <TablesData data={data} tableColumnsData={tableColumnsData} />
      </div>
    </div>
  );
};

export default TablesList;
