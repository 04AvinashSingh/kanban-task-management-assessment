"use client";

import React, { useState, useEffect } from "react";
import { useKanban } from "@/context/KanbanContext";
import { X } from "lucide-react";

export function BoardFormModal() {
  const { activeModal, activeBoard, closeModal, createBoard, updateBoard } = useKanban();

  const isEdit = activeModal === "EDIT_BOARD";
  const isOpen = activeModal === "ADD_BOARD" || activeModal === "EDIT_BOARD";

  const [name, setName] = useState("");
  const [columns, setColumns] = useState<{ id?: string; name: string; color?: string }[]>([
    { name: "Todo", color: "#49C4E5" },
    { name: "Doing", color: "#8471F2" },
    { name: "Done", color: "#67E2AE" },
  ]);
  const [errors, setErrors] = useState<{ name?: boolean }>({});

  useEffect(() => {
    if (isEdit && activeBoard) {
      setName(activeBoard.name);
      setColumns(
        activeBoard.columns.length > 0
          ? activeBoard.columns.map((c) => ({ id: c.id, name: c.name, color: c.color }))
          : [
              { name: "Todo", color: "#49C4E5" },
              { name: "Doing", color: "#8471F2" },
              { name: "Done", color: "#67E2AE" },
            ]
      );
    } else {
      setName("");
      setColumns([
        { name: "Todo", color: "#49C4E5" },
        { name: "Doing", color: "#8471F2" },
        { name: "Done", color: "#67E2AE" },
      ]);
    }
    setErrors({});
  }, [isEdit, activeBoard, isOpen]);

  if (!isOpen) return null;

  const handleAddColumn = () => {
    const palette = ["#49C4E5", "#8471F2", "#67E2AE", "#E5A449", "#E549B8", "#49E5D2"];
    const nextColor = palette[columns.length % palette.length];
    setColumns([...columns, { name: "", color: nextColor }]);
  };

  const handleRemoveColumn = (idx: number) => {
    setColumns(columns.filter((_, i) => i !== idx));
  };

  const handleColumnChange = (idx: number, val: string) => {
    const updated = [...columns];
    updated[idx].name = val;
    setColumns(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrors({ name: true });
      return;
    }

    const filteredColumns = columns.filter((c) => c.name.trim().length > 0);

    if (isEdit && activeBoard) {
      await updateBoard(activeBoard.id, name.trim(), filteredColumns);
    } else {
      await createBoard(name.trim(), filteredColumns);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

      <div className="relative w-full max-w-[480px] bg-light-card dark:bg-dark-card rounded-lg p-6 md:p-8 shadow-modal border border-light-lines dark:border-dark-lines z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        <h2 className="text-[18px] font-bold text-light-text dark:text-dark-text mb-6">
          {isEdit ? "Edit Board" : "Add New Board"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[12px] font-bold text-dark-subtext mb-2">
              Board Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({});
                }}
                placeholder="e.g. Platform Launch"
                className={"w-full h-[40px] px-4 rounded border text-[13px] bg-transparent text-light-text dark:text-dark-text placeholder:text-dark-subtext/50 focus:outline-none " + (
                  errors.name
                    ? "border-destructive focus:border-destructive"
                    : "border-light-lines dark:border-dark-lines focus:border-primary"
                )}
              />
              {errors.name && (
                <span className="absolute right-3 top-2.5 text-[12px] font-bold text-destructive">
                  Can&apos;t be empty
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-dark-subtext mb-2">
              Board Columns
            </label>
            <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
              {columns.map((col, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: col.color || "#49C4E5" }}
                  />
                  <input
                    type="text"
                    value={col.name}
                    onChange={(e) => handleColumnChange(idx, e.target.value)}
                    placeholder="e.g. Todo"
                    className="flex-1 h-[40px] px-4 rounded border border-light-lines dark:border-dark-lines text-[13px] bg-transparent text-light-text dark:text-dark-text placeholder:text-dark-subtext/50 focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveColumn(idx)}
                    className="text-dark-subtext hover:text-destructive transition-colors p-1"
                    title="Remove column"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddColumn}
              className="w-full mt-3 h-[40px] rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-bold text-[13px] transition-colors"
            >
              + Add New Column
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-[40px] rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-[13px] transition-all shadow-sm active:scale-95"
          >
            {isEdit ? "Save Changes" : "Create New Board"}
          </button>
        </form>
      </div>
    </div>
  );
}
