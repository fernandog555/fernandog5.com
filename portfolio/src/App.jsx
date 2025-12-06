import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

export default function App() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Apply theme class to HTML
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(59,130,246,0.12),transparent_35%)]" />

      <Navbar setPage={setPage} theme={theme} setTheme={setTheme} />

      <main className="pt-24 pb-16">
        {page === "home" && <Home setPage={setPage} />}
        {page === "projects" && <Projects />}
      </main>
    </div>
  );
}
