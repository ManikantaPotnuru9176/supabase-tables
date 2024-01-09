import React, { useState } from "react";

const Table = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
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
            <tr className="border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple iMac 27&#34;
              </th>
              <td className="px-4 py-3">PC</td>
              <td className="px-4 py-3">Apple</td>
              <td className="px-4 py-3">300</td>
              <td className="px-4 py-3 flex items-center justify-end">
                <button
                  id="apple-imac-27-dropdown-button"
                  data-dropdown-toggle="apple-imac-27-dropdown"
                  className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                  type="button"
                  onClick={toggleDropdown}
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
                <div
                  id="apple-imac-27-dropdown"
                  className={`${
                    isDropdownOpen ? "block" : "hidden"
                  } z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="apple-imac-27-dropdown-button"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Show
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">$2999</td>
            </tr>
            <tr className="border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple iMac 27&#34;
              </th>
              <td className="px-4 py-3">PC</td>
              <td className="px-4 py-3">Apple</td>
              <td className="px-4 py-3">300</td>
              <td className="px-4 py-3 flex items-center justify-end">
                <button
                  id="apple-imac-27-dropdown-button"
                  data-dropdown-toggle="apple-imac-27-dropdown"
                  className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                  type="button"
                  onClick={toggleDropdown}
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
                <div
                  id="apple-imac-27-dropdown"
                  className={`${
                    isDropdownOpen ? "block" : "hidden"
                  } z-50 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="apple-imac-27-dropdown-button"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Show
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">$2999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
