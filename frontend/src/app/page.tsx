"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { BoardView } from "@/components/BoardView";
import { ShowSidebarButton } from "@/components/ShowSidebarButton";
import { TaskDetailModal } from "@/components/modals/TaskDetailModal";
import { TaskFormModal } from "@/components/modals/TaskFormModal";
import { BoardFormModal } from "@/components/modals/BoardFormModal";
import { DeleteModal } from "@/components/modals/DeleteModal";
import { MobileBoardMenu } from "@/components/modals/MobileBoardMenu";
import { AuthModal } from "@/components/modals/AuthModal";

export default function KanbanApp() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-light-bg dark:bg-dark-bg font-sans select-none">
      {/* Desktop Collapsible Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />
        <BoardView />
      </div>

      {/* Floating Show Sidebar Button */}
      <ShowSidebarButton />

      {/* Modals */}
      <TaskDetailModal />
      <TaskFormModal />
      <BoardFormModal />
      <DeleteModal />
      <MobileBoardMenu />
      <AuthModal />
    </div>
  );
}
