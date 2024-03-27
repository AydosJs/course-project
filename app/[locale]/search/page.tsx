import React from "react";
import prisma from "@/lib/prisma";
import SearchComponent from "./SearchComponent";

async function getAllTags(): Promise<Tags[]> {
  const tags = await prisma.tags.findMany();
  return tags || [];
}
export default async function page() {
  const allTags = await getAllTags();

  return (
    <div>
      <SearchComponent allTags={allTags || []} />
    </div>
  );
}
