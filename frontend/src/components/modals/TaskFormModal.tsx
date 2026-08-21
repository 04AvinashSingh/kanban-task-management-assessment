"use client";

import React, { useState, useEffect } from "react";
import { useKanban } from "@/context/KanbanContext";
import { X, ChevronDown } from "lucide-react";

export function TaskFormModal() {
  const { activeModal, activeTask, activeBoard, closeModal, createTask, updateTask } = useKanban();

  const isEdit = activeModal === "EDIT_TASK";
  const isOpen = activeModal === "ADD_TASK" || activeModal === "EDIT_TASK";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState<{ id?: string; title: string; isCompleted?: boolean }[]>([
    { title: "" },
    { title: "" },
  ]);
  const [columnId, setColumnId] = useState("");
  const [errors, setErrors] = useState<{ title?: boolean }>({});

  useEffect(() => {
    if (isEdit && activeTask && activeBoard) {
      setTitle(activeTask.title);
      setDescription(activeTask.description || "");
      setSubtasks(
        activeTask.subtasks.length > 0
          ? activeTask.subtasks.map((s) => ({ id: s.id, title: s.title, isCompleted: s.isCompleted }))
          : [{ title: "" }]
      );
      setColumnId(activeTask.columnId || (activeBoard.columns[0]?.id ?? ""));
    } else if (activeBoard && activeBoard.columns.length > 0) {
      setTitle("");
      setDescription("");
      setSubtasks([{ title: "" }, { title: "" }]);
      setColumnId(activeBoard.columns[0].id);
    }
    setErrors({});
  }, [isEdit, activeTask, activeBoard, isOpen]);

  if (!isOpen || !activeBoard) return null;

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { title: "" }]);
  };

  const handleRemoveSubtask = (idx: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== idx));
  };

  const handleSubtaskChange = (idx: number, val: string) => {
    const updated = [...subtasks];
    updated[idx].title = val;
    setSubtasks(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrors({ title: true });
      return;
    }

    const selectedCol = activeBoard.columns.find((c) => c.id === columnId) || activeBoard.columns[0];

    if (isEdit && activeTask) {
      await updateTask(activeTask.id, {
        title: title.trim(),
        description: description.trim(),
        columnId: selectedCol.id,
        status: selectedCol.name,
        subtasks: subtasks.filter((s) => s.title.trim().length > 0),
      });
    } else {
      await createTask({
        title: title.trim(),
        description: description.trim(),
        columnId: selectedCol.id,
        status: selectedCol.name,
        subtasks: subtasks.map((s) => s.title).filter((t) => t.trim().length > 0),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

      <div className="relative w-full max-w-[480px] bg-light-card dark:bg-dark-card rounded-lg p-6 md:p-8 shadow-modal border border-light-lines dark:border-dark-lines z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        <h2 className="text-[18px] font-bold text-light-text dark:text-dark-text mb-6">
          {isEdit ? "Edit Task" : "Add New Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[12px] font-bold text-dark-subtext mb-2">
              Title
            </label>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors({});
                }}
                placeholder="e.g. Take coffee break"
                className={"w-full h-[40px] px-4 rounded border text-[13px] bg-transparent text-light-text dark:text-dark-text placeholder:text-dark-subtext/50 focus:outline-none " + (
                  errors.title
                    ? "border-destructive focus:border-destructive"
                    : "border-light-lines dark:border-dark-lines focus:border-primary"
                )}
              />
              {errors.title && (
                <span className="absolute right-3 top-2.5 text-[12px] font-bold text-destructive">
                  Can&apos;t be empty
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-dark-subtext mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. It is always good to take a break."
              className="w-full p-4 rounded border border-light-lines dark:border-dark-lines text-[13px] bg-transparent text-light-text dark:text-dark-text placeholder:text-dark-subtext/50 focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-dark-subtext mb-2">
              Subtasks
            </label>
            <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
              {subtasks.map((st, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={st.title}
                    onChange={(e) => handleSubtaskChange(idx, e.target.value)}
                    placeholder={idx === 0 ? "e.g. Make coffee" : "e.g. Drink coffee & smile"}
                    className="flex-1 h-[40px] px-4 rounded border border-light-lines dark:border-dark-lines text-[13px] bg-transparent text-light-text dark:text-dark-text placeholder:text-dark-subtext/50 focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(idx)}
                    className="text-dark-subtext hover:text-destructive transition-colors p-1"
                    title="Remove subtask"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddSubtask}
              className="w-full mt-3 h-[40px] rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-bold text-[13px] transition-colors"
            >
              + Add New Subtask
            </button>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-dark-subtext mb-2">
              Status
            </label>
            <div className="relative">
              <select
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
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

          <button
            type="submit"
            className="w-full h-[40px] rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-[13px] transition-all shadow-sm active:scale-95"
          >
            {isEdit ? "Save Changes" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
