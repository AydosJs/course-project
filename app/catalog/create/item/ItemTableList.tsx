import { MdOutlineMoreHoriz } from "react-icons/md";

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
                        <span className="font-medium text-slate-400">
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
                    <MdOutlineMoreHoriz className="size-5 dark:text-sky-800 dark:group-hover:text-sky-500" />
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
