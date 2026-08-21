import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { KanbanProvider } from "@/context/KanbanContext";

export const metadata: Metadata = {
  title: "Kanban Task Management Web App",
  description: "Fully responsive Kanban Task Management Web App with dark/light themes and subtasks based on Figma design specification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>
            <KanbanProvider>
              {children}
            </KanbanProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
