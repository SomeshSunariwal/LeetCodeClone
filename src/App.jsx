import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import { DUMMY_PROBLEMS } from "./data/problems";
import ProblemList from "./components/problems/ProblemList";
import Description from "./components/problems/Description";
import CodeEditorPanel from "./components/editor/CodeEditorPanel";
import ResizableSplit from "./components/common/ResizableSplit";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [selected, setSelected] = useState(DUMMY_PROBLEMS[0]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
  }, [theme]);

  return (
    <div className="h-screen w-screen flex flex-col bg-light-bg dark:bg-dark-bg p-3 gap-2">

      {/* ✅ HEADER */}
      <Header
        theme={theme}
        onToggleTheme={() =>
          setTheme(prev => (prev === "light" ? "dark" : "light"))
        }
      />

      {/* ✅ CONTENT */}
      <div className="flex-1 overflow-hidden">
        <ResizableSplit initialSizes={[20, 40, 40]}>
          <ProblemList
            problems={DUMMY_PROBLEMS}
            selectedId={selected.id}
            onSelect={setSelected}
          />
          <Description problem={selected} />
          <CodeEditorPanel theme={theme} />
        </ResizableSplit>
      </div>
    </div>
  );
}
