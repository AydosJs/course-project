import CollectionsTable from "@/components/CollectionsTable";
import Button from "@/components/form-elements/Button";
import Input from "@/components/form-elements/Input";
import { MdPhotoCamera } from "react-icons/md";

export default function page() {
  return (
    <div className="container flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 max-w-7xl">
      <div className=" w-full lg:max-w-sm  h-fit flex flex-col space-y-6 border-2 dark:border-slate-50/[0.06] rounded-lg p-6 bg-slate-800/50">
        <div className="w-full flex justify-center">
          <div className="size-32 bg-slate-600 rounded-full border-4 border-slate-400 cursor-pointer relative">
            <MdPhotoCamera className="size-8 text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
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
      <div className="w-full  flex flex-col border-2 dark:border-slate-50/[0.06] rounded-lg p-6 bg-slate-800/50">
        <h1 className="mb-4 text-lg dark:text-slate-200">Catalogs</h1>
        <div className=" overflow-hidden overflow-x-auto">
          <CollectionsTable />
        </div>
      </div>
    </div>
  );
}
