import CollectionsTable from "@/components/CollectionsTable";
import Button from "@/components/form-elements/Button";
import Input from "@/components/form-elements/Input";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";

export default function page() {
  return (
    <div className="container my-10 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 max-w-7xl">
      <div className=" w-full lg:max-w-sm  h-fit flex flex-col space-y-6 border bg-slate-50 border-slate-900/10  dark:border-slate-50/[0.06] rounded-lg p-6 dark:bg-slate-800/50">
        <h1 className="text-lg text-slate-900 font-medium dark:text-slate-200">
          Profile
        </h1>

        <div className="w-full flex justify-center">
          <div className="size-32 flex items-center justify-center bg-sky-500 rounded-full border-4 border-sky-300 cursor-pointer relative">
            <span className="text-3xl">J</span>
            {/* <MdPhotoCamera className="size-8 text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> */}
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Input
            className="!py-3"
            label="Full name"
            value={"John Doe"}
            disabled
          />
          <Input
            className="!py-3"
            label="Email"
            value={"johndoe@me.com"}
            disabled
          />
          <Button className="!mt-6">Update</Button>
        </div>
      </div>
      <div className="w-full  flex flex-col border bg-slate-50  border-slate-900/10  dark:border-slate-50/[0.06] rounded-lg p-6 dark:bg-slate-800/50">
        <div className="mb-4  flex flex-row  items-center justify-between">
          <h1 className="text-lg text-slate-900 font-medium dark:text-slate-200">
            Collection list
          </h1>

          <div>
            <Link href={"/catalog/create"}>
              <Button className="text-sm p-1.5 px-2 border-none opacity-70 transition-all duration-300 hover:opacity-100">
                <IoIosAddCircle className="size-4 mr-1" />
                CREATE
              </Button>
            </Link>
          </div>
        </div>
        <div className="overflow-hidden overflow-x-auto w-full">
          <CollectionsTable />
        </div>
      </div>
    </div>
  );
}
