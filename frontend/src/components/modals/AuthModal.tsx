"use client";

import React, { useState } from "react";
import { useKanban } from "@/context/KanbanContext";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, X } from "lucide-react";

export function AuthModal() {
  const { activeModal, closeModal, refreshBoards } = useKanban();
  const { login, register, guestLogin, isLoading } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  if (activeModal !== "AUTH_MODAL") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      await refreshBoards();
      closeModal();
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    }
  };

  const handleGuest = async () => {
    setError("");
    try {
      await guestLogin();
      await refreshBoards();
      closeModal();
    } catch (err: any) {
      setError(err.message || "Guest login failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

      <div className="relative w-full max-w-[420px] bg-light-card dark:bg-dark-card rounded-lg p-6 md:p-8 shadow-modal border border-light-lines dark:border-dark-lines z-10 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-dark-subtext hover:text-light-text dark:hover:text-dark-text p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-[20px] font-bold text-light-text dark:text-dark-text mb-2">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-[13px] text-dark-subtext mb-6">
          {mode === "login"
            ? "Sign in to access and manage your Kanban boards"
            : "Sign up to save your task workflows"}
        </p>

        {error && (
          <div className="p-3 mb-4 rounded bg-destructive/10 border border-destructive/20 text-destructive text-[13px] font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-[12px] font-bold text-dark-subtext mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Developer"
                className="w-full h-[40px] px-4 rounded border border-light-lines dark:border-dark-lines text-[13px] bg-transparent text-light-text dark:text-dark-text focus:outline-none focus:border-primary"
              />
            </div>
          )}

          <div>
            <label className="block text-[12px] font-bold text-dark-subtext mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full h-[40px] px-4 rounded border border-light-lines dark:border-dark-lines text-[13px] bg-transparent text-light-text dark:text-dark-text focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-dark-subtext mb-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-[40px] px-4 rounded border border-light-lines dark:border-dark-lines text-[13px] bg-transparent text-light-text dark:text-dark-text focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[40px] rounded-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-bold text-[13px] transition-all shadow-sm active:scale-95 mt-2"
          >
            {isLoading ? "Authenticating..." : mode === "login" ? "Sign In" : "Register"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-light-lines dark:border-dark-lines" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-light-card dark:bg-dark-card px-2 text-dark-subtext font-bold">
              OR
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGuest}
          disabled={isLoading}
          className="w-full h-[40px] rounded-full border border-primary text-primary hover:bg-primary/10 font-bold text-[13px] flex items-center justify-center gap-2 transition-colors"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Continue with 1-Click Guest Access</span>
        </button>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
            }}
            className="text-[13px] text-primary hover:underline font-medium"
          >
            {mode === "login" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
