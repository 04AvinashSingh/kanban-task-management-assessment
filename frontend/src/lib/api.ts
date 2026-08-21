const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

function getAuthHeader(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("kanban_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(errorData.message || "An unexpected error occurred");
  }
  return res.json();
}

export const api = {
  // Auth
  async register(data: { email: string; password: string; name?: string }) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<{ user: any; accessToken: string }>(res);
  },

  async login(data: { email: string; password: string }) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<{ user: any; accessToken: string }>(res);
  },

  async guestLogin() {
    const res = await fetch(`${API_BASE}/auth/guest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse<{ user: any; accessToken: string }>(res);
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse<any>(res);
  },

  // Boards
  async getBoards() {
    const res = await fetch(`${API_BASE}/boards`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse<any[]>(res);
  },

  async getBoard(id: string) {
    const res = await fetch(`${API_BASE}/boards/${id}`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse<any>(res);
  },

  async createBoard(data: { name: string; columns?: { name: string; color?: string }[] }) {
    const res = await fetch(`${API_BASE}/boards`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async updateBoard(id: string, data: { name?: string; columns?: { id?: string; name: string; color?: string }[] }) {
    const res = await fetch(`${API_BASE}/boards/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async deleteBoard(id: string) {
    const res = await fetch(`${API_BASE}/boards/${id}`, {
      method: "DELETE",
      headers: { ...getAuthHeader() },
    });
    return handleResponse<{ success: boolean; message: string }>(res);
  },

  // Columns
  async createColumn(data: { name: string; boardId: string; color?: string }) {
    const res = await fetch(`${API_BASE}/columns`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async deleteColumn(id: string) {
    const res = await fetch(`${API_BASE}/columns/${id}`, {
      method: "DELETE",
      headers: { ...getAuthHeader() },
    });
    return handleResponse<any>(res);
  },

  // Tasks
  async createTask(data: { title: string; description?: string; columnId: string; status?: string; subtasks?: { title: string }[] }) {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async updateTask(id: string, data: { title?: string; description?: string; columnId?: string; status?: string; subtasks?: { id?: string; title: string; isCompleted?: boolean }[] }) {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async moveTask(id: string, data: { targetColumnId: string; newOrder: number }) {
    const res = await fetch(`${API_BASE}/tasks/${id}/move`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse<any>(res);
  },

  async deleteTask(id: string) {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "DELETE",
      headers: { ...getAuthHeader() },
    });
    return handleResponse<{ success: boolean; message: string }>(res);
  },

  // Subtasks
  async toggleSubtask(id: string, isCompleted: boolean) {
    const res = await fetch(`${API_BASE}/subtasks/${id}/toggle`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify({ isCompleted }),
    });
    return handleResponse<any>(res);
  },
};
