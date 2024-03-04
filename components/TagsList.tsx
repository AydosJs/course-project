"use client";

import { useTranslation } from "react-i18next";

export default function TagsList() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className=" mb-8 text-2xl dark:text-slate-400 text-slate-900 font-medium">
        {t("common_tags")}
      </h1>

      <div className="flex flex-wrap gap-2">
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #Education
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #Technology
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #SpaceExploration
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #Coding
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #ArtificialIntelligence
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #Healthcare
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #Innovation
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #Environment
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #MachineLearning
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #Science
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #Nature
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #Design
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #SpaceTravel
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #Programming
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #DigitalArt
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #Robotics
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #Astronomy
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #Engineering
        </div>
        <div className="dark:hover:bg-slate-800 dark:hover:border-slate-700 dark:border-slate-800 dark:bg-slate-800/50 border-2 bg-slate-50 hover:border-slate-200 hover:bg-slate-100 cursor-pointer p-3 w-fit px-5 text-sky-500 rounded-full">
          #DataScience
        </div>
      </div>
    </div>
  );
}
