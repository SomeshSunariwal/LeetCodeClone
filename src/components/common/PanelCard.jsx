export default function PanelCard({ children, className = "" }) {
    return (
        <div
            className={`h-full w-full bg-light-panel dark:bg-dark-panel border border-light-border dark:border-dark-border rounded-xl shadow-premium dark:shadow-premium-dark overflow-hidden flex flex-col transition-colors duration-200 ${className}`}
        >
            {children}
        </div>
    );
}
