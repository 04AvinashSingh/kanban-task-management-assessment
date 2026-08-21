"use client";

import React from "react";
import { useKanban } from "@/context/KanbanContext";
import { useTheme } from "@/context/ThemeContext";
import { LayoutDashboard, Sun, Moon, EyeOff } from "lucide-react";

export function Sidebar() {
  const { boards, activeBoard, setActiveBoardId, openModal, sidebarOpen, toggleSidebar } = useKanban();
  const { theme, toggleTheme } = useTheme();

  if (!sidebarOpen) return null;

  return (
    <aside className="hidden md:flex flex-col w-[260px] lg:w-[300px] bg-light-card dark:bg-dark-card border-r border-light-lines dark:border-dark-lines h-screen justify-between shrink-0 transition-colors duration-200 z-30">
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="h-[96px] flex items-center px-6 lg:px-8 border-b border-transparent">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-[3.5px]">
              <div className="w-[6px] h-[25px] bg-primary rounded-[2px]" />
              <div className="w-[6px] h-[25px] bg-primary/75 rounded-[2px]" />
              <div className="w-[6px] h-[25px] bg-primary/50 rounded-[2px]" />
            </div>
            <span className="text-[28px] font-black tracking-tight text-light-text dark:text-dark-text">
              kanban
            </span>
          </div>
        </div>

        <div className="px-6 lg:px-8 pt-4 pb-3">
          <span className="text-[12px] font-bold text-dark-subtext tracking-[2.4px] uppercase">
            ALL BOARDS ({boards.length})
          </span>
        </div>

        <div className="flex-1 overflow-y-auto pr-6 space-y-1">
          {boards.map((board) => {
            const isActive = activeBoard?.id === board.id;
            return (
              <button
                key={board.id}
                onClick={() => setActiveBoardId(board.id)}
                className={"w-full flex items-center gap-3 lg:gap-4 px-6 lg:px-8 py-3.5 rounded-r-full font-bold text-[15px] transition-all duration-150 " + (
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-dark-subtext hover:bg-primary/10 hover:text-primary dark:hover:bg-white dark:hover:text-primary"
                )}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span className="truncate">{board.name}</span>
              </button>
            );
          })}

          <button
            onClick={() => openModal("ADD_BOARD")}
            className="w-full flex items-center gap-3 lg:gap-4 px-6 lg:px-8 py-3.5 rounded-r-full font-bold text-[15px] text-primary hover:bg-primary/10 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 shrink-0 text-primary" />
            <span className="flex items-center gap-1">+ Create New Board</span>
          </button>
        </div>
      </div>

      <div className="p-4 lg:p-6 space-y-3">
        <div className="h-[48px] bg-light-bg dark:bg-dark-bg rounded-md flex items-center justify-center gap-6 transition-colors">
          <Sun className={"w-5 h-5 " + (theme === "light" ? "text-primary" : "text-dark-subtext")} />
          <button
            onClick={toggleTheme}
            className="w-[40px] h-[20px] bg-primary rounded-full relative p-[3px] transition-colors focus:outline-none"
            title="Toggle theme"
          >
            <div
              className={"w-[14px] h-[14px] bg-white rounded-full transition-transform duration-200 " + (
                theme === "dark" ? "translate-x-[20px]" : "translate-x-0"
              )}
            />
          </button>
          <Moon className={"w-5 h-5 " + (theme === "dark" ? "text-primary" : "text-dark-subtext")} />
        </div>

        <button
          onClick={toggleSidebar}
          className="w-full flex items-center gap-3 lg:gap-4 py-3 px-2 font-bold text-[15px] text-dark-subtext hover:bg-primary/10 hover:text-primary dark:hover:bg-white dark:hover:text-primary rounded-r-full transition-colors"
        >
          <EyeOff className="w-5 h-5 shrink-0" />
          <span>Hide Sidebar</span>
        </button>
      </div>
    </aside>
  );
}
