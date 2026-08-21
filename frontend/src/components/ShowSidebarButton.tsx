"use client";

import React from "react";
import { useKanban } from "@/context/KanbanContext";
import { PanelLeftOpen } from "lucide-react";

export function ShowSidebarButton() {
  const { sidebarOpen, toggleSidebar } = useKanban();

  if (sidebarOpen) return null;

  return (
    <button
      onClick={toggleSidebar}
      className="hidden md:flex fixed left-4 bottom-6 z-30 bg-light-card dark:bg-dark-card hover:bg-light-surface dark:hover:bg-dark-hover text-light-text dark:text-dark-text border border-light-lines dark:border-dark-lines h-[42px] px-3.5 rounded-full items-center gap-2 shadow-lg transition-all duration-200 group text-xs font-semibold"
      title="Open Sidebar"
    >
      <PanelLeftOpen className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
      <span>Boards</span>
    </button>
  );
}
