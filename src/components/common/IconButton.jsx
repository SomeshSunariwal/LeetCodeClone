export default function IconButton({
    icon,
    onClick,
    active,
    title,
    className = ""
}) {
    return (
        <button
            onClick={onClick}
            title={title}
            className={`
        p-1.5 rounded-lg transition-all duration-200
        ${active
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
                }
        ${className}
      `}
        >
            <i className={icon}></i>
        </button>
    );
}
