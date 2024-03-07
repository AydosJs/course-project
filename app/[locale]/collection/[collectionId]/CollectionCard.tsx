import dayjs from "dayjs";

export default function CollectionCard({
  topic,
  description,
  publishedAt,
  itemLength,
  name,
  cover,
}: any) {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="h-44 w-full rounded bg-slate-100 bg-cover bg-center bg-no-repeat dark:bg-slate-800 md:h-60"
      ></div>

      <div className="flex w-full flex-row justify-between">
        {/* <p className=" flex flex-col py-2 text-slate-800 dark:text-slate-100">
          <span className="text-sm font-normal text-slate-400 dark:text-slate-500">
            Author
          </span>
          John doe
        </p> */}
        <p className="flex flex-col py-2 text-slate-800 dark:text-slate-100">
          <span className="text-sm font-normal text-slate-400 dark:text-slate-500">
            Topic
          </span>
          {topic}
        </p>
        <p className="flex flex-col py-2 text-slate-800 dark:text-slate-100">
          <span className="text-sm font-normal text-slate-400 dark:text-slate-500">
            Items
          </span>
          {itemLength}
        </p>
        <p className="flex flex-col py-2 text-slate-800 dark:text-slate-100">
          <span className="text-sm font-normal text-slate-400 dark:text-slate-500">
            Published
          </span>
          {dayjs(publishedAt).format("MMM D, YYYY	")}
        </p>
      </div>

      <div>
        <h1 className="mb-2 text-2xl text-slate-800 dark:text-slate-100">
          {name}
        </h1>
        <p className="text-md text-slate-800 dark:text-slate-500">
          {description}
        </p>
      </div>
    </>
  );
}
