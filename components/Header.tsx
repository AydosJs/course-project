import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="sticky z-50 px-4 top-0 border-b backdrop-blur dark:border-slate-50/[0.06] dark:bg-slate-900/75 supports-backdrop-blur:bg-white/95 ">
      <div className="container max-w-7xl flex flex-row justify-between items-center py-5">
        <div>
          <h1 className="text-md font-normal text-sky-500">Aydos Sankibaev</h1>
        </div>
        <div className="">
          <div className="flex flex-row items-center">
            <span className="cursor-pointer text-slate-400 hover:text-slate-100">
              <FaUserCircle className="size-6" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
