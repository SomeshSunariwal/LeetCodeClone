import { useRef, useState } from "react";
import React from "react";

export default function ResizableSplit({
    direction = "horizontal",
    initialSizes,
    minSizes = [],
    maxSizes = [],
    children
}) {
    const containerRef = useRef(null);
    const [sizes, setSizes] = useState(initialSizes);

    const startResize = (index, e) => {
        e.preventDefault();

        const container = containerRef.current;
        const startPos =
            direction === "horizontal" ? e.clientX : e.clientY;

        const containerSize =
            direction === "horizontal"
                ? container.offsetWidth
                : container.offsetHeight;

        const startSizes = [...sizes];

        const onMouseMove = (ev) => {
            const currentPos =
                direction === "horizontal" ? ev.clientX : ev.clientY;

            const deltaPx = currentPos - startPos;
            const deltaPercent = (deltaPx / containerSize) * 100;

            let nextSizes = [...startSizes];

            const totalPercent =
                startSizes[index] + startSizes[index + 1];

            let nextPercent = startSizes[index] + deltaPercent;

            // Convert min/max px → %
            const minA =
                minSizes[index]
                    ? (minSizes[index] / containerSize) * 100
                    : 5;

            const maxA =
                maxSizes[index]
                    ? (maxSizes[index] / containerSize) * 100
                    : totalPercent - 5;

            const minB =
                minSizes[index + 1]
                    ? (minSizes[index + 1] / containerSize) * 100
                    : 5;

            const maxB =
                maxSizes[index + 1]
                    ? (maxSizes[index + 1] / containerSize) * 100
                    : totalPercent - 5;

            // Clamp A
            nextPercent = Math.max(minA, Math.min(maxA, nextPercent));

            // Clamp B accordingly
            const otherPercent = totalPercent - nextPercent;
            if (otherPercent < minB) {
                nextPercent = totalPercent - minB;
            }
            if (otherPercent > maxB) {
                nextPercent = totalPercent - maxB;
            }

            nextSizes[index] = nextPercent;
            nextSizes[index + 1] = totalPercent - nextPercent;

            setSizes(nextSizes);
        };

        const stopResize = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", stopResize);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", stopResize);
    };

    return (
        <div
            ref={containerRef}
            className={`flex h-full w-full ${direction === "horizontal" ? "flex-row" : "flex-col"
                }`}
        >
            {React.Children.map(children, (child, index) => {
                const lastIndex = React.Children.count(children) - 1;
                const isLast = index === lastIndex;

                let paddingClass = "";

                if (isLast) {
                    if (direction === "horizontal") {
                        paddingClass = "pr-4";   // right gap ONLY on last column
                    } else {
                        paddingClass = "pb-2";   // bottom gap ONLY on last row
                    }
                }

                return (
                    <React.Fragment key={index}>
                        <div
                            style={{ flexBasis: `${sizes[index]}%` }}
                            className={`h-full overflow-hidden flex-shrink-0 ${paddingClass}`}
                        >
                            {isLast}
                            {child}
                        </div>

                        {index < lastIndex && (
                            <div
                                className={`gutter ${direction === "horizontal"
                                    ? "gutter-horizontal"
                                    : "gutter-vertical"
                                    }`}
                                onMouseDown={(e) => startResize(index, e)}
                            />
                        )}
                    </React.Fragment>
                );
            })}

        </div>
    );
}
