"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Board, Column, Task, Subtask, ModalType } from "@/types/kanban";
import { api } from "@/lib/api";
import { useAuth } from "./AuthContext";
import confetti from "canvas-confetti";

export const initialFigmaBoards: Board[] = [
  {
    id: "board-1",
    name: "Platform Launch",
    columns: [
      {
        id: "col-1-1",
        name: "Todo",
        color: "#49C4E5",
        order: 0,
        boardId: "board-1",
        tasks: [
          {
            id: "task-1-1",
            title: "Build UI for onboarding flow",
            description: "Design and build the initial screens for user registration and welcome tutorial walkthrough.",
            status: "Todo",
            order: 0,
            columnId: "col-1-1",
            subtasks: [
              { id: "sub-1-1-1", title: "Sign up page", isCompleted: true, taskId: "task-1-1" },
              { id: "sub-1-1-2", title: "Sign in page", isCompleted: false, taskId: "task-1-1" },
              { id: "sub-1-1-3", title: "Welcome screen", isCompleted: false, taskId: "task-1-1" },
            ],
          },
          {
            id: "task-1-2",
            title: "Build UI for search",
            description: "Implement responsive search bar with autocomplete suggestions and filter chips.",
            status: "Todo",
            order: 1,
            columnId: "col-1-1",
            subtasks: [
              { id: "sub-1-2-1", title: "Search component", isCompleted: false, taskId: "task-1-2" },
            ],
          },
          {
            id: "task-1-3",
            title: "Build settings UI",
            description: "Account settings, notification preferences, profile image upload, and theme selector.",
            status: "Todo",
            order: 2,
            columnId: "col-1-1",
            subtasks: [
              { id: "sub-1-3-1", title: "Account settings", isCompleted: false, taskId: "task-1-3" },
              { id: "sub-1-3-2", title: "Billing settings", isCompleted: false, taskId: "task-1-3" },
            ],
          },
          {
            id: "task-1-4",
            title: "QA and test all major user journeys",
            description: "Once we are ready to launch, we need to test all user journeys to eliminate edge case bugs.",
            status: "Todo",
            order: 3,
            columnId: "col-1-1",
            subtasks: [
              { id: "sub-1-4-1", title: "Meet with team for test plan", isCompleted: false, taskId: "task-1-4" },
              { id: "sub-1-4-2", title: "Execute regression tests", isCompleted: false, taskId: "task-1-4" },
            ],
          },
        ],
      },
      {
        id: "col-1-2",
        name: "Doing",
        color: "#8471F2",
        order: 1,
        boardId: "board-1",
        tasks: [
          {
            id: "task-1-5",
            title: "Design settings and search pages",
            description: "High fidelity Figma wireframes and design system components for settings and global search.",
            status: "Doing",
            order: 0,
            columnId: "col-1-2",
            subtasks: [
              { id: "sub-1-5-1", title: "Settings - Account", isCompleted: true, taskId: "task-1-5" },
              { id: "sub-1-5-2", title: "Settings - Billing", isCompleted: true, taskId: "task-1-5" },
              { id: "sub-1-5-3", title: "Search UI", isCompleted: false, taskId: "task-1-5" },
            ],
          },
          {
            id: "task-1-6",
            title: "Add account management endpoints",
            description: "NestJS controller endpoints for updating user passwords, email verification, and deleting account.",
            status: "Doing",
            order: 1,
            columnId: "col-1-2",
            subtasks: [
              { id: "sub-1-6-1", title: "Upgrade plan endpoint", isCompleted: true, taskId: "task-1-6" },
              { id: "sub-1-6-2", title: "Cancel plan endpoint", isCompleted: true, taskId: "task-1-6" },
              { id: "sub-1-6-3", title: "Update password endpoint", isCompleted: false, taskId: "task-1-6" },
            ],
          },
          {
            id: "task-1-7",
            title: "Design onboarding flow",
            description: "Create Figma prototypes for user onboarding step 1 to 4.",
            status: "Doing",
            order: 2,
            columnId: "col-1-2",
            subtasks: [
              { id: "sub-1-7-1", title: "Welcome page", isCompleted: true, taskId: "task-1-7" },
              { id: "sub-1-7-2", title: "Profile setup", isCompleted: true, taskId: "task-1-7" },
              { id: "sub-1-7-3", title: "Tutorial screen", isCompleted: false, taskId: "task-1-7" },
            ],
          },
          {
            id: "task-1-8",
            title: "Add search endpoints",
            description: "Query database with full text search index across boards, columns, and task titles.",
            status: "Doing",
            order: 3,
            columnId: "col-1-2",
            subtasks: [
              { id: "sub-1-8-1", title: "Define search DTO", isCompleted: true, taskId: "task-1-8" },
              { id: "sub-1-8-2", title: "Build search service", isCompleted: false, taskId: "task-1-8" },
            ],
          },
          {
            id: "task-1-9",
            title: "Add authentication endpoints",
            description: "JWT authorization flow with refresh tokens and guest login capability.",
            status: "Doing",
            order: 4,
            columnId: "col-1-2",
            subtasks: [
              { id: "sub-1-9-1", title: "Auth service", isCompleted: true, taskId: "task-1-9" },
              { id: "sub-1-9-2", title: "Auth controller", isCompleted: true, taskId: "task-1-9" },
            ],
          },
          {
            id: "task-1-10",
            title: "Research pricing points of various competitors and trial different business models",
            description: "We know what we are planning to build for version one. Now we need to finalize the first pricing model we will use.",
            status: "Doing",
            order: 5,
            columnId: "col-1-2",
            subtasks: [
              { id: "sub-1-10-1", title: "Research competitor pricing and business models", isCompleted: true, taskId: "task-1-10" },
              { id: "sub-1-10-2", title: "Outline a business model that fits our solution", isCompleted: false, taskId: "task-1-10" },
              { id: "sub-1-10-3", title: "Talk to potential customers about our proposed model", isCompleted: false, taskId: "task-1-10" },
            ],
          },
        ],
      },
      {
        id: "col-1-3",
        name: "Done",
        color: "#67E2AE",
        order: 2,
        boardId: "board-1",
        tasks: [
          {
            id: "task-1-11",
            title: "Conduct 5 wireframe tests",
            description: "Ensure the new design changes are intuitive for real users in usability lab testing.",
            status: "Done",
            order: 0,
            columnId: "col-1-3",
            subtasks: [
              { id: "sub-1-11-1", title: "Complete 5 wireframe prototype tests", isCompleted: true, taskId: "task-1-11" },
            ],
          },
          {
            id: "task-1-12",
            title: "Create wireframe prototype",
            description: "Interactive low-fidelity wireframe prototype in Figma for stakeholder review.",
            status: "Done",
            order: 1,
            columnId: "col-1-3",
            subtasks: [
              { id: "sub-1-12-1", title: "Create prototype", isCompleted: true, taskId: "task-1-12" },
            ],
          },
          {
            id: "task-1-13",
            title: "Review results of usability tests and iterate",
            description: "Keep iterating through the feedback loops until usability score exceeds 85%.",
            status: "Done",
            order: 2,
            columnId: "col-1-3",
            subtasks: [
              { id: "sub-1-13-1", title: "Analyze usability tests", isCompleted: true, taskId: "task-1-13" },
              { id: "sub-1-13-2", title: "Meet with stakeholders", isCompleted: true, taskId: "task-1-13" },
              { id: "sub-1-13-3", title: "Iterate wireframe design", isCompleted: true, taskId: "task-1-13" },
            ],
          },
          {
            id: "task-1-14",
            title: "Create paper prototypes and conduct 10 usability tests with potential customers",
            description: "Fast concept validation with clickable paper prototype sessions.",
            status: "Done",
            order: 3,
            columnId: "col-1-3",
            subtasks: [
              { id: "sub-1-14-1", title: "Create paper prototypes", isCompleted: true, taskId: "task-1-14" },
              { id: "sub-1-14-2", title: "Conduct 10 usability tests", isCompleted: true, taskId: "task-1-14" },
            ],
          },
          {
            id: "task-1-15",
            title: "Market discovery",
            description: "Understand target demographics, persona pain points, and current competitor solutions.",
            status: "Done",
            order: 4,
            columnId: "col-1-3",
            subtasks: [
              { id: "sub-1-15-1", title: "Interview 10 prospective customers", isCompleted: true, taskId: "task-1-15" },
            ],
          },
          {
            id: "task-1-16",
            title: "Competitor analysis",
            description: "Feature matrix comparison against leading task and project management systems.",
            status: "Done",
            order: 5,
            columnId: "col-1-3",
            subtasks: [
              { id: "sub-1-16-1", title: "Find direct competitors", isCompleted: true, taskId: "task-1-16" },
              { id: "sub-1-16-2", title: "Find indirect competitors", isCompleted: true, taskId: "task-1-16" },
            ],
          },
          {
            id: "task-1-17",
            title: "Research the market",
            description: "Quantify market size, SAM and TAM estimates for modern productivity tools.",
            status: "Done",
            order: 6,
            columnId: "col-1-3",
            subtasks: [
              { id: "sub-1-17-1", title: "Write up research findings", isCompleted: true, taskId: "task-1-17" },
              { id: "sub-1-17-2", title: "Present findings to executive leadership", isCompleted: true, taskId: "task-1-17" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "board-2",
    name: "Marketing Plan",
    columns: [
      {
        id: "col-2-1",
        name: "Todo",
        color: "#49C4E5",
        order: 0,
        boardId: "board-2",
        tasks: [
          {
            id: "task-2-1",
            title: "Plan Product Hunt Launch",
            description: "Prepare maker comment, gallery GIFs, tagline, and schedule launch date.",
            status: "Todo",
            order: 0,
            columnId: "col-2-1",
            subtasks: [
              { id: "sub-2-1-1", title: "Design teaser graphics", isCompleted: false, taskId: "task-2-1" },
              { id: "sub-2-1-2", title: "Draft first comment", isCompleted: false, taskId: "task-2-1" },
            ],
          },
        ],
      },
      {
        id: "col-2-2",
        name: "Doing",
        color: "#8471F2",
        order: 1,
        boardId: "board-2",
        tasks: [
          {
            id: "task-2-2",
            title: "Create Social Media Campaign Assets",
            description: "Short video clips, infographics, and carousel posts for Twitter/X and LinkedIn.",
            status: "Doing",
            order: 0,
            columnId: "col-2-2",
            subtasks: [
              { id: "sub-2-2-1", title: "Twitter banner & assets", isCompleted: true, taskId: "task-2-2" },
            ],
          },
        ],
      },
      {
        id: "col-2-3",
        name: "Done",
        color: "#67E2AE",
        order: 2,
        boardId: "board-2",
        tasks: [
          {
            id: "task-2-3",
            title: "Launch landing page teaser",
            description: "Publish countdown landing page with email capture form.",
            status: "Done",
            order: 0,
            columnId: "col-2-3",
            subtasks: [
              { id: "sub-2-3-1", title: "Deploy landing page", isCompleted: true, taskId: "task-2-3" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "board-3",
    name: "Roadmap",
    columns: [
      {
        id: "col-3-1",
        name: "Now",
        color: "#49C4E5",
        order: 0,
        boardId: "board-3",
        tasks: [
          {
            id: "task-3-1",
            title: "Offline Sync & Optimistic UI",
            description: "Store local state in IndexedDB and reconcile seamlessly on reconnect.",
            status: "Now",
            order: 0,
            columnId: "col-3-1",
            subtasks: [
              { id: "sub-3-1-1", title: "Service worker setup", isCompleted: true, taskId: "task-3-1" },
            ],
          },
        ],
      },
      {
        id: "col-3-2",
        name: "Next",
        color: "#8471F2",
        order: 1,
        boardId: "board-3",
        tasks: [
          {
            id: "task-3-2",
            title: "Multiplayer Real-time Collaboration",
            description: "Integrate WebSockets for instant live updates across team members.",
            status: "Next",
            order: 0,
            columnId: "col-3-2",
            subtasks: [
              { id: "sub-3-2-1", title: "WebSocket server gateway", isCompleted: false, taskId: "task-3-2" },
            ],
          },
        ],
      },
      {
        id: "col-3-3",
        name: "Later",
        color: "#67E2AE",
        order: 2,
        boardId: "board-3",
        tasks: [
          {
            id: "task-3-3",
            title: "AI Smart Task Breakdown",
            description: "Generate subtasks automatically from high-level task descriptions using LLMs.",
            status: "Later",
            order: 0,
            columnId: "col-3-3",
            subtasks: [
              { id: "sub-3-3-1", title: "Prompt engineering", isCompleted: false, taskId: "task-3-3" },
            ],
          },
        ],
      },
    ],
  },
];

interface KanbanContextType {
  boards: Board[];
  activeBoard: Board | null;
  activeTask: Task | null;
  activeModal: ModalType;
  sidebarOpen: boolean;
  isLoading: boolean;
  setActiveBoardId: (id: string) => void;
  setActiveTask: (t: Task | null) => void;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  createBoard: (name: string, columns: { name: string; color?: string }[]) => Promise<void>;
  updateBoard: (id: string, name: string, columns: { id?: string; name: string; color?: string }[]) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
  createColumn: (name: string, color?: string) => Promise<void>;
  createTask: (data: { title: string; description: string; columnId: string; status: string; subtasks: string[] }) => Promise<void>;
  updateTask: (id: string, data: { title: string; description: string; columnId: string; status: string; subtasks: { id?: string; title: string; isCompleted?: boolean }[] }) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, targetColId: string, newIndex: number) => Promise<void>;
  toggleSubtask: (subtaskId: string, isCompleted: boolean) => Promise<void>;
  refreshBoards: () => Promise<void>;
}

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

export function KanbanProvider({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuth();
  const [boards, setBoards] = useState<Board[]>(initialFigmaBoards);
  const [activeBoardId, setActiveBoardIdState] = useState<string>("board-1");
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBoards = useCallback(async () => {
    if (!token) {
      setBoards(initialFigmaBoards);
      return;
    }
    setIsLoading(true);
    try {
      const serverBoards = await api.getBoards();
      if (serverBoards && serverBoards.length > 0) {
        const fullBoards = await Promise.all(
          serverBoards.map(async (b) => {
            try {
              return await api.getBoard(b.id);
            } catch {
              return b;
            }
          })
        );
        setBoards(fullBoards);
        if (!fullBoards.some((b) => b.id === activeBoardId)) {
          setActiveBoardIdState(fullBoards[0].id);
        }
      } else {
        setBoards(initialFigmaBoards);
      }
    } catch (err) {
      console.warn("Using cached Figma boards:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token, activeBoardId]);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const activeBoard = boards.find((b) => b.id === activeBoardId) || boards[0] || null;

  const setActiveBoardId = (id: string) => {
    setActiveBoardIdState(id);
    const b = boards.find((x) => x.id === id);
    if (b && token) {
      api.getBoard(id).then((fresh) => {
        setBoards((prev) => prev.map((item) => (item.id === id ? fresh : item)));
      }).catch(() => {});
    }
  };

  const openModal = (type: ModalType) => setActiveModal(type);
  const closeModal = () => {
    setActiveModal(null);
  };
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Confetti celebration trigger
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // ignore
    }
  };

  // CRUD Boards
  const createBoard = async (name: string, columns: { name: string; color?: string }[]) => {
    const tempId = "board-" + Date.now();
    const newColumns: Column[] = columns.map((col, idx) => ({
      id: "col-" + tempId + "-" + idx,
      name: col.name,
      color: col.color || (idx === 0 ? "#49C4E5" : idx === 1 ? "#8471F2" : "#67E2AE"),
      order: idx,
      boardId: tempId,
      tasks: [],
    }));

    const newBoard: Board = {
      id: tempId,
      name,
      columns: newColumns,
    };

    setBoards((prev) => [...prev, newBoard]);
    setActiveBoardIdState(tempId);
    closeModal();

    try {
      if (token) {
        const created = await api.createBoard({ name, columns });
        setBoards((prev) => prev.map((b) => (b.id === tempId ? created : b)));
        setActiveBoardIdState(created.id);
      }
    } catch (err) {
      console.warn("Board created locally:", err);
    }
  };

  const updateBoard = async (id: string, name: string, columns: { id?: string; name: string; color?: string }[]) => {
    setBoards((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const updatedCols = columns.map((c, i) => {
          const existing = b.columns.find((ec) => ec.id === c.id);
          return {
            id: c.id || "col-" + id + "-" + i + "-" + Date.now(),
            name: c.name,
            color: c.color || (existing?.color || "#49C4E5"),
            order: i,
            boardId: id,
            tasks: existing ? existing.tasks : [],
          };
        });
        return { ...b, name, columns: updatedCols };
      })
    );
    closeModal();

    try {
      if (token) {
        const updated = await api.updateBoard(id, { name, columns });
        setBoards((prev) => prev.map((b) => (b.id === id ? updated : b)));
      }
    } catch (err) {
      console.warn("Board updated locally:", err);
    }
  };

  const deleteBoard = async (id: string) => {
    const remaining = boards.filter((b) => b.id !== id);
    setBoards(remaining);
    if (remaining.length > 0) {
      setActiveBoardIdState(remaining[0].id);
    }
    closeModal();

    try {
      if (token) {
        await api.deleteBoard(id);
      }
    } catch (err) {
      console.warn("Board deleted locally:", err);
    }
  };

  const createColumn = async (name: string, color?: string) => {
    if (!activeBoard) return;
    const tempColId = "col-" + Date.now();
    const newCol: Column = {
      id: tempColId,
      name,
      color: color || "#67E2AE",
      order: activeBoard.columns.length,
      boardId: activeBoard.id,
      tasks: [],
    };

    setBoards((prev) =>
      prev.map((b) =>
        b.id === activeBoard.id ? { ...b, columns: [...b.columns, newCol] } : b
      )
    );

    try {
      if (token) {
        const created = await api.createColumn({ name, color, boardId: activeBoard.id });
        setBoards((prev) =>
          prev.map((b) =>
            b.id === activeBoard.id
              ? {
                  ...b,
                  columns: b.columns.map((c) => (c.id === tempColId ? { ...created, tasks: [] } : c)),
                }
              : b
          )
        );
      }
    } catch (err) {
      console.warn("Column created locally:", err);
    }
  };

  const createTask = async (data: { title: string; description: string; columnId: string; status: string; subtasks: string[] }) => {
    const tempTaskId = "task-" + Date.now();
    const subtaskObjects: Subtask[] = data.subtasks
      .filter((s) => s.trim().length > 0)
      .map((title, i) => ({
        id: "sub-" + tempTaskId + "-" + i,
        title,
        isCompleted: false,
        taskId: tempTaskId,
      }));

    const newTask: Task = {
      id: tempTaskId,
      title: data.title,
      description: data.description,
      status: data.status,
      order: 999,
      columnId: data.columnId,
      subtasks: subtaskObjects,
    };

    setBoards((prev) =>
      prev.map((b) => {
        if (b.id !== activeBoard?.id) return b;
        return {
          ...b,
          columns: b.columns.map((c) => {
            if (c.id !== data.columnId) return c;
            return { ...c, tasks: [...c.tasks, newTask] };
          }),
        };
      })
    );
    closeModal();

    try {
      if (token) {
        const created = await api.createTask({
          title: data.title,
          description: data.description,
          columnId: data.columnId,
          status: data.status,
          subtasks: subtaskObjects.map((s) => ({ title: s.title })),
        });
        setBoards((prev) =>
          prev.map((b) => {
            if (b.id !== activeBoard?.id) return b;
            return {
              ...b,
              columns: b.columns.map((c) => {
                if (c.id !== data.columnId) return c;
                return {
                  ...c,
                  tasks: c.tasks.map((t) => (t.id === tempTaskId ? created : t)),
                };
              }),
            };
          })
        );
      }
    } catch (err) {
      console.warn("Task created locally:", err);
    }
  };

  const updateTask = async (
    id: string,
    data: { title: string; description: string; columnId: string; status: string; subtasks: { id?: string; title: string; isCompleted?: boolean }[] }
  ) => {
    setBoards((prev) =>
      prev.map((b) => {
        if (b.id !== activeBoard?.id) return b;

        let targetTask: Task | null = null;
        const strippedCols = b.columns.map((c) => {
          const found = c.tasks.find((t) => t.id === id);
          if (found) targetTask = found;
          return { ...c, tasks: c.tasks.filter((t) => t.id !== id) };
        });

        if (!targetTask) return b;
        const currentTask: Task = targetTask;

        const updatedTask: Task = {
          ...currentTask,
          title: data.title,
          description: data.description,
          status: data.status,
          columnId: data.columnId,
          subtasks: data.subtasks.map((st, i) => ({
            id: st.id || "sub-" + id + "-" + i + "-" + Date.now(),
            title: st.title,
            isCompleted: !!st.isCompleted,
            taskId: id,
          })),
        };

        const finalCols = strippedCols.map((c) => {
          if (c.id !== data.columnId) return c;
          return { ...c, tasks: [...c.tasks, updatedTask] };
        });

        return { ...b, columns: finalCols };
      })
    );

    setActiveTask((prev) =>
      prev && prev.id === id
        ? {
            ...prev,
            title: data.title,
            description: data.description,
            status: data.status,
            columnId: data.columnId,
            subtasks: data.subtasks.map((st, i) => ({
              id: st.id || "sub-" + id + "-" + i,
              title: st.title,
              isCompleted: !!st.isCompleted,
              taskId: id,
            })),
          }
        : null
    );

    closeModal();

    try {
      if (token) {
        const updated = await api.updateTask(id, {
          title: data.title,
          description: data.description,
          columnId: data.columnId,
          status: data.status,
          subtasks: data.subtasks,
        });
        setBoards((prev) =>
          prev.map((b) => {
            if (b.id !== activeBoard?.id) return b;
            return {
              ...b,
              columns: b.columns.map((c) => ({
                ...c,
                tasks: c.tasks.map((t) => (t.id === id ? updated : t)),
              })),
            };
          })
        );
      }
    } catch (err) {
      console.warn("Task updated locally:", err);
    }
  };

  const deleteTask = async (id: string) => {
    setBoards((prev) =>
      prev.map((b) => ({
        ...b,
        columns: b.columns.map((c) => ({
          ...c,
          tasks: c.tasks.filter((t) => t.id !== id),
        })),
      }))
    );
    setActiveTask(null);
    closeModal();

    try {
      if (token) {
        await api.deleteTask(id);
      }
    } catch (err) {
      console.warn("Task deleted locally:", err);
    }
  };

  const moveTask = async (taskId: string, targetColId: string, newIndex: number) => {
    let movedTask: Task | null = null;
    let targetColName = "";

    setBoards((prev) =>
      prev.map((b) => {
        if (b.id !== activeBoard?.id) return b;

        const targetCol = b.columns.find((c) => c.id === targetColId);
        if (targetCol) targetColName = targetCol.name;

        const cleanCols = b.columns.map((col) => {
          const t = col.tasks.find((task) => task.id === taskId);
          if (t) {
            movedTask = { ...t, columnId: targetColId, status: targetColName || t.status };
          }
          return { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) };
        });

        if (!movedTask) return b;

        const finalCols = cleanCols.map((col) => {
          if (col.id !== targetColId) return col;
          const updatedTasks = [...col.tasks];
          updatedTasks.splice(newIndex, 0, movedTask!);
          return { ...col, tasks: updatedTasks };
        });

        return { ...b, columns: finalCols };
      })
    );

    if (targetColName.toLowerCase() === "done") {
      triggerCelebration();
    }

    try {
      if (token) {
        await api.moveTask(taskId, { targetColumnId: targetColId, newOrder: newIndex });
      }
    } catch (err) {
      console.warn("Moved task locally:", err);
    }
  };

  const toggleSubtask = async (subtaskId: string, isCompleted: boolean) => {
    let allCompleted = false;

    setBoards((prev) =>
      prev.map((b) => {
        if (b.id !== activeBoard?.id) return b;
        return {
          ...b,
          columns: b.columns.map((c) => ({
            ...c,
            tasks: c.tasks.map((t) => {
              if (!t.subtasks.some((s) => s.id === subtaskId)) return t;
              const updatedSubtasks = t.subtasks.map((s) =>
                s.id === subtaskId ? { ...s, isCompleted } : s
              );
              if (updatedSubtasks.length > 0 && updatedSubtasks.every((s) => s.isCompleted)) {
                allCompleted = true;
              }
              return { ...t, subtasks: updatedSubtasks };
            }),
          })),
        };
      })
    );

    setActiveTask((prev) => {
      if (!prev) return null;
      const updatedSubtasks = prev.subtasks.map((s) =>
        s.id === subtaskId ? { ...s, isCompleted } : s
      );
      return { ...prev, subtasks: updatedSubtasks };
    });

    if (allCompleted) {
      triggerCelebration();
    }

    try {
      if (token) {
        await api.toggleSubtask(subtaskId, isCompleted);
      }
    } catch (err) {
      console.warn("Toggled subtask locally:", err);
    }
  };

  return (
    <KanbanContext.Provider
      value={{
        boards,
        activeBoard,
        activeTask,
        activeModal,
        sidebarOpen,
        isLoading,
        setActiveBoardId,
        setActiveTask,
        openModal,
        closeModal,
        toggleSidebar,
        setSidebarOpen,
        createBoard,
        updateBoard,
        deleteBoard,
        createColumn,
        createTask,
        updateTask,
        deleteTask,
        moveTask,
        toggleSubtask,
        refreshBoards: fetchBoards,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}

export function useKanban() {
  const context = useContext(KanbanContext);
  if (!context) throw new Error("useKanban must be used within KanbanProvider");
  return context;
}
