// Shared light/dark theme store for the whole site.
// Reads and writes localStorage key "kaf-theme" (the only file allowed to do so).
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "kaf-theme";
const listeners = new Set();

function readPreference() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Storage can be blocked (private mode); fall back to the system setting.
  }
  return "system";
}

function systemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolve(pref) {
  return pref === "system" ? systemTheme() : pref;
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme; // makes form controls and scrollbars match
}

let preference = readPreference();
let state = { preference, theme: resolve(preference) };
applyTheme(state.theme);

function update() {
  state = { preference, theme: resolve(preference) };
  applyTheme(state.theme);
  listeners.forEach((listener) => listener());
}

// Follow the system setting while the visitor has not chosen.
if (typeof window !== "undefined" && window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (preference === "system") update();
    });

  // Keep several open tabs in sync.
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      preference = readPreference();
      update();
    }
  });
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

function setPreference(next) {
  if (next !== "light" && next !== "dark" && next !== "system") return;
  preference = next;
  try {
    if (next === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Ignore: the theme still changes for this visit.
  }
  update();
}

function toggle() {
  setPreference(state.theme === "dark" ? "light" : "dark");
}

export default function useTheme() {
  const current = useSyncExternalStore(subscribe, getSnapshot);
  return {
    theme: current.theme,
    preference: current.preference,
    setPreference,
    toggle,
  };
}