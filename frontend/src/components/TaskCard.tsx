"use client";

import React, { useState } from "react";
import { Task } from "@/types/kanban";
import { useKanban } from "@/context/KanbanContext";

interface TaskCardProps {
  task: Task;
  index: number;
}

export function TaskCard({ task, index }: TaskCardProps) {
  const { setActiveTask, openModal } = useKanban();
  const [isDragging, setIsDragging] = useState(false);

  const completedCount = task.subtasks.filter((s) => s.isCompleted).length;
  const totalCount = task.subtasks.length;

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", JSON.stringify({ taskId: task.id, sourceColId: task.columnId, sourceIndex: index }));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    setActiveTask(task);
    openModal("VIEW_TASK");
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      className={"group bg-light-card dark:bg-dark-card rounded-card p-5 shadow-task hover:shadow-taskHover cursor-pointer select-none transition-all duration-200 border border-light-lines/60 dark:border-dark-lines/40 " + (
        isDragging ? "opacity-40 scale-95" : "hover:-translate-y-0.5"
      )}
    >
      <h3 className="text-[15px] font-bold text-light-text dark:text-dark-text group-hover:text-primary transition-colors leading-snug">
        {task.title}
      </h3>
      <p className="text-[12px] font-bold text-dark-subtext mt-2">
        {completedCount} of {totalCount} subtasks
      </p>
    </div>
  );
}
