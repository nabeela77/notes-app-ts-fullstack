import "./FilterImportant.css";
interface FilterImportantProps {
  showMode: "all" | "important";
  setShowMode: (mode: "all" | "important") => void;
}

export default function FilterImportant({
  showMode,
  setShowMode,
}: FilterImportantProps) {
  return (
    <div className="filter-toggle">
      <button onClick={() => setShowMode("all")} disabled={showMode === "all"}>
        All
      </button>
      <button
        onClick={() => setShowMode("important")}
        disabled={showMode === "important"}
      >
        Important
      </button>
    </div>
  );
}
