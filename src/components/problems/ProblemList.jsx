import PanelCard from "../common/PanelCard";

export default function ProblemList({ problems, onSelect, selectedId }) {
    return (
        <PanelCard>
            <div className="p-4 border-b border-light-border dark:border-dark-border space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg">Problems</h2>
                </div>

                {/* SEARCH */}
                <div className="relative">
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>

                    <input
                        type="text"
                        placeholder="Search..."
                        className="
      w-full
      pl-11 pr-4 py-2.5
      bg-white
      rounded-lg
      text-sm text-gray-800
      placeholder-gray-400
      border border-blue-500
      focus:outline-none
      focus:ring-2 focus:ring-blue-200
    "
                    />
                </div>


                {/* FILTERS */}
                <div className="flex gap-2">
                    <select className="flex-1 bg-gray-100 dark:bg-dark-bg text-xs py-1.5 px-3 rounded-lg">
                        <option>Difficulty</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                    <select className="flex-1 bg-gray-100 dark:bg-dark-bg text-xs py-1.5 px-3 rounded-lg">
                        <option>Category</option>
                        <option>Array</option>
                        <option>String</option>
                        <option>DP</option>
                    </select>

                    <button
                        className="w-10 h-10
                                    rounded-lg
                                    bg-blue-600 hover:bg-blue-700
                                    text-white
                                    flex items-center justify-center
                                    shadow-md
                                    transition-all
                                    active:scale-95"
                    >
                        <i className="fas fa-plus text-sm"></i>
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto p-2">
                {problems.map(problem => (
                    <div
                        key={problem.id}
                        onClick={() => onSelect(problem)}
                        className={`
      group p-3 mb-1 rounded-lg cursor-pointer
      transition-all duration-200
      border border-transparent
      ${selectedId === problem.id
                                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-sm"
                                : "hover:bg-gray-50 dark:hover:bg-[#2a2a2a]"
                            }
    `}
                    >
                        {/* TITLE */}
                        <div className="flex justify-between items-start mb-1.5">
                            <span
                                className={`
          font-semibold text-sm truncate
          ${selectedId === problem.id
                                        ? "text-blue-700 dark:text-blue-400"
                                        : "text-gray-800 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white"
                                    }
        `}
                            >
                                {problem.title}
                            </span>
                        </div>

                        {/* TAGS */}
                        <div className="flex gap-2 text-[10px] font-medium uppercase tracking-wider">
                            {/* Difficulty */}
                            <span
                                className={`
          px-2 py-0.5 rounded-md
          ${problem.difficulty === "Easy"
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                        : problem.difficulty === "Medium"
                                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                                            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                                    }
        `}
                            >
                                {problem.difficulty}
                            </span>

                            {/* Category */}
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-md">
                                {problem.category}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </PanelCard>
    );
}
