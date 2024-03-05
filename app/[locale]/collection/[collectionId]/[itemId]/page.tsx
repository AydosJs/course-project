import CommentItem from "@/components/CommentItem";
import Button from "@/components/form-elements/Button";
import { FaRegCalendarAlt, FaRegHeart } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdOutlineTopic } from "react-icons/md";

export default function page() {
  return (
    <div className="container my-10 w-full max-w-7xl">
      <div className="mx-auto flex w-full max-w-2xl flex-col">
        <div className="h-56 w-full rounded bg-slate-100 bg-[url('https://images.pexels.com/photos/259165/pexels-photo-259165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center bg-no-repeat dark:bg-slate-800 sm:h-80"></div>

        <div className="mt-6 flex flex-col-reverse justify-between space-x-2 sm:flex-row sm:items-center">
          <div className="flex flex-row items-center space-x-8">
            <div className=" flex cursor-pointer flex-row items-center truncate rounded-full border-sky-500/30 text-sky-500 transition-all duration-300 hover:border-sky-500 dark:hover:text-sky-400">
              <MdDriveFileRenameOutline className="mr-2 size-5" />
              Museum
            </div>
            <div className=" flex cursor-pointer flex-row items-center truncate rounded-full border-sky-500/30 text-sky-500 transition-all duration-300 hover:border-sky-500 dark:hover:text-sky-400">
              <MdOutlineTopic className="mr-2 size-5" />
              Coins
            </div>
            <div className=" flex cursor-pointer flex-row items-center truncate rounded-full border-sky-500/30 text-sky-500 transition-all duration-300 hover:border-sky-500 dark:hover:text-sky-400">
              <FaRegCalendarAlt className="mr-2 size-4" />2 days
            </div>
          </div>
          <div className="mb-4 flex items-center justify-end sm:mb-0">
            <div className="flex w-fit cursor-pointer flex-row items-center truncate rounded-full border-2 border-sky-500/30 px-3 py-1.5 text-sky-500 transition-all duration-300 hover:border-sky-500 hover:bg-sky-500/10 dark:hover:text-sky-400">
              <FaRegHeart className="size-4.5 mr-2" />
              43
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <span className="cursor-pointer text-sm text-slate-400 transition-all duration-300 hover:text-slate-900 dark:text-slate-300  dark:hover:text-slate-100">
            #Ethereum
          </span>
          <span className="cursor-pointer text-sm text-slate-400 transition-all duration-300 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
            #Magic coin
          </span>
        </div>

        <h1 className="mt-2 text-xl text-slate-800 dark:text-slate-100">
          Magic Coin #04872
        </h1>

        <p className="text-md mt-2 text-slate-400 transition-all duration-300 dark:text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste modi
          deserunt non rem, sit cum aliquam eveniet id error laboriosam. Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Accusamus eveniet
          totam provident magnam temporibus, ratione cum facilis ipsam quia
          mollitia consequatur maiores quae dolores cupiditate. Maxime numquam
          fuga repudiandae recusandae!
          <br />
          <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
          consequuntur asperiores dolore quas dignissimos, necessitatibus hic et
          reprehenderit obcaecati voluptates tenetur, blanditiis distinctio!
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
          totam debitis tenetur iste facilis omnis quod delectus minus maiores
          commodi fugit officiis quasi ducimus iusto blanditiis eos possimus
          laborum dolorum, vel veritatis hic inventore. Ipsum itaque suscipit
          quaerat eius, architecto aspernatur nulla rerum facilis tempore
          libero, delectus eum et cupiditate.
        </p>

        <div className="!mt-12">
          <h1 className="text-md font-medium text-slate-800 dark:text-slate-100">
            13 Comments
          </h1>

          <div className="mt-4 flex flex-row space-x-3">
            <div>
              <span className="flex size-8 items-center justify-center rounded-full bg-sky-500 p-2">
                J
              </span>
            </div>
            <div className="flex w-full flex-col items-end space-y-2">
              <textarea
                className="text-md peer w-full rounded border-2 bg-slate-100 p-2 font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600 "
                name=""
                id=""
                rows={5}
                placeholder="Add a comment..."
              />
              <div className="opacity-50 peer-focus:opacity-100">
                <Button className="w-auto p-2 text-sm">Comment</Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col space-y-6">
            <CommentItem />
            <CommentItem />
            <CommentItem />
          </div>
        </div>
      </div>
    </div>
  );
}
