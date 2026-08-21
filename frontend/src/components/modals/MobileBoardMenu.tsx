"use client";

import React from "react";
import { useKanban } from "@/context/KanbanContext";
import { useTheme } from "@/context/ThemeContext";
import { LayoutDashboard, Sun, Moon } from "lucide-react";

export function MobileBoardMenu() {
  const { boards, activeBoard, setActiveBoardId, activeModal, closeModal, openModal } = useKanban();
  const { theme, toggleTheme } = useTheme();

  if (activeModal !== "MOBILE_MENU") return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-center pt-20 px-6">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

      <div className="relative w-full max-w-[300px] bg-light-card dark:bg-dark-card rounded-lg shadow-modal border border-light-lines dark:border-dark-lines py-4 z-10 max-h-[80vh] flex flex-col justify-between animate-in fade-in zoom-in-95 duration-150">
        <div>
          <div className="px-6 py-2">
            <span className="text-[12px] font-bold text-dark-subtext tracking-[2.4px] uppercase">
              ALL BOARDS ({boards.length})
            </span>
          </div>

          <div className="space-y-1 my-2 max-h-[220px] overflow-y-auto pr-4">
            {boards.map((b) => {
              const isActive = activeBoard?.id === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    setActiveBoardId(b.id);
                    closeModal();
                  }}
                  className={"w-full flex items-center gap-3 px-6 py-3 rounded-r-full font-bold text-[14px] transition-colors " + (
                    isActive
                      ? "bg-primary text-white"
                      : "text-dark-subtext hover:text-primary hover:bg-primary/10"
                  )}
                >
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  <span className="truncate">{b.name}</span>
                </button>
              );
            })}

            <button
              onClick={() => {
                closeModal();
                openModal("ADD_BOARD");
              }}
              className="w-full flex items-center gap-3 px-6 py-3 rounded-r-full font-bold text-[14px] text-primary hover:bg-primary/10 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>+ Create New Board</span>
            </button>
          </div>
        </div>

        <div className="px-4 pt-4">
          <div className="h-[44px] bg-light-bg dark:bg-dark-bg rounded-md flex items-center justify-center gap-6">
            <Sun className={"w-4 h-4 " + (theme === "light" ? "text-primary" : "text-dark-subtext")} />
            <button
              onClick={toggleTheme}
              className="w-[40px] h-[20px] bg-primary rounded-full relative p-[3px]"
            >
              <div
                className={"w-[14px] h-[14px] bg-white rounded-full transition-transform duration-200 " + (
                  theme === "dark" ? "translate-x-[20px]" : "translate-x-0"
                )}
              />
            </button>
            <Moon className={"w-4 h-4 " + (theme === "dark" ? "text-primary" : "text-dark-subtext")} />
          </div>
        </div>
      </div>
    </div>
  );
}
