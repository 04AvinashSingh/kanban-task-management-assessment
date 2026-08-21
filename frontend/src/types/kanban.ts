export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
  taskId?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  order: number;
  columnId: string;
  subtasks: Subtask[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Column {
  id: string;
  name: string;
  color: string;
  order: number;
  boardId: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  userId?: string;
  columns: Column[];
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  isGuest: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export type ModalType =
  | null
  | "ADD_TASK"
  | "EDIT_TASK"
  | "VIEW_TASK"
  | "DELETE_TASK"
  | "ADD_BOARD"
  | "EDIT_BOARD"
  | "DELETE_BOARD"
  | "MOBILE_MENU"
  | "AUTH_MODAL";
