import Badge from "@/components/Badge";
import Input from "@/components/form-elements/Input";

export default function Home() {
  return (
    <main className="px-4 my-10 min-h-[calc(100vh-108px)] flex flex-col items-center justify-between lg:p-24">
      <div className="w-full flex items-center justify-center">
        <div className="lg:max-w-2xl lg:focus-within:max-w-3xl transition-all duration-300 w-full">
          <Input
            className="w-full rounded-full !p-4"
            placeholder="Search catalogs..."
          />

          <div className="flex flex-row gap-1 flex-wrap mt-3">
            <Badge title="Game" />
            <Badge title="Book collection" />
            <Badge title="Coins" />
            <Badge title="Music album" />
          </div>
        </div>
      </div>
    </main>
  );
}
