"use client";

import React from "react";
import { useKanban } from "@/context/KanbanContext";

export function DeleteModal() {
  const { activeModal, activeTask, activeBoard, closeModal, deleteTask, deleteBoard } = useKanban();

  const isDeleteTask = activeModal === "DELETE_TASK";
  const isDeleteBoard = activeModal === "DELETE_BOARD";

  if (!isDeleteTask && !isDeleteBoard) return null;

  const handleDelete = async () => {
    if (isDeleteTask && activeTask) {
      await deleteTask(activeTask.id);
    } else if (isDeleteBoard && activeBoard) {
      await deleteBoard(activeBoard.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

      <div className="relative w-full max-w-[480px] bg-light-card dark:bg-dark-card rounded-lg p-6 md:p-8 shadow-modal border border-light-lines dark:border-dark-lines z-10 animate-in fade-in zoom-in-95 duration-150">
        <h2 className="text-[18px] font-bold text-destructive mb-6">
          {isDeleteTask ? "Delete this task?" : "Delete this board?"}
        </h2>

        <p className="text-[13px] text-dark-subtext leading-relaxed mb-6">
          {isDeleteTask
            ? "Are you sure you want to delete the '" + (activeTask?.title || "") + "' task and its subtasks? This action cannot be reversed."
            : "Are you sure you want to delete the '" + (activeBoard?.name || "") + "' board? This action will remove all columns and tasks and cannot be reversed."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleDelete}
            className="flex-1 h-[40px] rounded-full bg-destructive hover:bg-destructive-hover text-white font-bold text-[13px] transition-colors"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="flex-1 h-[40px] rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-bold text-[13px] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
