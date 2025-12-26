import { useEffect, useRef } from "react";
import PanelCard from "../common/PanelCard";
import { marked } from "marked";

export default function Description({ problem }) {
    const ref = useRef(null);

    useEffect(() => {
        if (problem && ref.current) {
            ref.current.innerHTML = marked(problem.description);
        }
    }, [problem]);

    return (
        <PanelCard>
            <div className="p-4 font-bold">Description</div>
            <div ref={ref} className="markdown-body p-4 overflow-y-auto" />
        </PanelCard>
    );
}
