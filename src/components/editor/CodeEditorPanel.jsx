import { useState } from "react";
import PanelCard from "../common/PanelCard";
import IconButton from "../common/IconButton";
import MonacoEditor from "./MonacoEditor";
import ResizableSplit from "../common/ResizableSplit";

export default function CodeEditorPanel({ theme }) {
    const [code, setCode] = useState("// Write your code here...");
    const [language, setLanguage] = useState("javascript");
    const [fontSize, setFontSize] = useState(14);
    const [wordWrap, setWordWrap] = useState(false);
    const [activeTab, setActiveTab] = useState("case");

    const [testCases, setTestCases] = useState([
        { id: 1, input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }
    ]);
    const [activeCase, setActiveCase] = useState(0);

    const updateCase = (field, value) => {
        const copy = [...testCases];
        copy[activeCase][field] = value;
        setTestCases(copy);
    };

    const addTestCase = () => {
        setTestCases([...testCases, { id: Date.now(), input: "", output: "" }]);
        setActiveCase(testCases.length);
    };

    return (
        <ResizableSplit direction="vertical" initialSizes={[70, 30]}>

            {/* EDITOR */}
            <PanelCard >
                {/* Toolbar */}
                <div className="h-12 border-b border-light-border dark:border-dark-border flex items-center px-3 justify-between bg-gray-50/50 dark:bg-[#1e1e1e]">
                    <div className="flex items-center gap-3">
                        {/* Language */}
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="text-xs font-semibold px-3 py-1 rounded-lg bg-white dark:bg-dark-bg border"
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                        </select>

                        {/* Font Size */}
                        <div className="flex items-center gap-1">
                            <i className="fas fa-font text-xs text-gray-400"></i>
                            <input
                                type="range"
                                min="12"
                                max="24"
                                value={fontSize}
                                onChange={(e) => setFontSize(+e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <IconButton
                            icon="fas fa-wrap-text"
                            active={wordWrap}
                            onClick={() => setWordWrap(!wordWrap)}
                        />
                        <button className="text-xs px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">
                            Prettier
                        </button>
                    </div>
                </div>

                {/* Monaco */}
                <div className="flex-1 overflow-hidden relative bg-white dark:bg-dark-panel">
                    <MonacoEditor
                        language={language}
                        theme={theme}
                        fontSize={fontSize}
                        wordWrap={wordWrap}
                        value={code}
                        onChange={setCode}
                    />
                </div>
            </PanelCard>

            {/* CONSOLE / TEST CASES */}
            <PanelCard>

                {/* TABS */}
                <div className="shrink-0 flex items-center gap-6 px-4 h-12 border-b bg-gray-50 dark:bg-[#1e1e1e]">
                    <button
                        onClick={() => setActiveTab("case")}
                        className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide pb-2 ${activeTab === "case"
                            ? "text-blue-600 border-b-2 border-blue-500"
                            : "text-gray-500"
                            }`}
                    >
                        <i className="fas fa-vial text-xs"></i>
                        Test Cases
                    </button>

                    <button
                        onClick={() => setActiveTab("console")}
                        className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide pb-2 ${activeTab === "console"
                            ? "text-blue-600 border-b-2 border-blue-500"
                            : "text-gray-500"
                            }`}
                    >
                        <i className="fas fa-terminal text-xs"></i>
                        Console
                    </button>
                </div>

                {/* SCROLL AREA */}
                <div className="flex-1 overflow-y-auto px-4 py-4 pr-3">

                    {activeTab === "case" ? (
                        <>
                            {/* CASE SELECTOR */}
                            <div className="flex items-center gap-2 mb-5">
                                {testCases.map((tc, idx) => (
                                    <button
                                        key={tc.id}
                                        onClick={() => setActiveCase(idx)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold ${activeCase === idx
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                                            }`}
                                    >
                                        Case {idx + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={addTestCase}
                                    className="w-8 h-8 flex items-center justify-center
                       rounded-lg border border-dashed
                       text-gray-500 hover:text-blue-600
                       hover:border-blue-400"
                                >
                                    +
                                </button>
                            </div>

                            {/* INPUT */}
                            <div className="mb-4">
                                <div className="text-[10px] font-bold tracking-widest text-gray-400 mb-1">
                                    INPUT
                                </div>
                                <textarea
                                    value={testCases[activeCase].input}
                                    onChange={(e) => updateCase("input", e.target.value)}
                                    className="
                                                w-full h-24
                                                px-3 py-2
                                                font-mono text-sm
                                                rounded-lg
                                                bg-white dark:bg-dark-bg
                                                border border-gray-200 dark:border-gray-700
                                                focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* OUTPUT */}
                            <div>
                                <div className="text-[10px] font-bold tracking-widest text-gray-400 mb-1">
                                    EXPECTED OUTPUT
                                </div>
                                <textarea
                                    value={testCases[activeCase].output}
                                    onChange={(e) => updateCase("output", e.target.value)}
                                    className="w-full h-20
                                                px-3 py-2
                                                font-mono text-sm
                                                rounded-lg
                                                bg-white dark:bg-dark-bg
                                                border border-gray-200 dark:border-gray-700
                                                focus:outline-none focus:border-blue-500
                                                "
                                />
                            </div>
                        </>
                    ) : (
                        <div className="font-mono text-sm text-gray-500">
                            Console ready...
                        </div>
                    )}
                </div>

                {/* ACTIONS */}
                <div className="shrink-0 h-14 px-4 border-t flex items-center justify-between bg-gray-50 dark:bg-[#1e1e1e]">
                    <button className="
                            px-5 py-2
                            rounded-lg
                            text-sm font-semibold
                            bg-gray-200 dark:bg-gray-700
                            text-gray-700 dark:text-gray-200
                            ">
                        Run Code
                    </button>

                    <button className="
                            px-8 py-2
                            rounded-lg
                            text-sm font-semibold
                            bg-green-600 hover:bg-green-700
                            text-white
                            flex items-center gap-2
                            ">
                        Submit
                        <i className="fas fa-paper-plane text-xs"></i>
                    </button>
                </div>

            </PanelCard>


        </ResizableSplit>
    );
}
