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
            <PanelCard>
                {/* Toolbar */}
                <div className="h-12 border-b border-light-border dark:border-dark-border flex items-center px-3 justify-between bg-gray-50/50 dark:bg-[#1e1e1e]">                    <div className="flex items-center gap-3">
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
                {/* Tabs */}
                <div className="flex border-b bg-gray-50 dark:bg-[#1e1e1e]">
                    {["case", "console"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-xs font-bold uppercase ${activeTab === tab
                                ? "text-blue-600 border-b-2 border-blue-500"
                                : "text-gray-500"
                                }`}
                        >
                            {tab === "case" ? "Test Cases" : "Console"}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {activeTab === "case" ? (
                        <>
                            {/* Case Buttons */}
                            <div className="flex gap-2 mb-4">
                                {testCases.map((tc, idx) => (
                                    <button
                                        key={tc.id}
                                        onClick={() => setActiveCase(idx)}
                                        className={`px-3 py-1 rounded text-xs ${activeCase === idx
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 dark:bg-gray-700"
                                            }`}
                                    >
                                        Case {idx + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={addTestCase}
                                    className="px-3 py-1 border border-dashed rounded text-xs"
                                >
                                    +
                                </button>
                            </div>

                            {/* Input */}
                            <textarea
                                value={testCases[activeCase].input}
                                onChange={(e) => updateCase("input", e.target.value)}
                                className="w-full h-20 p-2 mb-3 font-mono text-sm rounded border"
                                placeholder="Input"
                            />

                            {/* Output */}
                            <textarea
                                value={testCases[activeCase].output}
                                onChange={(e) => updateCase("output", e.target.value)}
                                className="w-full h-16 p-2 font-mono text-sm rounded border"
                                placeholder="Expected Output"
                            />
                        </>
                    ) : (
                        <div className="font-mono text-sm text-gray-500">
                            Console ready...
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="p-3 border-t flex justify-between bg-gray-50 dark:bg-[#1e1e1e]">
                    <button className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700">
                        Run
                    </button>
                    <button className="px-6 py-2 rounded bg-green-600 text-white">
                        Submit
                    </button>
                </div>
            </PanelCard>
        </ResizableSplit>
    );
}
