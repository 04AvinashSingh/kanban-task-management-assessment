"use client";

import React from "react";
import { useKanban } from "@/context/KanbanContext";
import { Column } from "./Column";
import { Plus } from "lucide-react";

export function BoardView() {
  const { activeBoard, openModal } = useKanban();

  if (!activeBoard) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <p className="text-dark-subtext font-bold text-[18px]">
            No board selected. Create a new board to get started.
          </p>
          <button
            onClick={() => openModal("ADD_BOARD")}
            className="bg-primary hover:bg-primary-hover text-white font-bold text-[15px] h-[48px] px-6 rounded-full transition-all shadow-md active:scale-95"
          >
            + Create New Board
          </button>
        </div>
      </div>
    );
  }

  const columns = activeBoard.columns || [];

  if (columns.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <p className="text-dark-subtext font-bold text-[18px]">
            This board is empty. Create a new column to get started.
          </p>
          <button
            onClick={() => openModal("EDIT_BOARD")}
            className="bg-primary hover:bg-primary-hover text-white font-bold text-[15px] h-[48px] px-6 rounded-full transition-all shadow-md active:scale-95"
          >
            + Add New Column
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-x-auto overflow-y-auto p-4 md:p-6 lg:p-8 flex gap-6 items-start">
      {columns.map((col) => (
        <Column key={col.id} column={col} />
      ))}

      <div className="w-[280px] shrink-0 pt-10 pb-8">
        <button
          onClick={() => openModal("EDIT_BOARD")}
          className="w-full h-[500px] rounded-lg bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA]/50 dark:from-[#2B2C37]/80 dark:to-[#2B2C37]/20 hover:from-primary/10 hover:to-primary/5 dark:hover:from-primary/20 dark:hover:to-primary/10 border-2 border-dashed border-light-lines dark:border-dark-lines flex items-center justify-center text-dark-subtext hover:text-primary font-bold text-[24px] transition-all duration-200 group"
          title="Add New Column to Board"
        >
          <span className="flex items-center gap-2 group-hover:scale-105 transition-transform">
            <Plus className="w-6 h-6 stroke-[3]" />
            New Column
          </span>
        </button>
      </div>
    </div>
  );
}
