import CatalogCard from "./CatalogCard";
import CatalogItem from "./CatalogItem";

export default function page({
  params,
}: {
  params: {
    catalogId: string;
  };
}) {
  return (
    <div className="p-4">
      <div className="container max-w-7xl my-10">
        <div className="flex flex-col lg:flex-row lg:space-y-0 lg:space-x-6">
          <div className="lg:max-w-sm w-full rounded flex flex-col space-y-4">
            <CatalogCard />
          </div>
          <div className="mt-20 lg:mt-0 w-full h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <CatalogItem />
            <CatalogItem />
            <CatalogItem />
            <CatalogItem />
          </div>
        </div>
      </div>
    </div>
  );
}
