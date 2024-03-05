import CommentItem from "@/components/CommentItem";
import Button from "@/components/form-elements/Button";

export default function page() {
  return (
    <div className="container max-w-7xl w-full my-10">
      <div className="w-full flex flex-col max-w-2xl mx-auto">
        <div className="w-full h-56 sm:h-80 bg-slate-100 dark:bg-slate-800 rounded bg-[url('https://images.pexels.com/photos/259165/pexels-photo-259165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center bg-no-repeat"></div>
        <div className="flex gap-4 mt-2">
          <span className="text-sm cursor-pointer dark:hover:text-slate-100 hover:text-slate-900 text-slate-400 transition-all duration-300  dark:text-slate-500">
            #Ethereum
          </span>
          <span className="text-sm cursor-pointer dark:hover:text-slate-100 hover:text-slate-900 text-slate-400 transition-all duration-300 dark:text-slate-500">
            #Magic coin
          </span>
        </div>

        <div className="flex flex-row space-x-4 mt-4">
          <div>
            <span className="cursor-pointer dark:hover:text-sky-600 text-sky-500 text-md font-medium">
              43 likes
            </span>
          </div>
          <div>
            <span className=" text-sky-500 text-md font-medium">2 days</span>
          </div>
        </div>

        <h1 className="text-xl text-slate-800 dark:text-slate-100 mt-4">
          Magic Coin #04872
        </h1>

        <p className="text-md mt-2 text-slate-400 dark:text-slate-400 transition-all duration-300">
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
          <h1 className="text-md text-slate-800 dark:text-slate-100 font-medium">
            13 Comments
          </h1>

          <div className="mt-4 flex flex-row space-x-3">
            <div>
              <span className="size-8 rounded-full bg-sky-500 flex items-center justify-center p-2">
                J
              </span>
            </div>
            <div className="w-full flex flex-col items-end space-y-2">
              <textarea
                className="w-full bg-slate-100 peer text-slate-900 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:placeholder:text-slate-500 placeholder:text-slate-400 font-medium p-2 border-2 outline-none dark:focus:border-slate-600 focus:border-slate-400 text-md rounded "
                name=""
                id=""
                rows={5}
                placeholder="Add a comment..."
              />
              <div className="opacity-50 peer-focus:opacity-100">
                <Button className="p-2 text-sm w-auto">Comment</Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-6 space-y-6">
            <CommentItem />
            <CommentItem />
            <CommentItem />
          </div>
        </div>
      </div>
    </div>
  );
}
