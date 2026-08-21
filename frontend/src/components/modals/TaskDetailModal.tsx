"use client";

import React, { useState } from "react";
import { useKanban } from "@/context/KanbanContext";
import { Check, MoreVertical, ChevronDown } from "lucide-react";

export function TaskDetailModal() {
  const { activeTask, activeBoard, activeModal, closeModal, openModal, toggleSubtask, updateTask } = useKanban();
  const [menuOpen, setMenuOpen] = useState(false);

  if (activeModal !== "VIEW_TASK" || !activeTask || !activeBoard) return null;

  const completedCount = activeTask.subtasks.filter((s) => s.isCompleted).length;
  const totalCount = activeTask.subtasks.length;
  const currentColumn = activeBoard.columns.find((c) => c.id === activeTask.columnId) || activeBoard.columns[0];

  const handleStatusChange = async (colId: string) => {
    const newCol = activeBoard.columns.find((c) => c.id === colId);
    if (!newCol) return;
    await updateTask(activeTask.id, {
      title: activeTask.title,
      description: activeTask.description,
      columnId: colId,
      status: newCol.name,
      subtasks: activeTask.subtasks,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={closeModal} />

      <div className="relative w-full max-w-[480px] bg-light-card dark:bg-dark-card rounded-lg p-6 md:p-8 shadow-modal border border-light-lines dark:border-dark-lines z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h2 className="text-[18px] font-bold text-light-text dark:text-dark-text leading-snug">
            {activeTask.title}
          </h2>

          <div className="relative shrink-0">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-1 text-dark-subtext hover:text-light-text dark:hover:text-dark-text rounded transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-8 w-[160px] bg-light-card dark:bg-dark-bg rounded-lg shadow-modal border border-light-lines dark:border-dark-lines p-4 flex flex-col gap-3 z-30">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      openModal("EDIT_TASK");
                    }}
                    className="text-left text-[14px] text-dark-subtext hover:text-light-text dark:hover:text-dark-text font-medium"
                  >
                    Edit Task
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      openModal("DELETE_TASK");
                    }}
                    className="text-left text-[14px] text-destructive hover:text-destructive-hover font-medium"
                  >
                    Delete Task
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {activeTask.description ? (
          <p className="text-[13px] text-dark-subtext leading-relaxed mb-6 whitespace-pre-wrap">
            {activeTask.description}
          </p>
        ) : (
          <p className="text-[13px] text-dark-subtext italic mb-6">
            No description provided.
          </p>
        )}

        <div className="mb-6">
          <h3 className="text-[12px] font-bold text-dark-subtext mb-4">
            Subtasks ({completedCount} of {totalCount})
          </h3>

          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {activeTask.subtasks.map((st) => (
              <label
                key={st.id}
                onClick={() => toggleSubtask(st.id, !st.isCompleted)}
                className={"flex items-center gap-4 p-3 rounded bg-light-bg dark:bg-dark-bg hover:bg-primary/10 dark:hover:bg-primary/20 cursor-pointer transition-colors " + (
                  st.isCompleted ? "opacity-75" : ""
                )}
              >
                <div
                  className={"w-4 h-4 rounded-[2px] flex items-center justify-center border transition-colors " + (
                    st.isCompleted
                      ? "bg-primary border-primary text-white"
                      : "border-light-lines dark:border-dark-lines bg-light-card dark:bg-dark-card"
                  )}
                >
                  {st.isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span
                  className={"text-[12px] font-bold select-none transition-colors " + (
                    st.isCompleted
                      ? "line-through text-dark-subtext"
                      : "text-light-text dark:text-dark-text"
                  )}
                >
                  {st.title}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-bold text-dark-subtext mb-2">
            Current Status
          </label>
          <div className="relative">
            <select
              value={currentColumn?.id}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full h-[40px] px-4 rounded border border-light-lines dark:border-dark-lines bg-transparent text-[13px] font-medium text-light-text dark:text-dark-text appearance-none cursor-pointer focus:outline-none focus:border-primary pr-10"
            >
              {activeBoard.columns.map((col) => (
                <option
                  key={col.id}
                  value={col.id}
                  className="bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text"
                >
                  {col.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-primary absolute right-4 top-3 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
