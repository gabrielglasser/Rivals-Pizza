'use client';

import { useTheme } from "@/providers/theme";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme} title="Alternar tema">
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
} 