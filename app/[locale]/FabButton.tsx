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
          <TooltipTrigger>
            <Link href="/collection/create">
              <Button className="group size-12 rounded-full bg-sky-500 p-1 shadow hover:bg-sky-600 dark:text-sky-50">
                <Plus className="size-6 transition-all duration-300 group-hover:rotate-90" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("create_collection")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
