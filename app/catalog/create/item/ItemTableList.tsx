import { MdOutlineMoreHoriz } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

export default function ItemTableList() {
  return (
    <div className="overflow-x-auto">
      <div className="table-fixed min-w-full inline-block align-middle">
        <div className="overflow-hidden min-w-[700px]">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/30">
            <thead>
              <tr className="text-slate-900 *:font-semibold dark:text-slate-100 uppercase">
                <th scope="col" className="px-2 py-3 text-start text-xs">
                  Title & Description
                </th>
                <th scope="col" className="px-2 py-3 text-start text-xs">
                  Tags
                </th>
                <th scope="col" className="px-2 py-3 text-start text-xs">
                  Likes & Comm..
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
                  <td className="px-2 py-3  text-sm truncate ">
                    <div className="flex flex-row items-center space-x-2">
                      <div className="flex items-center h-full mr-1">
                        <span className="rounded-full bg-slate-200 dark:bg-slate-700 size-8"></span>
                      </div>
                      <div>
                        <span className="dark:font-medium text-slate-400">
                          John doe
                        </span>
                        <span className="block max-w-xs truncate">
                          New York No. 1 Lake Park Lorem.
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-3  text-sm">
                    <div className="flex flex-row space-x-2">
                      <span>#Game</span>
                      <span>#Education</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-sm">43 / 17</td>
                  <td className="px-2 py-3 text-sm">12.13.2010</td>
                  <td className="px-2 py-3 text-end text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MdOutlineMoreHoriz className="size-5 dark:text-sky-800 dark:group-hover:text-sky-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-0 rounded bg-slate-50 text-slate-600 dark:text-slate-400 dark:bg-slate-800/30 backdrop-blur border-2 border-slate-900/10  dark:border-slate-50/[0.06]">
                        <DropdownMenuItem className="flex flex-row items-center rounded-none cursor-pointer dark:hover:bg-slate-500/20">
                          <MdModeEditOutline className="size-4 mr-2" />
                          <span className="font-medium">Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-row items-center rounded-none cursor-pointer dark:hover:bg-slate-500/20">
                          <MdDelete className="size-4 mr-2" />
                          <span className="font-medium">Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
