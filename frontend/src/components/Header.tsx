"use client";

import React, { useState } from "react";
import { useKanban } from "@/context/KanbanContext";
import { useAuth } from "@/context/AuthContext";
import { Plus, MoreVertical, ChevronDown, LogIn, LogOut } from "lucide-react";

export function Header() {
  const { activeBoard, openModal } = useKanban();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const hasColumns = (activeBoard?.columns.length ?? 0) > 0;

  return (
    <header className="h-[80px] md:h-[96px] bg-light-card dark:bg-dark-card border-b border-light-lines dark:border-dark-lines flex items-center justify-between px-4 md:px-6 lg:px-8 transition-colors duration-200 z-20 shrink-0">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex md:hidden items-center gap-2">
          <div className="flex items-center gap-[3px]">
            <div className="w-[5px] h-[20px] bg-primary rounded-[2px]" />
            <div className="w-[5px] h-[20px] bg-primary/75 rounded-[2px]" />
            <div className="w-[5px] h-[20px] bg-primary/50 rounded-[2px]" />
          </div>
        </div>

        <div
          onClick={() => openModal("MOBILE_MENU")}
          className="flex items-center gap-2 cursor-pointer md:cursor-default group"
        >
          <h1 className="text-[18px] md:text-[24px] font-bold text-light-text dark:text-dark-text tracking-tight">
            {activeBoard ? activeBoard.name : "Select or Create Board"}
          </h1>
          <span className="md:hidden text-primary transition-transform group-hover:scale-110">
            <ChevronDown className="w-5 h-5" />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button
          disabled={!hasColumns}
          onClick={() => openModal("ADD_TASK")}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:hover:bg-primary text-white font-bold text-[14px] md:text-[15px] h-[40px] md:h-[48px] px-4 md:px-6 rounded-full transition-all duration-150 shadow-sm active:scale-95 cursor-pointer disabled:cursor-not-allowed"
          title={!hasColumns ? "Create a column first to add tasks" : "Add New Task"}
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5 stroke-[3]" />
          <span className="hidden sm:inline">+ Add New Task</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-8 h-10 flex items-center justify-center text-dark-subtext hover:text-light-text dark:hover:text-dark-text rounded-md hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
            title="Board Options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-12 w-[192px] bg-light-card dark:bg-dark-bg rounded-lg shadow-modal border border-light-lines dark:border-dark-lines p-4 flex flex-col gap-3 z-40 animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openModal("EDIT_BOARD");
                  }}
                  className="text-left text-[14px] text-dark-subtext hover:text-light-text dark:hover:text-dark-text font-medium transition-colors"
                >
                  Edit Board
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openModal("DELETE_BOARD");
                  }}
                  className="text-left text-[14px] text-destructive hover:text-destructive-hover font-medium transition-colors"
                >
                  Delete Board
                </button>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1.5 rounded-full hover:bg-light-bg dark:hover:bg-dark-bg transition-colors border border-light-lines dark:border-dark-lines"
            title={user ? ("Logged in as " + (user.name || user.email)) : "Account"}
          >
            <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
              {user ? (user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()) : "G"}
            </div>
          </button>

          {userDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setUserDropdownOpen(false)}
              />
              <div className="absolute right-0 top-12 w-[220px] bg-light-card dark:bg-dark-bg rounded-lg shadow-modal border border-light-lines dark:border-dark-lines p-4 flex flex-col gap-3 z-40 animate-in fade-in zoom-in-95 duration-100">
                <div className="border-b border-light-lines dark:border-dark-lines pb-2">
                  <div className="text-[13px] font-bold text-light-text dark:text-dark-text truncate">
                    {user?.name || "Guest Account"}
                  </div>
                  <div className="text-[11px] text-dark-subtext truncate">
                    {user?.email} {user?.isGuest && "(Guest)"}
                  </div>
                </div>

                {user?.isGuest ? (
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      openModal("AUTH_MODAL");
                    }}
                    className="flex items-center gap-2 text-left text-[13px] text-primary hover:text-primary-hover font-medium"
                  >
                    <LogIn className="w-4 h-4" /> Sign In / Register
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2 text-left text-[13px] text-destructive hover:text-destructive-hover font-medium"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
