import { MdOutlineMoreHoriz } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Pencil, Trash2 } from "lucide-react";

export default function ItemTableList() {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full table-fixed align-middle">
        <div className="min-w-[700px] overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/30">
            <thead>
              <tr className="uppercase text-slate-900 *:font-semibold dark:text-slate-100">
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
                  className="group cursor-pointer text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                  <td className="truncate px-2  py-3 text-sm ">
                    <div className="flex flex-row items-center space-x-2">
                      <div className="mr-1 flex h-full items-center">
                        <span className="size-8 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                      </div>
                      <div>
                        <span className="text-slate-400 dark:font-medium">
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
                      <DropdownMenuContent className="rounded border-2 border-slate-900/10 bg-slate-50 p-0 text-slate-600 backdrop-blur dark:border-slate-50/[0.06] dark:bg-slate-800/30  dark:text-slate-400">
                        <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none dark:hover:bg-slate-500/20">
                          <Pencil className="mr-2 size-4" />
                          <span className="font-medium">{t("edit")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none dark:hover:bg-slate-500/20">
                          <Trash2 className="mr-2 size-4" />
                          <span className="font-medium">{t("delete")}</span>
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
