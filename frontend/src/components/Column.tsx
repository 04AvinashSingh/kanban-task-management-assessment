"use client";

import React, { useState } from "react";
import { Column as ColumnType } from "@/types/kanban";
import { TaskCard } from "./TaskCard";
import { useKanban } from "@/context/KanbanContext";

interface ColumnProps {
  column: ColumnType;
}

export function Column({ column }: ColumnProps) {
  const { moveTask } = useKanban();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const dataStr = e.dataTransfer.getData("text/plain");
      if (!dataStr) return;
      const data = JSON.parse(dataStr);
      const taskId = data.taskId;

      const children = Array.from(e.currentTarget.querySelectorAll("[draggable]"));
      let newIndex = column.tasks.length;

      for (let i = 0; i < children.length; i++) {
        const rect = children[i].getBoundingClientRect();
        if (e.clientY < rect.top + rect.height / 2) {
          newIndex = i;
          break;
        }
      }

      moveTask(taskId, column.id, newIndex);
    } catch (err) {
      console.error("Drop failed:", err);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={"w-[280px] shrink-0 flex flex-col rounded-xl transition-colors duration-150 " + (
        isDragOver ? "bg-primary/5 dark:bg-primary/10 ring-2 ring-primary ring-dashed p-1" : ""
      )}
    >
      <div className="flex items-center gap-3 mb-6 px-1">
        <div
          className="w-[15px] h-[15px] rounded-full shrink-0 shadow-sm"
          style={{ backgroundColor: column.color || "#49C4E5" }}
        />
        <h2 className="text-[12px] font-bold text-dark-subtext tracking-[2.4px] uppercase truncate">
          {column.name} ({column.tasks.length})
        </h2>
      </div>

      <div className="flex flex-col gap-5 flex-1 min-h-[300px] pb-8">
        {column.tasks.map((task, idx) => (
          <TaskCard key={task.id} task={task} index={idx} />
        ))}
      </div>
    </div>
  );
}
