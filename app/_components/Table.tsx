import React from "react";

import useMetadataStore from "@/zustand/metadata";

const Table = () => {
  const table = useMetadataStore((store) => store.table);
  const addColumn = useMetadataStore((store) => store.addColumn);
  const deleteColumn = useMetadataStore((store) => store.deleteColumn);
  const updateColumn = useMetadataStore((store) => store.updateColumn);

  const handleNameChange = (id: number, newName: string) => {
    updateColumn(id, { name: newName });
  };

  const handleTypeChange = (id: number, newType: string) => {
    updateColumn(id, { type: newType });
  };

  const handleToggleChange = (id: number) => {
    updateColumn(id, {
      primary: !table.schema.find((column) => column.column_id === id)?.primary,
    });
  };

  const handleDefaultValueChange = (id: number, newDefaultValue: string) => {
    updateColumn(id, { default_value: newDefaultValue });
  };

  return (
    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Type
              </th>
              <th scope="col" className="px-4 py-3">
                Default value
              </th>
              <th scope="col" className="px-4 py-3">
                Primary
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Settings</span>
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {table.schema.map((column, index) => {
              return (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <input
                      type="text"
                      id="name"
                      value={column.name}
                      onChange={(e) =>
                        handleNameChange(column.column_id, e.target.value)
                      }
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-400 placeholder-gray-400 text-white focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex w-24">
                      <select
                        id="states"
                        value={column.type}
                        onChange={(e) =>
                          handleTypeChange(column.column_id, e.target.value)
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" disabled>
                          Type
                        </option>
                        <option value="string">string</option>
                        <option value="boolean">boolean</option>
                        <option value="integer">integer</option>
                        <option value="bigInteger">bigInteger</option>
                        <option value="rte">rte</option>
                        <option value="date">date</option>
                        <option value="timestamptz">timestamptz</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      id="defaultValue"
                      value={column.default_value}
                      onChange={(e) =>
                        handleDefaultValueChange(
                          column.column_id,
                          e.target.value
                        )
                      }
                      placeholder="optional"
                      className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-400 placeholder-gray-400 text-white focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                      disabled={index === 0}
                      readOnly={index === 1}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={column.primary}
                        onChange={() => handleToggleChange(column.column_id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    {index !== 0 && index !== 1 && (
                      <i
                        className="bi bi-x text-xl cursor-pointer"
                        onClick={() => deleteColumn(column.column_id)}
                      ></i>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="border focus:outline-none font-medium rounded-lg text-sm px-5 py-1 mb-4 mt-4 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600"
          onClick={() =>
            addColumn({
              name: "",
              type: "",
              default_value: "",
              primary: false,
            })
          }
        >
          Add column
        </button>
      </div>
    </div>
  );
};

export default Table;
