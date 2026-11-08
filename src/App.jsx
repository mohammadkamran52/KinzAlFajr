// Temporary skeleton: one route that shows the colour tokens. Replaced in item 3.6.
import { Routes, Route } from "react-router";

function SetupCheck() {
  return (
    <main className="min-h-screen bg-surface p-6 text-ink">
      <h1 className="text-4xl">Setup check</h1>
      <p className="mt-2 text-ink-muted">
        If you can read this and the colour tiles below, Tailwind is working.
      </p>
      <div className="mt-6 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-sm border border-line bg-surface-alt p-4">surface-alt</div>
        <div className="rounded-sm bg-primary p-4 text-on-primary">primary</div>
        <div className="rounded-sm bg-accent p-4 text-on-accent">accent</div>
        <div className="rounded-sm bg-ink p-4 text-surface">ink</div>
      </div>
      <p className="mt-6 text-danger">danger text sample</p>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<SetupCheck />} />
    </Routes>
  );
}