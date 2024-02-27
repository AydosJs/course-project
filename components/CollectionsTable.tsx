import React from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";

export default function CollectionsTable() {
  return (
    <table className="table-fixed min-w-[700px] w-full">
      <thead className="bg-slate-700/50">
        <tr className="text-sm">
          <th className="text-center p-4 font-normal w-10">Img</th>
          <th className="text-left p-4 font-normal">Name</th>
          <th className="text-left p-4 font-normal">Description</th>
          <th className="text-left p-4 font-normal">Topic</th>
          <th className="text-left p-4 font-normal">Published</th>
          <th className="text-left p-4 font-normal w-auto">&</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700">
        {new Array(10).fill(" ").map((i, index) => (
          <tr
            className="text-sm cursor-pointer hover:bg-slate-800 hover:text-slate-200 text-slate-500"
            key={index}
          >
            <td className="text-left p-2 font-normal">
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
            <td className="text-left p-2 font-normal">
              <MdOutlineMoreHoriz className="size-4" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
