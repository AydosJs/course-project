"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function FabButton() {
  const { t } = useTranslation();
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <TooltipProvider>
        <Tooltip>
          <Link href="/collection/create">
            <TooltipTrigger>
              <span className="group flex size-12 items-center justify-center rounded-full bg-sky-500 p-1 text-sky-50 shadow hover:bg-sky-600">
                <Plus className="size-6 transition-all duration-300 group-hover:rotate-90" />
              </span>
            </TooltipTrigger>
          </Link>
          <TooltipContent>
            <p>{t("create_collection")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
