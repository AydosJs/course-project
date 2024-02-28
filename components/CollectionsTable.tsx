import React from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";

export default function CollectionsTable() {
  return (
    <div className="overflow-x-auto">
      <div className="table-fixed min-w-full inline-block align-middle">
        <div className="overflow-hidden min-w-[700px]">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/30">
            <thead>
              <tr className="text-slate-900 *:font-semibold dark:text-slate-100 uppercase">
                <th scope="col" className="px-2 py-3 text-start text-xs">
                  Name
                </th>
                <th scope="col" className="px-2 py-3 text-start text-xs">
                  Description
                </th>
                <th scope="col" className="px-2 py-3 text-start text-xs">
                  Topic
                </th>
                <th scope="col" className="px-2 py-3 text-start text-xs">
                  Published
                </th>
                <th scope="col" className="px-2 py-3 text-end text-xs">
                  <span className="mr-1">&</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y  divide-slate-200 dark:divide-slate-700/30">
              {new Array(10).fill(" ").map((i, index) => (
                <tr
                  key={index}
                  className="text-sm group cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 hover:text-slate-900 text-slate-500"
                >
                  <td className="px-2 py-4  text-sm ">
                    <div className="flex flex-row items-center space-x-2">
                      <div className="flex items-center h-full">
                        <span className="rounded-full bg-slate-200 dark:bg-slate-700 size-5"></span>
                      </div>
                      <span>John doe</span>
                    </div>
                  </td>
                  <td className="px-2 py-4  text-sm">
                    New York No. 1 Lake Park lorem20
                  </td>
                  <td className="px-2 py-4 text-sm">Game</td>
                  <td className="px-2 py-4 text-sm">12.13.2010</td>
                  <td className="px-2 py-4 text-end text-sm font-medium flex justify-end">
                    <MdOutlineMoreHoriz className="size-5 dark:text-sky-800 dark:group-hover:text-sky-500" />
                  </td>
                </tr>
              ))}
            </tbody>

            {/* {new Array(10).fill(" ").map((i, index) => (
                          <tr
                            className="text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 hover:text-slate-900 text-slate-500"
                            key={index}
                          >
                            <td className="text-left p-2 font-normal w-auto">
                              <div className="flex items-center justify-center h-full">
                                <span className="rounded-full bg-slate-600 size-4"></span>
                              </div>
                            </td>
                            <td className="text-left p-2 font-normal">Malcolm Lockyer</td>
                            <td className="text-left p-2 font-normal">
                              The Sliding Mr. Bones (Next Stop, Pottersville)
                            </td>
                            <td className="text-left p-2 font-normal">Game</td>
                            <td className="text-left p-2 font-normal">13.12.2012</td>
                            <td className="text-left p-2 font-normal w-auto">
                              <MdOutlineMoreHoriz className="size-4" />
                            </td>
                          </tr>
                        ))} */}
          </table>
        </div>
      </div>
    </div>
  );
}
