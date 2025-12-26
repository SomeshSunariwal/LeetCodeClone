import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

export default function MonacoEditor({
    value,
    language = "javascript",
    theme = "light",
    fontSize = 14,
    wordWrap = false,
    onChange
}) {
    const containerRef = useRef(null);
    const editorRef = useRef(null);

    useEffect(() => {
        editorRef.current = monaco.editor.create(containerRef.current, {
            value: value || "// Write your code here...",
            language: language || "javascript",
            theme: theme === "dark" ? "vs-dark" : "vs",

            fontSize: fontSize || 14,
            lineHeight: 24,

            padding: {
                top: 16,
                bottom: 16,
            },

            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,

            wordWrap: wordWrap ? "on" : "off",

            fontFamily:
                "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
            fontLigatures: true,
        });


        editorRef.current.onDidChangeModelContent(() => {
            onChange?.(editorRef.current.getValue());
        });

        return () => editorRef.current?.dispose();
    }, []);

    useEffect(() => {
        if (!editorRef.current) return;
        monaco.editor.setTheme(theme === "dark" ? "vs-dark" : "vs");
        editorRef.current.updateOptions({ fontSize, wordWrap: wordWrap ? "on" : "off" });
    }, [theme, fontSize, wordWrap]);

    return <div ref={containerRef} className="w-full h-full" />;
}
